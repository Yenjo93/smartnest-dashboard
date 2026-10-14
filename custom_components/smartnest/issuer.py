"""The installer's own license desk, inside SmartNest on the installer's house.

It only works where the installer has put their signing key (once, from the panel). The key must be the one whose
public half is built into SmartNest, so a copy of the code alone can't issue anything that activates.
"""
from __future__ import annotations

import base64
import json
import secrets
import time
from typing import Any

import voluptuous as vol
from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PrivateKey
from cryptography.hazmat.primitives.serialization import Encoding, PublicFormat, load_pem_private_key

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store

from .const import DOMAIN, LICENSE_PUBLIC_KEY
from .license import _b64d, verify

PLANS = ("basic", "pro", "premium")


def _b64e(raw: bytes) -> str:
    return base64.urlsafe_b64encode(raw).decode().rstrip("=")


def _load_key(pem: str) -> Ed25519PrivateKey | None:
    """The private key, if it's really the one SmartNest trusts."""
    try:
        key = load_pem_private_key(pem.encode(), password=None)
    except (ValueError, TypeError):
        return None
    if not isinstance(key, Ed25519PrivateKey):
        return None
    pub = key.public_key().public_bytes(Encoding.Raw, PublicFormat.Raw)
    return key if pub == _b64d(LICENSE_PUBLIC_KEY) else None


LICENSES_URL_PATH = "smartnest-licenses"


async def async_sync_panel(hass: HomeAssistant) -> None:
    """The licenses page sits in the sidebar only on the house that holds the signing key, and only for admins."""
    from homeassistant.components import frontend, panel_custom

    data = hass.data.get(DOMAIN) or {}
    iss: Issuer | None = data.get("issuer")
    shown = LICENSES_URL_PATH in hass.data.get("frontend_panels", {})
    if iss and iss.key and not shown and data.get("module_url"):
        await panel_custom.async_register_panel(
            hass,
            frontend_url_path=LICENSES_URL_PATH,
            webcomponent_name="smartnest-licenses",
            sidebar_title="التراخيص",
            sidebar_icon="mdi:key-chain",
            module_url=data["module_url"],
            embed_iframe=False,
            require_admin=True,
            config={"asset_base": data.get("asset_base", "")},
        )
    elif (not iss or not iss.key) and shown:
        frontend.async_remove_panel(hass, LICENSES_URL_PATH)


