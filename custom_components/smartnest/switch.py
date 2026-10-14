"""Travel mode: one switch that shuts the house down, keeps it looking lived-in, and reports every evening."""
from __future__ import annotations

from datetime import timedelta
import logging
import random
from typing import Any

from homeassistant.components.switch import SwitchEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.event import async_track_time_change, async_track_time_interval
from homeassistant.helpers.restore_state import RestoreEntity
from homeassistant.util import dt as dt_util

from .const import DOMAIN

_LOGGER = logging.getLogger(__name__)

# Lights go on and off at random between dusk and this hour, like someone's home.
_SIM_UNTIL = 23
_SIM_FROM = 16

_REPORT = {
    "ar": {
        "title": "SmartNest · البيت وانتو مسافرين",
        "ok": "كل إشي تمام.",
        "open": "مفتوح: {x}",
        "leak": "⚠️ تسريب: {x}",
        "offline": "{n} أجهزة فاصلة",
        "alarm": "الإنذار: {x}",
        "temp": "الحرارة جوّا {x}°",
    },
    "en": {
        "title": "SmartNest · Home while you're away",
        "ok": "All good.",
        "open": "Open: {x}",
        "leak": "⚠️ Leak: {x}",
        "offline": "{n} devices offline",
        "alarm": "Alarm: {x}",
        "temp": "Inside {x}°",
    },
    "he": {
        "title": "SmartNest · הבית בזמן שאתם בחופשה",
        "ok": "הכל תקין.",
        "open": "פתוח: {x}",
        "leak": "⚠️ נזילה: {x}",
        "offline": "{n} מכשירים מנותקים",
        "alarm": "אזעקה: {x}",
        "temp": "בפנים {x}°",
    },
}


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry, async_add_entities: AddEntitiesCallback) -> None:
    async_add_entities([TravelSwitch(hass)])


def _settings(hass: HomeAssistant) -> dict[str, Any]:
    cfg = (hass.data.get(DOMAIN) or {}).get("config") or {}
    return (cfg.get("settings") or {}).get("travel") or {}


def _lang(hass: HomeAssistant) -> str:
    cfg = (hass.data.get(DOMAIN) or {}).get("config") or {}
    lang = (cfg.get("settings") or {}).get("language", "ar")
    return lang if lang in _REPORT else "ar"


def _name(hass: HomeAssistant, entity_id: str) -> str:
    st = hass.states.get(entity_id)
    return str(st.attributes.get("friendly_name", entity_id)) if st else entity_id


