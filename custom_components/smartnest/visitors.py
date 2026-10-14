"""Doorbell visitor log: a camera snapshot on every ring, kept for a few days, then deleted."""
from __future__ import annotations

from datetime import datetime, timedelta
import logging
import os
import secrets
from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.components.camera import async_get_image
from homeassistant.core import Event, EventStateChangedData, HomeAssistant, callback
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.helpers.event import async_track_state_change_event
from homeassistant.util import dt as dt_util

from .const import DOMAIN, FILES_URL, SIGNAL_CONFIG_UPDATED

_LOGGER = logging.getLogger(__name__)

SUBDIR = "visitors"
MAX_LIST = 60


class VisitorLog:
    """Watches the doorbell from the saved dashboard settings and snapshots its camera."""

    def __init__(self, hass: HomeAssistant, files_dir: str) -> None:
        self.hass = hass
        self.dir = os.path.join(files_dir, SUBDIR)
        self._unsub_trigger: Any = None
        self._unsub_config: Any = None

    async def async_start(self) -> None:
        await self.hass.async_add_executor_job(os.makedirs, self.dir, 0o755, True)
        self._bind(self._settings())
        self._unsub_config = async_dispatcher_connect(self.hass, SIGNAL_CONFIG_UPDATED, self._on_config)
        await self._prune()

    @callback
    def async_stop(self) -> None:
        if self._unsub_trigger:
            self._unsub_trigger()
        if self._unsub_config:
            self._unsub_config()

    def _settings(self) -> dict[str, Any]:
        config = (self.hass.data.get(DOMAIN) or {}).get("config") or {}
        return (config.get("settings") or {}).get("doorbell") or {}

    @callback
    def _on_config(self, config: dict[str, Any]) -> None:
        self._bind((config.get("settings") or {}).get("doorbell") or {})

    @callback
    def _bind(self, doorbell: dict[str, Any]) -> None:
        if self._unsub_trigger:
            self._unsub_trigger()
            self._unsub_trigger = None
        trigger = doorbell.get("trigger_entity")
        if trigger and doorbell.get("camera_entity"):
            self._unsub_trigger = async_track_state_change_event(self.hass, [trigger], self._on_trigger)

    @callback
    def _on_trigger(self, event: Event[EventStateChangedData]) -> None:
        new = event.data["new_state"]
        old = event.data["old_state"]
        if new is None or new.state in ("unknown", "unavailable"):
            return
        if new.entity_id.startswith("event."):
            # An event entity's state is the time of its last press. Only count fresh presses, not a
            # restored state after a restart.
            when = dt_util.parse_datetime(new.state)
            if when is None or dt_util.utcnow() - when > timedelta(seconds=30):
                return
        elif not (new.state == "on" and (old is None or old.state != "on")):
            return
        self.hass.async_create_task(self._snapshot())

    async def _snapshot(self) -> None:
        camera = self._settings().get("camera_entity")
        if not camera:
            return
        try:
            image = await async_get_image(self.hass, camera)
        except Exception as err:  # noqa: BLE001 - a missed snapshot must never break the doorbell
            _LOGGER.warning("Doorbell snapshot from %s failed: %s", camera, err)
            return
        ext = ".png" if "png" in (image.content_type or "") else ".jpg"
        # Timestamp first so names sort by time; random tail so the URL can't be guessed.
        name = f"{dt_util.utcnow().strftime('%Y%m%dT%H%M%S')}-{secrets.token_hex(12)}{ext}"
        await self.hass.async_add_executor_job(self._write, name, image.content)
        await self._prune()

    def _write(self, name: str, content: bytes) -> None:
        with open(os.path.join(self.dir, name), "wb") as fh:
            fh.write(content)

    async def _prune(self) -> None:
        days = int(self._settings().get("keep_days") or 7)
        cutoff = dt_util.utcnow() - timedelta(days=max(1, days))
        await self.hass.async_add_executor_job(self._prune_sync, cutoff)

    def _prune_sync(self, cutoff: datetime) -> None:
        for name in os.listdir(self.dir):
            when = _parse(name)
            if when and when < cutoff:
                try:
                    os.remove(os.path.join(self.dir, name))
                except OSError:
                    pass

    def list(self) -> list[dict[str, str]]:
        names = sorted((n for n in os.listdir(self.dir) if _parse(n)), reverse=True)[:MAX_LIST]
        return [{"url": f"{FILES_URL}/{SUBDIR}/{n}", "time": _parse(n).isoformat()} for n in names]  # type: ignore[union-attr]


def _parse(name: str) -> datetime | None:
    try:
        return datetime.strptime(name[:15], "%Y%m%dT%H%M%S").replace(tzinfo=dt_util.UTC)
    except ValueError:
        return None


@websocket_api.websocket_command({vol.Required("type"): "smartnest/visitors/list"})
@websocket_api.async_response
async def ws_list_visitors(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    from .license import is_licensed

    log: VisitorLog | None = (hass.data.get(DOMAIN) or {}).get("visitors")
    if log is None or not is_licensed(hass):
        connection.send_result(msg["id"], {"visitors": []})
        return
    connection.send_result(msg["id"], {"visitors": await hass.async_add_executor_job(log.list)})
