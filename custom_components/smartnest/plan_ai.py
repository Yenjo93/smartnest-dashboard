"""Reads the room names off a floor plan image with the house's AI Task entity (OpenAI, Gemini, Claude, Ollama…)."""
from __future__ import annotations

import json
import os
import re
from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant

from .ai import ai_generate
from .const import FILES_DIR
from .license import NOT_LICENSED, is_licensed

_PLAN_URL = re.compile(r"^/smartnest_files/floorplans/([0-9a-f]{32}\.(?:png|jpg|webp))$")

_INSTRUCTIONS = """This image is a floor plan of a home. List every room whose name is written on the plan.
For each room give:
- "label": the room name exactly as written on the plan
- "x", "y": where that label sits, as a percentage of the image width and height (0-100, from the top-left)
- "area": the best match from this list of the home's areas, or "" if none fits: {areas}
Match by meaning across languages (Bedroom = غرفة النوم = חדר שינה, Living Room = الصالة = סלון).
Reply with only a JSON array, like [{{"label": "Kitchen", "x": 40, "y": 70, "area": "المطبخ"}}]."""


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "smartnest/plan/read_rooms",
        vol.Required("image"): str,
        vol.Required("entity_id"): str,
        vol.Optional("areas", default=[]): [str],
    }
)
@websocket_api.async_response
async def ws_plan_read_rooms(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    if not is_licensed(hass):
        connection.send_error(msg["id"], NOT_LICENSED, "SmartNest needs an activation key")
        return
    match = _PLAN_URL.match(msg["image"])
    if not match:
        connection.send_error(msg["id"], "bad_image", "Upload the plan through SmartNest first")
        return
    path = os.path.join(hass.config.path(FILES_DIR), "floorplans", match.group(1))
    try:
        body = await hass.async_add_executor_job(_read, path)
        data = await ai_generate(
            hass,
            msg["entity_id"],
            "floor plan rooms",
            _INSTRUCTIONS.format(areas=json.dumps(msg["areas"], ensure_ascii=False)),
            (body, os.path.splitext(path)[1]),
        )
    except ImportError:
        connection.send_error(msg["id"], "no_ai", "Needs Home Assistant 2025.8 or newer with an AI Task entity")
        return
    except Exception as err:  # noqa: BLE001 - any AI provider error goes back to the installer as-is
        connection.send_error(msg["id"], "ai_failed", str(err))
        return
    connection.send_result(msg["id"], {"rooms": _parse(data)})


def _read(path: str) -> bytes:
    with open(path, "rb") as fh:
        return fh.read()


def _parse(data: Any) -> list[dict[str, Any]]:
    """The model is asked for a JSON array; take the first array in whatever it says."""
    if isinstance(data, str):
        start, end = data.find("["), data.rfind("]")
        if start < 0 or end < start:
            return []
        try:
            data = json.loads(data[start : end + 1])
        except ValueError:
            return []
    if not isinstance(data, list):
        return []
    rooms = []
    for item in data:
        if not isinstance(item, dict) or not item.get("label"):
            continue
        try:
            x, y = float(item.get("x", -1)), float(item.get("y", -1))
        except (TypeError, ValueError):
            continue
        if 0 <= x <= 100 and 0 <= y <= 100:
            rooms.append({"label": str(item["label"])[:40], "area": str(item.get("area") or "")[:40], "x": x, "y": y})
    return rooms
