"""Sleep timers: "turn this off in 30 minutes". Kept on the server, so they survive a closed screen and a restart."""
from __future__ import annotations

from datetime import datetime, timedelta
import logging
from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import CALLBACK_TYPE, HomeAssistant, callback
from homeassistant.helpers.event import async_track_point_in_utc_time
from homeassistant.helpers.storage import Store
from homeassistant.util import dt as dt_util

from .const import DOMAIN

_LOGGER = logging.getLogger(__name__)


class Timers:
    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self.store: Store[dict] = Store(hass, 1, "smartnest.timers")
        self.due: dict[str, datetime] = {}
        self._unsub: dict[str, CALLBACK_TYPE] = {}

    async def async_load(self) -> None:
        saved = await self.store.async_load() or {}
        for entity_id, iso in saved.items():
            when = dt_util.parse_datetime(iso)
            if when:
                self._schedule(entity_id, when)

    def _schedule(self, entity_id: str, when: datetime) -> None:
        self.cancel(entity_id, save=False)
        if when <= dt_util.utcnow():
            # Missed while HA was down: do it now.
            self.hass.async_create_task(self._fire(entity_id))
            return
        self.due[entity_id] = when

        @callback
        def _run(_now: datetime) -> None:
            self.hass.async_create_task(self._fire(entity_id))

        self._unsub[entity_id] = async_track_point_in_utc_time(self.hass, _run, when)

    async def _fire(self, entity_id: str) -> None:
        self.due.pop(entity_id, None)
        self._unsub.pop(entity_id, None)
        await self._save()
        try:
            await self.hass.services.async_call("homeassistant", "turn_off", {"entity_id": entity_id}, blocking=False)
        except Exception as err:  # noqa: BLE001 - a failed timer must not crash the integration
            _LOGGER.warning("SmartNest timer for %s failed: %s", entity_id, err)

    async def async_set(self, entity_id: str, minutes: float) -> datetime:
        when = dt_util.utcnow() + timedelta(minutes=minutes)
        self._schedule(entity_id, when)
        await self._save()
        return when

    def cancel(self, entity_id: str, save: bool = True) -> None:
        if unsub := self._unsub.pop(entity_id, None):
            unsub()
        self.due.pop(entity_id, None)
        if save:
            self.hass.async_create_task(self._save())

    async def _save(self) -> None:
        await self.store.async_save({k: v.isoformat() for k, v in self.due.items()})

    @callback
    def async_stop(self) -> None:
        for unsub in self._unsub.values():
            unsub()
        self._unsub.clear()


def _timers(hass: HomeAssistant) -> Timers | None:
    return (hass.data.get(DOMAIN) or {}).get("timers")


@websocket_api.websocket_command({vol.Required("type"): "smartnest/timer/list"})
@callback
def ws_timer_list(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    t = _timers(hass)
    connection.send_result(msg["id"], {k: v.isoformat() for k, v in (t.due.items() if t else [])})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "smartnest/timer/set",
        vol.Required("entity_id"): str,
        vol.Required("minutes"): vol.All(vol.Coerce(float), vol.Range(min=1, max=24 * 60)),
    }
)
@websocket_api.async_response
async def ws_timer_set(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    from .license import is_licensed

    t = _timers(hass)
    if t is None or not is_licensed(hass):
        connection.send_error(msg["id"], "not_licensed", "SmartNest needs an activation key")
        return
    if hass.states.get(msg["entity_id"]) is None:
        connection.send_error(msg["id"], "not_found", "Unknown entity")
        return
    when = await t.async_set(msg["entity_id"], msg["minutes"])
    connection.send_result(msg["id"], {"due": when.isoformat()})


@websocket_api.websocket_command({vol.Required("type"): "smartnest/timer/cancel", vol.Required("entity_id"): str})
@callback
def ws_timer_cancel(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    if t := _timers(hass):
        t.cancel(msg["entity_id"])
    connection.send_result(msg["id"])