class Issuer:
    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self.key_store: Store[dict] = Store(hass, 1, "smartnest.issuer_key")
        self.db: Store[dict] = Store(hass, 1, "smartnest.issued")
        self.key: Ed25519PrivateKey | None = None
        self.webhook_id = ""

    async def async_load(self) -> None:
        saved = await self.key_store.async_load() or {}
        self.key = _load_key(saved.get("pem", "")) if saved.get("pem") else None
        self.webhook_id = saved.get("webhook") or ""
        if self.key:
            await self._ensure_webhook(saved)

    async def _ensure_webhook(self, saved: dict[str, Any]) -> None:
        """Client houses post their daily heartbeat here."""
        from homeassistant.components import webhook

        if not self.webhook_id:
            self.webhook_id = f"smartnest_{secrets.token_hex(16)}"
            await self.key_store.async_save({**saved, "webhook": self.webhook_id})
        try:
            # Client houses post from the internet (through Cloudflare, DuckDNS, Nabu Casa…), so not local-only.
            webhook.async_register(
                self.hass, DOMAIN, "SmartNest heartbeat", self.webhook_id, self._on_beat, local_only=False, allowed_methods=["POST"]
            )
        except ValueError:
            pass  # already registered (integration reloaded)

    def webhook_url(self) -> str:
        from homeassistant.components import webhook

        try:
            return webhook.async_generate_url(self.hass, self.webhook_id, prefer_external=True)
        except Exception:  # noqa: BLE001 - no external URL configured
            return webhook.async_generate_path(self.webhook_id)

    async def _on_beat(self, hass: HomeAssistant, webhook_id: str, request: Any) -> Any:
        """Stores the house's report, and answers with a newer key when the installer renewed it: remote renewal."""
        from aiohttp import web

        try:
            data = await request.json()
        except ValueError:
            return None
        key = str(data.get("key", ""))
        try:
            install = json.loads(_b64d(key.split(".")[1])).get("i", "")
        except (ValueError, IndexError):
            return None
        # Only genuine houses of this installer: the key must verify for the install it claims.
        if not install or (sent := verify(key, install)) is None:
            return None
        db = await self.db.async_load() or {}
        beats = db.get("beats", {})
        beats[install] = {
            "at": time.time(),
            "name": str(data.get("name", ""))[:60],
            "version": str(data.get("version", ""))[:20],
            "ha": str(data.get("ha", ""))[:20],
            "offline": int(data.get("offline") or 0),
            "offline_names": [str(x)[:40] for x in (data.get("offline_names") or [])[:8]],
            "low_battery": int(data.get("low_battery") or 0),
            "backup": str(data.get("backup") or "")[:40],
            "revoked": bool(data.get("revoked")),
            # Which key the house runs, so the page can say whether a renewal has reached it.
            "key_t": int(sent.get("t") or 0),
        }
        await self.db.async_save({**db, "beats": beats})
        if install in db.get("blocked", []):
            return web.json_response({"revoke": True})
        answer: dict[str, Any] = {"revoke": False}
        # The installer's brand, and a design sent to this house: only when the house doesn't have them yet.
        brand = db.get("brand")
        if brand and brand.get("v") != data.get("brand_v"):
            answer["brand"] = brand
        design = (db.get("designs") or {}).get(install)
        if design and design.get("v") != data.get("design_v"):
            answer["design"] = design
        newest = max((h for h in db.get("houses", []) if h.get("install") == install), key=lambda h: h.get("issued", 0), default=None)
        if newest and newest.get("issued", 0) > int(sent.get("t") or 0) and newest.get("key") != key:
            answer["key"] = newest["key"]
        return web.json_response(answer)

    async def async_setup_key(self, pem: str) -> bool:
        key = _load_key(pem)
        if key is None:
            return False
        await self.key_store.async_save({**(await self.key_store.async_load() or {}), "pem": pem.strip()})
        self.key = key
        return True

    async def async_forget_key(self) -> None:
        if self.webhook_id:
            from homeassistant.components import webhook

            webhook.async_unregister(self.hass, self.webhook_id)
        # The link's id stays: it's built into every house, so putting the key back must bring back the same link.
        await self.key_store.async_save({"webhook": self.webhook_id} if self.webhook_id else {})
        self.key = None

    def sign(self, install: str, name: str, plan: str, days: int | None, trial: bool, reseller: str | None) -> tuple[str, dict[str, Any]]:
        assert self.key is not None
        now = int(time.time())
        valid = 14 if trial else days
        payload: dict[str, Any] = {"v": 1, "i": install, "n": name, "t": now, "p": "premium" if trial else plan}
        if valid:
            payload["x"] = now + int(valid) * 86400
        if trial:
            payload["tr"] = 1
        if reseller:
            payload["r"] = reseller
        body = json.dumps(payload, ensure_ascii=False, separators=(",", ":")).encode()
        return f"SN1.{_b64e(body)}.{_b64e(self.key.sign(body))}", payload

    async def houses(self) -> list[dict[str, Any]]:
        return (await self.db.async_load() or {}).get("houses", [])

    async def save_houses(self, houses: list[dict[str, Any]]) -> None:
        db = await self.db.async_load() or {}
        await self.db.async_save({**db, "houses": houses})

    async def beats(self) -> dict[str, Any]:
        return (await self.db.async_load() or {}).get("beats", {})

    async def update_db(self, **changes: Any) -> dict[str, Any]:
        db = {**(await self.db.async_load() or {}), **changes}
        await self.db.async_save(db)
        return db

    async def blocked(self) -> list[str]:
        return (await self.db.async_load() or {}).get("blocked", [])

    async def set_blocked(self, install: str, on: bool) -> None:
        db = await self.db.async_load() or {}
        rest = [i for i in db.get("blocked", []) if i != install]
        await self.db.async_save({**db, "blocked": [*rest, install] if on else rest})


def _record(key: str, payload: dict[str, Any], phone: str = "", note: str = "") -> dict[str, Any]:
    return {
        "id": secrets.token_hex(6),
        "key": key,
        "install": payload["i"],
        "name": payload.get("n", ""),
        "plan": payload.get("p", "premium"),
        "trial": bool(payload.get("tr")),
        "reseller": payload.get("r", ""),
        "issued": payload.get("t", 0),
        "expires": payload.get("x"),
        "phone": phone,
        "note": note,
    }


def _issuer(hass: HomeAssistant) -> Issuer:
    return hass.data[DOMAIN]["issuer"]


