"""Lights that follow the sun: cool white through the day, warm in the evening, warmest at night.

Only the lights chosen in the dashboard's settings, only while they're on, and only in white (a colour scene is left
alone). Someone changing a light's white by hand pauses it for that light until it's next switched off.
"""
from __future__ import annotations

from datetime import timedelta
import logging
from typing import Any

from homeassistant.core import Event, HomeAssistant, callback
from homeassistant.helpers.event import async_track_state_change_event, async_track_time_interval

from homeassistant.helpers.dispatcher import async_dispatcher_connect

from .const import DOMAIN, SIGNAL_CONFIG_UPDATED

_LOGGER = logging.getLogger(__name__)


def kelvin_now(hass: HomeAssistant) -> int:
    """5000 K high in the sky, easing to 2700 K at sunset and 2200 K deep in the night."""
    sun = hass.states.get("sun.sun")
    try:
        elev = float(sun.attributes.get("elevation")) if sun else 0.0
    except (TypeError, ValueError):
        elev = 0.0
    if elev >= 30:
        return 5000
    if elev >= 0:
        return round(2700 + (5000 - 2700) * elev / 30)
    if elev >= -12:
        return round(2200 + 500 * (elev + 12) / 12)
    return 2200


class Circadian:
    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self._unsubs: list = []
        self._unsub_lights = None
        self._watched: tuple[str, ...] = ()
        # What we last set per light; a different white means a hand changed it.
        self._ours: dict[str, int] = {}
        self._paused: set[str] = set()

    def _lights(self) -> list[str]:
        settings = ((self.hass.data.get(DOMAIN) or {}).get("config") or {}).get("settings") or {}
        lights = settings.get("circadian") or []
        return [x for x in lights if isinstance(x, str) and x.startswith("light.")]

    def async_start(self) -> None:
        self._unsubs.append(async_track_time_interval(self.hass, self._tick, timedelta(minutes=5)))
        # A light added or removed in the dashboard's settings takes effect at once.
        self._unsubs.append(async_dispatcher_connect(self.hass, SIGNAL_CONFIG_UPDATED, lambda _c: self._watch()))
        self._watch()

    def async_stop(self) -> None:
        for unsub in self._unsubs:
            unsub()
        self._unsubs.clear()
        if self._unsub_lights:
            self._unsub_lights()

    def _watch(self) -> None:
        lights = tuple(sorted(self._lights()))
        if lights == self._watched:
            return
        if self._unsub_lights:
            self._unsub_lights()
            self._unsub_lights = None
        self._watched = lights
        if lights:
            self._unsub_lights = async_track_state_change_event(self.hass, list(lights), self._changed)

    @callback
    def _changed(self, event: Event) -> None:
        new = event.data.get("new_state")
        old = event.data.get("old_state")
        eid = event.data.get("entity_id")
        if new is None:
            return
        if new.state != "on":
            self._paused.discard(eid)
            self._ours.pop(eid, None)
            return
        if old is None or old.state != "on":
            # Just switched on: straight to the sun's white.
            self.hass.async_create_task(self._apply(eid, transition=1))
            return
        ours = self._ours.get(eid)
        k = new.attributes.get("color_temp_kelvin")
        if ours and k and abs(int(k) - ours) > 250 and new.attributes.get("color_mode") == "color_temp":
            self._paused.add(eid)

    @callback
    def _tick(self, _now: Any = None) -> None:
        self._watch()
        for eid in self._watched:
            st = self.hass.states.get(eid)
            if st and st.state == "on" and eid not in self._paused:
                self.hass.async_create_task(self._apply(eid, transition=60))

    async def _apply(self, eid: str, transition: int) -> None:
        st = self.hass.states.get(eid)
        if not st or st.state != "on" or eid in self._paused:
            return
        modes = st.attributes.get("supported_color_modes") or []
        if "color_temp" not in modes:
            return
        # A colour scene (red, blue…) stays as it is: only white is moved.
        if st.attributes.get("color_mode") not in (None, "color_temp", "brightness", "white"):
            return
        lo = st.attributes.get("min_color_temp_kelvin") or 2000
        hi = st.attributes.get("max_color_temp_kelvin") or 6500
        k = max(lo, min(hi, kelvin_now(self.hass)))
        cur = st.attributes.get("color_temp_kelvin")
        if cur and abs(int(cur) - k) < 100:
            self._ours[eid] = int(cur)
            return
        self._ours[eid] = k
        try:
            await self.hass.services.async_call("light", "turn_on", {"entity_id": eid, "color_temp_kelvin": k, "transition": transition})
        except Exception as err:  # noqa: BLE001 - a light that went away; the next tick tries again
            _LOGGER.debug("SmartNest circadian %s: %s", eid, err)