class TravelSwitch(SwitchEntity, RestoreEntity):
    _attr_name = "SmartNest travel mode"
    _attr_unique_id = "smartnest_travel_mode"
    _attr_icon = "mdi:airplane"

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self._attr_is_on = False
        self._unsubs: list = []
        self._sim_on: set[str] = set()

    async def async_added_to_hass(self) -> None:
        last = await self.async_get_last_state()
        if last and last.state == "on":
            self._attr_is_on = True
            self._start_loops()

    async def async_will_remove_from_hass(self) -> None:
        self._stop_loops()

    async def async_turn_on(self, **kwargs: Any) -> None:
        s = _settings(self.hass)
        for entity_id in s.get("off", []):
            domain = entity_id.split(".")[0]
            if domain == "valve":
                service, svc_domain = "close_valve", "valve"
            elif domain == "climate":
                service, svc_domain = "turn_off", "climate"
            else:
                service, svc_domain = "turn_off", "homeassistant"
            try:
                await self.hass.services.async_call(svc_domain, service, {"entity_id": entity_id}, blocking=False)
            except Exception:  # noqa: BLE001 - one missing device mustn't stop the rest
                _LOGGER.warning("Travel mode could not turn off %s", entity_id)
        if s.get("arm"):
            for st in self.hass.states.async_all("alarm_control_panel"):
                if st.state == "disarmed":
                    await self.hass.services.async_call("alarm_control_panel", "alarm_arm_away", {"entity_id": st.entity_id}, blocking=False)
        self._attr_is_on = True
        self._start_loops()
        self.async_write_ha_state()

    async def async_turn_off(self, **kwargs: Any) -> None:
        self._stop_loops()
        await self._lights_off()
        self._attr_is_on = False
        self.async_write_ha_state()

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        return {"simulating": sorted(self._sim_on)}

    # ---- loops ----

    def _start_loops(self) -> None:
        self._stop_loops()
        self._unsubs.append(async_track_time_interval(self.hass, self._simulate, timedelta(minutes=7)))
        self._unsubs.append(async_track_time_change(self.hass, self._report, hour=20, minute=0, second=0))

    def _stop_loops(self) -> None:
        for unsub in self._unsubs:
            unsub()
        self._unsubs.clear()

    def _lights(self) -> list[str]:
        chosen = [e for e in _settings(self.hass).get("lights", []) if self.hass.states.get(e)]
        if chosen:
            return chosen
        return [st.entity_id for st in self.hass.states.async_all("light")][:4]

    async def _lights_off(self) -> None:
        for entity_id in list(self._sim_on):
            await self.hass.services.async_call("light", "turn_off", {"entity_id": entity_id}, blocking=False)
        self._sim_on.clear()

    async def _simulate(self, _now=None) -> None:
        if not self.is_on or not _settings(self.hass).get("simulate", True):
            return
        now = dt_util.now()
        sun = self.hass.states.get("sun.sun")
        dark = sun.state == "below_horizon" if sun else now.hour >= 18
        if not (dark and _SIM_FROM <= now.hour < _SIM_UNTIL):
            if self._sim_on:
                await self._lights_off()
                self.async_write_ha_state()
            return
        lights = self._lights()
        if not lights or random.random() > 0.45:
            return
        light = random.choice(lights)
        if light in self._sim_on:
            await self.hass.services.async_call("light", "turn_off", {"entity_id": light}, blocking=False)
            self._sim_on.discard(light)
        elif len(self._sim_on) < 2:
            await self.hass.services.async_call("light", "turn_on", {"entity_id": light}, blocking=False)
            self._sim_on.add(light)
        self.async_write_ha_state()

    @callback
    def _report(self, _now=None) -> None:
        target = _settings(self.hass).get("notify")
        if not self.is_on or not target or "." not in target:
            return
        tr = _REPORT[_lang(self.hass)]
        lines: list[str] = []
        states = self.hass.states.async_all()
        open_ = [
            _name(self.hass, s.entity_id)
            for s in states
            if s.domain == "binary_sensor" and s.state == "on" and s.attributes.get("device_class") in ("door", "window", "opening", "garage_door")
        ]
        leaks = [_name(self.hass, s.entity_id) for s in states if s.domain == "binary_sensor" and s.state == "on" and s.attributes.get("device_class") == "moisture"]
        offline = [s for s in states if s.state == "unavailable" and s.domain in ("light", "switch", "lock", "binary_sensor", "climate", "camera")]
        alarm = next((s for s in states if s.domain == "alarm_control_panel"), None)
        temp = next(
            (s for s in states if s.domain == "sensor" and s.attributes.get("device_class") == "temperature" and "out" not in s.entity_id),
            None,
        )
        if leaks:
            lines.append(tr["leak"].format(x=", ".join(leaks)))
        if open_:
            lines.append(tr["open"].format(x=", ".join(open_[:5])))
        if alarm:
            lines.append(tr["alarm"].format(x=alarm.state))
        if temp:
            lines.append(tr["temp"].format(x=temp.state))
        if offline:
            lines.append(tr["offline"].format(n=len(offline)))
        if not leaks and not open_:
            lines.insert(0, tr["ok"])
        domain, service = target.split(".", 1)
        self.hass.async_create_task(
            self.hass.services.async_call(domain, service, {"title": tr["title"], "message": "\n".join(lines)}, blocking=False)
        )
