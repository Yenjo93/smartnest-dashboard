"""A short "all well?" every few hours from each client house to the license desk (a built-in link, never shown).

It carries the house's own license key,
so the installer's side knows it's a genuine house of theirs, plus a few counts: nothing about the family.
When the installer has renewed the house's key, the answer carries the new one and it's put in here by itself.
"""
from __future__ import annotations

import base64
from datetime import timedelta
import json
import logging
import time
from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.const import __version__ as HA_VERSION
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.event import async_call_later, async_track_time_interval


from .const import DOMAIN, HEARTBEAT_URL_B64, LICENSE_STORAGE_KEY
from .license import verify

_LOGGER = logging.getLogger(__name__)
_WATCHED = ("light", "switch", "lock", "climate", "cover", "binary_sensor", "camera", "vacuum", "fan")


class Heartbeat:
    def __init__(self, hass: HomeAssistant, version: str) -> None:
        self.hass = hass
        self.version = version
        self._unsubs: list = []
        from homeassistant.helpers.storage import Store

        self._design_store: Store[dict] = Store(hass, 1, "smartnest.design")

    async def _take_brand(self, brand: dict[str, Any]) -> None:
        """The installer's name and logo on this dashboard (or SmartNest's again when they cleared it)."""
        from .websocket import async_set_config

        config = (self.hass.data.get(DOMAIN) or {}).get("config")
        if not isinstance(config, dict):
            return
        logo = brand.get("logo")
        clean = {
            "name": str(brand.get("name") or "")[:60],
            "logo": logo if isinstance(logo, str) and logo.startswith("data:image/") and len(logo) < 200_000 else None,
            "v": brand.get("v"),
        }
        settings = dict(config.get("settings") or {})
        settings["installer"] = {**(settings.get("installer") or {}), "brand": clean}
        await async_set_config(self.hass, {**config, "settings": settings}, "SmartNest")

    def async_start(self) -> None:
        self._unsubs.append(async_call_later(self.hass, 120, self._beat))
        self._unsubs.append(async_track_time_interval(self.hass, self._beat, timedelta(hours=3)))

    def async_stop(self) -> None:
        for unsub in self._unsubs:
            unsub()
        self._unsubs.clear()

    @callback
    def _beat(self, _now=None) -> None:
        self.hass.async_create_task(self.async_send())

    async def async_send(self) -> bool:
        data = self.hass.data.get(DOMAIN) or {}
        settings = (data.get("config") or {}).get("settings") or {}
        url = base64.b64decode(HEARTBEAT_URL_B64).decode()
        from homeassistant.helpers.storage import Store

        key = ((await Store(self.hass, 1, LICENSE_STORAGE_KEY).async_load()) or {}).get("key")
        lic = data.get("license")
        if not key:
            return False
        states = self.hass.states.async_all()
        offline = [s for s in states if s.state == "unavailable" and s.domain in _WATCHED]
        low = [
            s
            for s in states
            if s.attributes.get("device_class") == "battery" and s.domain == "sensor" and _num(s.state) is not None and _num(s.state) < 20
        ]
        backup = next((s for s in states if s.entity_id.endswith("backup_last_successful_automatic_backup")), None)
        payload: dict[str, Any] = {
            "key": key,
            "name": settings.get("home_name") or self.hass.config.location_name,
            "version": self.version,
            "ha": HA_VERSION,
            "offline": len(offline),
            "offline_names": [str(s.attributes.get("friendly_name", s.entity_id))[:40] for s in offline[:8]],
            "low_battery": len(low),
            "backup": backup.state if backup else None,
            "at": time.time(),
            "revoked": bool(lic and lic.revoked_at is not None),
            # What this house already has from the installer, so only something new is sent back.
            "brand_v": ((settings.get("installer") or {}).get("brand") or {}).get("v"),
            "design_v": (await self._design_store.async_load() or {}).get("v"),
        }
        try:
            async with async_get_clientsession(self.hass).post(url, json=payload, timeout=20) as resp:
                if resp.status >= 300:
                    return False
                text = await resp.text()
        except Exception as err:  # noqa: BLE001 - a missed beat is fine, the next one comes in 3 h
            _LOGGER.debug("SmartNest heartbeat failed: %s", err)
            return False
        try:
            answer = json.loads(text) if text.strip() else None
        except ValueError:
            answer = None
        if not isinstance(answer, dict):
            return True
        if isinstance(answer.get("key"), str):
            await self._take_key(answer["key"])
        if isinstance(answer.get("brand"), dict):
            await self._take_brand(answer["brand"])
        if isinstance(answer.get("design"), dict) and isinstance(answer["design"].get("config"), dict):
            # Waits for the family's admin to say yes on the dashboard; nothing changes by itself.
            d = answer["design"]
            await self._design_store.async_save({"v": d.get("v"), "pending": {"config": d["config"], "name": str(d.get("name", ""))[:60], "v": d.get("v")}})
        # The installer stopped (or let back) this house.
        if isinstance(answer.get("revoke"), bool) and lic is not None:
            await lic.async_set_revoked(answer["revoke"])
            if answer["revoke"]:
                _LOGGER.warning("SmartNest: the installer has stopped this house's license")
        return True

    async def _take_key(self, key: str) -> None:
        """A renewal from the installer. Taken only if it verifies for this house and is newer than the current key."""
        lic = (self.hass.data.get(DOMAIN) or {}).get("license")
        if lic is None:
            return
        info = verify(key, lic.iid)
        exp = (info or {}).get("x")
        if info is None or (exp and time.time() > float(exp)) or int(info.get("t") or 0) <= int((lic.info or {}).get("t") or 0):
            return
        await lic.async_activate(key)
        _LOGGER.info("SmartNest: the installer renewed this house's license (%s)", info.get("p", "premium"))


def _num(v: str) -> float | None:
    try:
        return float(v)
    except ValueError:
        return None


def _beat(hass: HomeAssistant) -> Heartbeat | None:
    return (hass.data.get(DOMAIN) or {}).get("heartbeat")


@websocket_api.require_admin
@websocket_api.websocket_command({vol.Required("type"): "smartnest/design/pending"})
@websocket_api.async_response
async def ws_design_pending(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """A design the installer sent, waiting for this house's OK (or None)."""
    beat = _beat(hass)
    saved = (await beat._design_store.async_load() or {}) if beat else {}
    connection.send_result(msg["id"], saved.get("pending"))


@websocket_api.require_admin
@websocket_api.websocket_command({vol.Required("type"): "smartnest/design/done"})
@websocket_api.async_response
async def ws_design_done(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Applied or declined: either way it isn't asked again (the version stays, so it isn't sent again either)."""
    beat = _beat(hass)
    if beat:
        saved = await beat._design_store.async_load() or {}
        await beat._design_store.async_save({"v": saved.get("v"), "pending": None})
    connection.send_result(msg["id"])
