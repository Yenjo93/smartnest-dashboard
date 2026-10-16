"""Guest codes for keypad locks: a code for the cleaner on Tuesdays, or guests for the weekend, that ends by itself.

Codes are written to the lock through Z-Wave JS user code slots (the slots the installer set aside, 10-19 by default).
Admins only: this opens the front door.
"""
from __future__ import annotations

from datetime import timedelta
import logging
import secrets
import time
from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.event import async_track_time_interval
from homeassistant.helpers.storage import Store

from .const import DOMAIN
from .license import NOT_LICENSED, is_licensed

_LOGGER = logging.getLogger(__name__)
SLOTS = range(10, 20)


class GuestCodes:
    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self.store: Store[dict] = Store(hass, 1, "smartnest.codes")
        self.codes: list[dict[str, Any]] = []
        self._unsub = None

    async def async_load(self) -> None:
        self.codes = (await self.store.async_load() or {}).get("codes", [])
        self._unsub = async_track_time_interval(self.hass, self._tick, timedelta(minutes=1))

    def async_stop(self) -> None:
        if self._unsub:
            self._unsub()

    async def _save(self) -> None:
        await self.store.async_save({"codes": self.codes})

    async def _write(self, c: dict[str, Any], on: bool) -> bool:
        try:
            if on:
                await self.hass.services.async_call(
                    "zwave_js", "set_lock_usercode", {"entity_id": c["lock"], "code_slot": c["slot"], "usercode": c["code"]}, blocking=True
                )
            else:
                await self.hass.services.async_call("zwave_js", "clear_lock_usercode", {"entity_id": c["lock"], "code_slot": c["slot"]}, blocking=True)
            return True
        except Exception as err:  # noqa: BLE001
            _LOGGER.warning("Lock code %s on %s failed: %s", "set" if on else "clear", c["lock"], err)
            return False

    @callback
    def _tick(self, _now=None) -> None:
        self.hass.async_create_task(self._apply())

    async def _apply(self) -> None:
        """Codes go live at their start and are wiped at their end."""
        now = time.time()
        changed = False
        for c in list(self.codes):
            if c["until"] <= now:
                if c.get("live"):
                    await self._write(c, False)
                self.codes.remove(c)
                changed = True
            elif c["from"] <= now and not c.get("live"):
                c["live"] = await self._write(c, True)
                changed = True
        if changed:
            await self._save()

    async def add(self, lock: str, name: str, start: float, end: float, code: str | None) -> dict[str, Any]:
        used = {c["slot"] for c in self.codes if c["lock"] == lock}
        slot = next((s for s in SLOTS if s not in used), None)
        if slot is None:
            raise ValueError("no_slot")
        c = {
            "id": secrets.token_hex(5),
            "lock": lock,
            "name": name,
            "slot": slot,
            "code": code or f"{secrets.randbelow(900000) + 100000}",
            "from": start,
            "until": end,
            "live": False,
        }
        self.codes.append(c)
        await self._apply()
        await self._save()
        return c

    async def remove(self, code_id: str) -> None:
        for c in list(self.codes):
            if c["id"] == code_id:
                if c.get("live"):
                    await self._write(c, False)
                self.codes.remove(c)
        await self._save()


def _codes(hass: HomeAssistant) -> GuestCodes:
    return hass.data[DOMAIN]["codes"]


@websocket_api.require_admin
@websocket_api.websocket_command({vol.Required("type"): "smartnest/codes/list"})
@callback
def ws_codes_list(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    connection.send_result(msg["id"], {"codes": _codes(hass).codes, "zwave": hass.services.has_service("zwave_js", "set_lock_usercode")})


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "smartnest/codes/add",
        vol.Required("lock"): str,
        vol.Required("name"): vol.All(str, vol.Length(min=1, max=40)),
        vol.Required("from"): vol.Coerce(float),
        vol.Required("until"): vol.Coerce(float),
        vol.Optional("code"): vol.All(str, vol.Match(r"^\d{4,8}$")),
    }
)
@websocket_api.async_response
async def ws_codes_add(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    if not is_licensed(hass):
        connection.send_error(msg["id"], NOT_LICENSED, "SmartNest needs an activation key")
        return
    if not msg["lock"].startswith("lock.") or msg["until"] <= max(msg["from"], time.time()):
        connection.send_error(msg["id"], "invalid", "Check the lock and the dates")
        return
    try:
        c = await _codes(hass).add(msg["lock"], msg["name"].strip(), msg["from"], msg["until"], msg.get("code"))
    except ValueError:
        connection.send_error(msg["id"], "no_slot", "All guest slots on this lock are in use")
        return
    connection.send_result(msg["id"], c)


@websocket_api.require_admin
@websocket_api.websocket_command({vol.Required("type"): "smartnest/codes/remove", vol.Required("code_id"): str})
@websocket_api.async_response
async def ws_codes_remove(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    await _codes(hass).remove(msg["code_id"])
    connection.send_result(msg["id"])
