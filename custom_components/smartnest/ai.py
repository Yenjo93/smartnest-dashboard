"""Small jobs for the house's AI Task entity: who's at the door, the morning summary, what a fault means.

Prompts live here, not in the panel, so a screen can only ask for these jobs and nothing else.
"""
from __future__ import annotations

import os
import secrets
from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant

from .license import NOT_LICENSED, is_licensed

_LANG = {
    "ar": "Arabic, in a warm Levantine dialect (like a friend talking)",
    "en": "English",
    "he": "Hebrew",
}

_PROMPTS = {
    "doorbell": (
        "This is a snapshot from the front door camera just after the doorbell rang. "
        "In one short sentence (max 12 words) say who or what is at the door: how many people, roughly adult/child, "
        "a delivery or package, uniform. Don't guess identities. Reply in {lang}, no quotes."
    ),
    "summary": (
        "You write the morning card on a family's wall tablet. From these facts about the home, write 2-3 short, "
        "friendly sentences: what matters today and anything unusual overnight. No lists, no greeting, no emojis "
        "except at most one. Reply in {lang}.\nFacts:\n{facts}"
    ),
    "scene": (
        "You set the lights of one room for a mood. The request: {ask}\n"
        "Lights (id: name, what it can do):\n{facts}\n"
        "Reply with only a JSON array, one object per light you change: "
        '{{"entity": "light.x", "on": true, "brightness_pct": 0-100, "rgb": [r,g,b] (colour lights only), "kelvin": 2000-6500 (white lights only)}}. '
        "Lights that should be off: {{\"entity\": \"light.x\", \"on\": false}}. Then on a last line, one short sentence in {lang} describing the mood."
    ),
    "automation": (
        "Turn this request into a home automation: {ask}\n"
        "Devices (id: name):\n{facts}\n"
        "Reply with only JSON in this shape (no comments):\n"
        '{{"name": "short title in {lang}", "trigger": one of {{"kind":"time","at":"HH:MM"}} | {{"kind":"sun","event":"sunrise"|"sunset","offset":minutes}} | '
        '{{"kind":"state","entity":"id","to":"on"|"off"|"open"|"closed"|"locked"|"unlocked"|"home"|"not_home"}}, '
        '"days": ["sun","mon","tue","wed","thu","fri","sat"] or [] for every day, '
        '"window": {{"after":"HH:MM","before":"HH:MM"}} or null, '
        '"actions": [{{"kind":"on"|"off","entity":"id"}} | {{"kind":"message","text":"..."}}]}}. '
        "Use only the device ids given. A notification to phones is a message action."
    ),
    "cameras": (
        "Summarise today at this home from its camera detections, in 2-3 short sentences in {lang}: who and what came by and when, "
        "anything unusual. No lists.\nDetections:\n{facts}"
    ),
    "bill": (
        "Explain this home's electricity this month to the family, in 3 short sentences in {lang}: why it's higher or lower than last month, "
        "the biggest users, and one concrete tip. Plain words, numbers rounded.\nFacts:\n{facts}"
    ),
    "explain": (
        "You help a smart home installer. For each problem below, say in one short line the most likely cause and the "
        "fix (battery, Zigbee range, Wi-Fi, power, integration needs re-login...). Reply in {lang} as plain lines, "
        "one per problem, starting with the device name.\nProblems:\n{facts}"
    ),
}


async def ai_generate(hass: HomeAssistant, entity_id: str, task: str, instructions: str, image: tuple[bytes, str] | None = None) -> str:
    """Runs one AI Task job, lending it an image through the media folder when there is one."""
    from homeassistant.components.ai_task import async_generate_data

    attachments = None
    path = None
    if image is not None:
        media_dir = hass.config.media_dirs.get("local")
        if not media_dir:
            raise RuntimeError("The Home Assistant media folder is not set up")
        body, ext = image
        name = f"snap-{secrets.token_hex(6)}{ext}"
        folder = os.path.join(media_dir, "smartnest")
        path = os.path.join(folder, name)

        def _write() -> None:
            os.makedirs(folder, exist_ok=True)
            with open(path, "wb") as fh:
                fh.write(body)

        await hass.async_add_executor_job(_write)
        attachments = [
            {
                "media_content_id": f"media-source://media_source/local/smartnest/{name}",
                "media_content_type": "image/png" if ext == ".png" else "image/jpeg",
            }
        ]
    try:
        result = await async_generate_data(
            hass, task_name=f"SmartNest {task}", entity_id=entity_id, instructions=instructions, attachments=attachments
        )
    finally:
        if path:
            await hass.async_add_executor_job(lambda: os.path.exists(path) and os.remove(path))
    return str(result.data).strip()


@websocket_api.websocket_command(
    {
        vol.Required("type"): "smartnest/ai/ask",
        vol.Required("task"): vol.In(list(_PROMPTS)),
        vol.Required("entity_id"): str,
        vol.Optional("lang", default="ar"): vol.In(list(_LANG)),
        vol.Optional("camera"): str,
        vol.Optional("facts", default=[]): [str],
        vol.Optional("ask", default=""): vol.All(str, vol.Length(max=300)),
    }
)
@websocket_api.async_response
async def ws_ai_ask(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    if not is_licensed(hass):
        connection.send_error(msg["id"], NOT_LICENSED, "SmartNest needs an activation key")
        return
    if not msg["entity_id"].startswith("ai_task."):
        connection.send_error(msg["id"], "bad_entity", "Not an AI Task entity")
        return
    task = msg["task"]
    if task in ("explain", "automation") and not connection.user.is_admin:
        connection.send_error(msg["id"], "unauthorized", "Admin only")
        return
    facts = "\n".join(f"- {f[:200]}" for f in msg["facts"][:150])
    instructions = _PROMPTS[task].format(lang=_LANG[msg["lang"]], facts=facts, ask=msg["ask"])
    image = None
    if task == "doorbell":
        cam = msg.get("camera", "")
        if not cam.startswith("camera."):
            connection.send_error(msg["id"], "bad_camera", "Needs a camera")
            return
        try:
            from homeassistant.components.camera import async_get_image

            img = await async_get_image(hass, cam)
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "camera_failed", str(err))
            return
        image = (img.content, ".png" if "png" in (img.content_type or "") else ".jpg")
    try:
        text = await ai_generate(hass, msg["entity_id"], task, instructions, image)
    except ImportError:
        connection.send_error(msg["id"], "no_ai", "Needs Home Assistant 2025.8 or newer")
        return
    except Exception as err:  # noqa: BLE001 - provider errors go back as-is
        connection.send_error(msg["id"], "ai_failed", str(err))
        return
    connection.send_result(msg["id"], {"text": text[:6000]})
