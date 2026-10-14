"""Little house helpers that run on the hub, set up from SmartNest's settings:
appliance finished, night path lights, pre-cooling when someone's on the way home, and power cut handling."""
from __future__ import annotations

from datetime import timedelta
import logging
import time
from typing import Any

from homeassistant.core import Event, HomeAssistant, callback
from homeassistant.helpers.event import async_call_later, async_track_state_change_event, async_track_time_interval
from homeassistant.util import dt as dt_util

from .const import DOMAIN

_LOGGER = logging.getLogger(__name__)

_TEXT = {
    "ar": {"done": "{name} خلصت ✓", "outage": "انقطعت الكهربا. طفّيت الأجهزة الثقيلة.", "back": "رجعت الكهربا ✓"},
    "en": {"done": "{name} is done ✓", "outage": "Power cut. Heavy appliances were turned off.", "back": "Power is back ✓"},
    "he": {"done": "{name} סיימה ✓", "outage": "הפסקת חשמל. מכשירים כבדים כובו.", "back": "החשמל חזר ✓"},
}


def _settings(hass: HomeAssistant) -> dict[str, Any]:
    return ((hass.data.get(DOMAIN) or {}).get("config") or {}).get("settings") or {}


def _num(hass: HomeAssistant, entity_id: str) -> float | None:
    st = hass.states.get(entity_id)
    try:
        value = float(st.state) if st else None
    except ValueError:
        return None
    if value is not None and st and st.attributes.get("unit_of_measurement") == "kW":
        value *= 1000
    return value