@websocket_api.require_admin
@websocket_api.websocket_command({vol.Required("type"): "smartnest/issuer/status"})
@websocket_api.async_response
async def ws_status(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    iss = _issuer(hass)
    if not iss.key:
        connection.send_result(msg["id"], {"ready": False, "houses": []})
        return
    from homeassistant.components import webhook

    db = await iss.db.async_load() or {}

    connection.send_result(
        msg["id"],
        {
            "ready": True,
            "houses": await iss.houses(),
            "beats": await iss.beats(),
            "blocked": await iss.blocked(),
            "brand": db.get("brand"),
            "designs": {k: {"name": v.get("name", ""), "v": v.get("v")} for k, v in (db.get("designs") or {}).items()},
            "heartbeat_url": iss.webhook_url(),
            # The page builds the full link from the address it's opened on (a Cloudflare domain, DuckDNS…).
            "heartbeat_path": webhook.async_generate_path(iss.webhook_id),
        },
    )


@websocket_api.require_admin
@websocket_api.websocket_command({vol.Required("type"): "smartnest/issuer/test_url", vol.Required("url"): str})
@websocket_api.async_response
async def ws_test_url(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Posts to the heartbeat link from outside (through Cloudflare or whatever fronts HA) to see that it gets in."""
    from homeassistant.helpers.aiohttp_client import async_get_clientsession

    url = msg["url"].strip()
    if not url.startswith(("https://", "http://")):
        connection.send_error(msg["id"], "bad_url", "Not a link")
        return
    try:
        async with async_get_clientsession(hass).post(url, json={"test": True}, timeout=15, allow_redirects=False) as resp:
            body = (await resp.text())[:200]
            connection.send_result(msg["id"], {"status": resp.status, "body": body, "server": resp.headers.get("server", "")})
    except Exception as err:  # noqa: BLE001
        connection.send_result(msg["id"], {"status": 0, "body": str(err)[:200], "server": ""})


@websocket_api.require_admin
@websocket_api.websocket_command({vol.Required("type"): "smartnest/issuer/setup", vol.Required("pem"): str})
@websocket_api.async_response
async def ws_setup(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    iss = _issuer(hass)
    if not await iss.async_setup_key(msg["pem"]):
        connection.send_error(msg["id"], "wrong_key", "This isn't the SmartNest signing key")
        return
    await iss._ensure_webhook(await iss.key_store.async_load() or {})
    await async_sync_panel(hass)
    connection.send_result(msg["id"])


@websocket_api.require_admin
@websocket_api.websocket_command({vol.Required("type"): "smartnest/issuer/forget"})
@websocket_api.async_response
async def ws_forget(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    await _issuer(hass).async_forget_key()
    await async_sync_panel(hass)
    connection.send_result(msg["id"])


def _ready(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> Issuer | None:
    iss = _issuer(hass)
    if iss.key is None:
        connection.send_error(msg["id"], "no_key", "The license desk isn't set up on this house")
        return None
    return iss


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "smartnest/issuer/issue",
        vol.Required("install"): vol.All(str, vol.Match(r"^[0-9a-f]{32}$")),
        vol.Required("name"): vol.All(str, vol.Length(min=1, max=80)),
        vol.Required("plan"): vol.In(PLANS),
        vol.Optional("days"): vol.Any(None, vol.All(int, vol.Range(min=1, max=36500))),
        vol.Optional("trial", default=False): bool,
        vol.Optional("reseller", default=""): str,
        vol.Optional("phone", default=""): str,
        vol.Optional("note", default=""): str,
    }
)
@websocket_api.async_response
async def ws_issue(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    if not (iss := _ready(hass, connection, msg)):
        return
    key, payload = iss.sign(msg["install"], msg["name"].strip(), msg["plan"], msg.get("days"), msg["trial"], msg["reseller"].strip() or None)
    rec = _record(key, payload, msg["phone"].strip(), msg["note"].strip())
    await iss.save_houses([rec, *await iss.houses()])
    connection.send_result(msg["id"], rec)


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "smartnest/issuer/renew",
        # Not "id": that's the websocket message's own number, so the house's id travels as "house".
        vol.Required("house"): str,
        vol.Optional("plan"): vol.In(PLANS),
        vol.Optional("days"): vol.Any(None, vol.All(int, vol.Range(min=1, max=36500))),
    }
)
@websocket_api.async_response
async def ws_renew(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Same house, a fresh key from today. The old key keeps working until its own expiry."""
    if not (iss := _ready(hass, connection, msg)):
        return
    houses = await iss.houses()
    old = next((h for h in houses if h["id"] == msg["house"]), None)
    if old is None:
        connection.send_error(msg["id"], "not_found", "Not in the list")
        return
    key, payload = iss.sign(old["install"], old["name"], msg.get("plan", old["plan"]), msg.get("days"), False, old.get("reseller") or None)
    rec = _record(key, payload, old.get("phone", ""), old.get("note", ""))
    await iss.save_houses([rec, *houses])
    # Renewing a stopped house lets it back in.
    await iss.set_blocked(old["install"], False)
    connection.send_result(msg["id"], rec)


@websocket_api.require_admin
@websocket_api.websocket_command({vol.Required("type"): "smartnest/issuer/block", vol.Required("install"): str, vol.Required("blocked"): bool})
@websocket_api.async_response
async def ws_block(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Stops a house from afar: its next heartbeat locks it. Letting it back opens it on the beat after."""
    if not (iss := _ready(hass, connection, msg)):
        return
    await iss.set_blocked(msg["install"], msg["blocked"])
    connection.send_result(msg["id"])


@websocket_api.require_admin
@websocket_api.websocket_command({vol.Required("type"): "smartnest/issuer/update", vol.Required("house"): str, vol.Optional("phone"): str, vol.Optional("note"): str})
@websocket_api.async_response
async def ws_update(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    if not (iss := _ready(hass, connection, msg)):
        return
    houses = await iss.houses()
    for h in houses:
        if h["id"] == msg["house"]:
            for k in ("phone", "note"):
                if k in msg:
                    h[k] = msg[k].strip()
    await iss.save_houses(houses)
    connection.send_result(msg["id"])


@websocket_api.require_admin
@websocket_api.websocket_command({vol.Required("type"): "smartnest/issuer/remove", vol.Required("install"): str})
@websocket_api.async_response
async def ws_remove(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Drops a house from the list (its keys keep working)."""
    if not (iss := _ready(hass, connection, msg)):
        return
    await iss.save_houses([h for h in await iss.houses() if h["install"] != msg["install"]])
    connection.send_result(msg["id"])


@websocket_api.require_admin
@websocket_api.websocket_command({vol.Required("type"): "smartnest/issuer/import", vol.Required("key"): str})
@websocket_api.async_response
async def ws_import(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Adds a key made earlier (in the terminal) to the list."""
    if not (iss := _ready(hass, connection, msg)):
        return
    key = msg["key"].strip()
    try:
        body = _b64d(key.split(".")[1])
        install = json.loads(body).get("i", "")
    except (ValueError, IndexError, json.JSONDecodeError):
        install = ""
    payload = verify(key, install) if install else None
    if payload is None:
        connection.send_error(msg["id"], "bad_key", "Not a SmartNest key signed by you")
        return
    houses = await iss.houses()
    if any(h["key"] == key for h in houses):
        connection.send_error(msg["id"], "exists", "Already in the list")
        return
    rec = _record(key, payload)
    await iss.save_houses([*houses, rec])
    connection.send_result(msg["id"], rec)


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "smartnest/issuer/brand",
        vol.Optional("name"): vol.All(str, vol.Length(max=60)),
        # A small logo as a data: URL (PNG, SVG, WebP), sent to every house with its heartbeat.
        vol.Optional("logo"): vol.Any(None, vol.All(str, vol.Length(max=200_000), vol.Match(r"^data:image/(png|svg\+xml|webp|jpeg);base64,"))),
        vol.Optional("clear", default=False): bool,
    }
)
@websocket_api.async_response
async def ws_brand(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """The installer's name and logo, shown on every client's dashboard instead of SmartNest's."""
    if not (iss := _ready(hass, connection, msg)):
        return
    db = await iss.db.async_load() or {}
    if msg["clear"]:
        brand = {"name": "", "logo": None, "v": int(time.time())}
    else:
        old = db.get("brand") or {}
        brand = {"name": msg.get("name", old.get("name", "")), "logo": msg["logo"] if "logo" in msg else old.get("logo"), "v": int(time.time())}
    await iss.update_db(brand=brand)
    connection.send_result(msg["id"], brand)


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "smartnest/issuer/send_design",
        vol.Required("install"): vol.All(str, vol.Match(r"^[0-9a-f]{32}$")),
        vol.Optional("config"): dict,
        vol.Optional("name", default=""): str,
    }
)
@websocket_api.async_response
async def ws_send_design(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """A dashboard design for a client house: it arrives with the next heartbeat and waits there for their OK."""
    if not (iss := _ready(hass, connection, msg)):
        return
    db = await iss.db.async_load() or {}
    designs = dict(db.get("designs") or {})
    config = msg.get("config")
    if config is None:
        designs.pop(msg["install"], None)
    else:
        if not isinstance(config.get("pages"), list) or len(json.dumps(config)) > 400_000:
            connection.send_error(msg["id"], "invalid_format", "Not a dashboard, or too large")
            return
        designs[msg["install"]] = {"config": config, "name": msg["name"].strip()[:60], "v": int(time.time())}
    await iss.update_db(designs=designs)
    connection.send_result(msg["id"])
