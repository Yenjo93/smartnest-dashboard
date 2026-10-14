"""A short daily "all well?" from each client house to the installer's license page.

Only when the installer puts their heartbeat link in this house's settings. It carries the house's own license key,
so the installer's side knows it's a genuine house of theirs, plus a few counts: nothing about the family.
"""
from __future__ import annotations

from datetime import timedelta
import logging
import time
from typing import Any

from homeassistant.const import __version__ as HA_VERSION
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.event import async_call_later, async_track_time_interval

from .const import DOMAIN, LICENSE_STORAGE_KEY

_LOGGER = logging.getLogger(__name__)
_WATCHED = ("light", "switch", "lock", "climate", "cover", "binary_sensor", "camera", "vacuum", "fan")


class Heartbeat:
    def __init__(self, hass: HomeAssistant, version: str) -> None:
        self.hass = hass
        self.version = version
        self._unsubs: list = []

    def async_start(self) -> None:
        self._unsubs.append(async_call_later(self.hass, 120, self._beat))
        self._unsubs.append(async_track_time_interval(self.hass, self._beat, timedelta(hours=12)))

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
        url = ((settings.get("installer") or {}).get("heartbeat_url") or "").strip()
        if not url.startswith("https://") and not url.startswith("http://"):
            return False
        from homeassistant.helpers.storage import Store

        key = ((await Store(self.hass, 1, LICENSE_STORAGE_KEY).async_load()) or {}).get("key")
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
        }
        try:
            async with async_get_clientsession(self.hass).post(url, json=payload, timeout=20) as resp:
                return resp.status < 300
        except Exception as err:  # noqa: BLE001 - a missed beat is fine, the next one comes in 12 h
            _LOGGER.debug("SmartNest heartbeat failed: %s", err)
            return False


def _num(v: str) -> float | None:
    try:
        return float(v)
    except ValueError:
        return None