class HomeHelpers:
    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self._unsubs: list = []
        self._running: dict[str, float] = {}  # appliance power sensor → started at
        self._quiet: dict[str, Any] = {}  # appliance power sensor → pending "done" timer
        self._path_off: Any = None
        self._approach: set[str] = set()  # people we already pre-cooled for on this trip
        self._down = False
        self._state_unsub: Any = None
        self._path_lit: list[str] = []

    def async_start(self) -> None:
        self._unsubs.append(async_track_time_interval(self.hass, self._rewatch, timedelta(minutes=5)))
        self._rewatch()

    def async_stop(self) -> None:
        for unsub in self._unsubs:
            unsub()
        self._unsubs.clear()
        self._watch_unsub()

    def _watch_unsub(self) -> None:
        if self._state_unsub:
            self._state_unsub()
            self._state_unsub = None

    @callback
    def _rewatch(self, _now=None) -> None:
        """Settings change from the panel; re-read which entities to follow every few minutes and on start."""
        s = _settings(self.hass)
        ids = {a["power"] for a in s.get("appliances", []) if a.get("power")}
        ids |= set((s.get("night_path") or {}).get("motion", []))
        ids |= {e.entity_id for e in self.hass.states.async_all("sensor") if e.entity_id.endswith("_direction_of_travel") or e.entity_id.endswith("_distance")}
        if (o := (s.get("outage") or {}).get("sensor")):
            ids.add(o)
        self._watch_unsub()
        if ids:
            self._state_unsub = async_track_state_change_event(self.hass, sorted(ids), self._changed)

    @callback
    def _changed(self, event: Event) -> None:
        entity_id = event.data["entity_id"]
        s = _settings(self.hass)
        for a in s.get("appliances", []):
            if a.get("power") == entity_id:
                self._appliance(a)
        path = s.get("night_path") or {}
        if entity_id in path.get("motion", []) and (event.data.get("new_state") and event.data["new_state"].state == "on"):
            self._night_path(path)
        if entity_id.endswith("_direction_of_travel") or entity_id.endswith("_distance"):
            self._arrival(s.get("arrival") or {}, entity_id)
        if entity_id == (s.get("outage") or {}).get("sensor"):
            self._outage(s.get("outage") or {})

    # ---- appliance finished ----

    def _appliance(self, a: dict[str, Any]) -> None:
        pid = a["power"]
        watts = _num(self.hass, pid)
        if watts is None:
            return
        start_w = float(a.get("start_w", 15))
        if watts >= start_w:
            if pid not in self._running:
                self._running[pid] = time.time()
            if timer := self._quiet.pop(pid, None):
                timer()
            return
        if pid in self._running and pid not in self._quiet:
            # Washers pause between cycles: only "done" after it stays quiet for a few minutes.
            wait = float(a.get("quiet_min", 4)) * 60
            self._quiet[pid] = async_call_later(self.hass, wait, lambda _now, a=a: self._finished(a))

    @callback
    def _finished(self, a: dict[str, Any]) -> None:
        pid = a["power"]
        self._quiet.pop(pid, None)
        started = self._running.pop(pid, None)
        if started is None or time.time() - started < 10 * 60:
            return  # a short blip, not a wash
        name = a.get("name") or pid
        self.hass.bus.async_fire("smartnest_appliance_done", {"power": pid, "name": name, "minutes": round((time.time() - started) / 60)})
        self._say(_TEXT[self._lang()]["done"].format(name=name))

    # ---- night path ----

    def _night_path(self, p: dict[str, Any]) -> None:
        if not p.get("lights"):
            return
        now = dt_util.now().strftime("%H:%M")
        start, end = p.get("from", "23:00"), p.get("to", "06:00")
        in_window = (now >= start or now < end) if start > end else (start <= now < end)
        if not in_window:
            return
        off = [l for l in p["lights"] if (st := self.hass.states.get(l)) and st.state == "off"]
        if off:
            self.hass.async_create_task(
                self.hass.services.async_call("light", "turn_on", {"entity_id": off, "brightness_pct": int(p.get("brightness", 10)), "transition": 1})
            )
            self._path_lit = off
        if self._path_off:
            self._path_off()
        lit = self._path_lit
        self._path_off = async_call_later(
            self.hass,
            float(p.get("minutes", 3)) * 60,
            lambda _now: self.hass.async_create_task(self.hass.services.async_call("light", "turn_off", {"entity_id": lit, "transition": 3})),
        )

    # ---- on the way home ----

    def _arrival(self, a: dict[str, Any], changed: str) -> None:
        if not a.get("climate") and not a.get("lights"):
            return
        base = changed.rsplit("_", 3 if changed.endswith("_direction_of_travel") else 1)[0]
        direction = self.hass.states.get(f"{base}_direction_of_travel")
        dist = self.hass.states.get(f"{base}_distance")
        if not direction or not dist:
            return
        try:
            km = float(dist.state) / (1000 if dist.attributes.get("unit_of_measurement") == "m" else 1)
        except ValueError:
            return
        limit = float(a.get("km", 5))
        if km > limit + 2:
            self._approach.discard(base)
            return
        if direction.state != "towards" or km > limit or base in self._approach:
            return
        self._approach.add(base)
        for c in a.get("climate", []):
            if (st := self.hass.states.get(c)) and st.state == "off":
                self.hass.async_create_task(self.hass.services.async_call("climate", "turn_on", {"entity_id": c}))
        sun = self.hass.states.get("sun.sun")
        if a.get("lights") and sun and sun.state == "below_horizon":
            self.hass.async_create_task(self.hass.services.async_call("light", "turn_on", {"entity_id": a["lights"]}))
        self.hass.bus.async_fire("smartnest_arriving", {"tracker": base, "km": round(km, 1)})

    # ---- power cut ----

    def _outage(self, o: dict[str, Any]) -> None:
        st = self.hass.states.get(o["sensor"])
        if not st or st.state in ("unavailable", "unknown"):
            return
        if st.domain == "binary_sensor":
            down = st.state == "off"
        else:
            v = _num(self.hass, o["sensor"])
            down = v is not None and v < float(o.get("below", 50))
        if down == self._down:
            return
        self._down = down
        if down:
            if o.get("shed"):
                self.hass.async_create_task(self.hass.services.async_call("homeassistant", "turn_off", {"entity_id": o["shed"]}))
            self._say(_TEXT[self._lang()]["outage"])
        else:
            self._say(_TEXT[self._lang()]["back"])
        self.hass.bus.async_fire("smartnest_power", {"down": down})

    # ---- helpers ----

    def _lang(self) -> str:
        lang = _settings(self.hass).get("language", "ar")
        return lang if lang in _TEXT else "ar"

    def _say(self, text: str) -> None:
        """On every wall screen, and out loud on the chosen speakers."""
        if self.hass.services.has_service(DOMAIN, "show_message"):
            self.hass.async_create_task(self.hass.services.async_call(DOMAIN, "show_message", {"message": text}))
        speakers = _settings(self.hass).get("speakers") or []
        tts = next((s.entity_id for s in self.hass.states.async_all("tts")), None)
        if speakers and tts:
            self.hass.async_create_task(
                self.hass.services.async_call("tts", "speak", {"entity_id": tts, "media_player_entity_id": speakers, "message": text})
            )
