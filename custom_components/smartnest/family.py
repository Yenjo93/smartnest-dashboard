"""Family things any user can change from the wall: the chores board and the wake-up lights.
Plus the light effects (candle, sunset, party…) that run on the hub so they keep going with the screen off."""
from __future__ import annotations

import asyncio
from datetime import datetime, timedelta
import json
import logging
import random
from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.dispatcher import async_dispatcher_connect, async_dispatcher_send
from homeassistant.helpers.event import async_track_time_change
from homeassistant.helpers.storage import Store

from .const import DOMAIN
from .license import NOT_LICENSED, is_licensed

_LOGGER = logging.getLogger(__name__)

KEYS = ("chores", "wake", "boiler", "irrigation")
_SIGNAL = "smartnest_kv_{}"
_MAX = 64_000


class Family:
    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self.store: Store[dict] = Store(hass, 1, "smartnest.family")
        self.data: dict[str, Any] = {}
        self._unsub = None
        self._ramps: dict[str, asyncio.Task] = {}
        self.fx: dict[str, asyncio.Task] = {}

    async def async_load(self) -> None:
        self.data = await self.store.async_load() or {}
        self._unsub = async_track_time_change(self.hass, self._minute, second=0)

    def async_stop(self) -> None:
        if self._unsub:
            self._unsub()
        for task in [*self._ramps.values(), *self.fx.values()]:
            task.cancel()

    async def async_set(self, key: str, value: Any) -> None:
        self.data[key] = value
        await self.store.async_save(self.data)
        async_dispatcher_send(self.hass, _SIGNAL.format(key), value)

    # ---- wake-up light ----

    @callback
    def _minute(self, now: datetime) -> None:
        self._boiler(now)
        self._irrigation(now)
        self._wake(now)

    # ---- water heater ----

    def _switch(self, entity_id: str, on: bool) -> None:
        domain = entity_id.split(".")[0]
        if domain == "valve":
            self.hass.async_create_task(self.hass.services.async_call("valve", "open_valve" if on else "close_valve", {"entity_id": entity_id}))
        else:
            self.hass.async_create_task(self.hass.services.async_call("homeassistant", "turn_on" if on else "turn_off", {"entity_id": entity_id}))

    def _boiler(self, now: datetime) -> None:
        b = self.data.get("boiler") or {}
        entity = b.get("entity")
        if not entity:
            return
        heat = int(b.get("heat_minutes") or 40)
        keep = int(b.get("keep_minutes") or 20)
        hm = now.strftime("%H:%M")
        weekday = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"][now.weekday()]
        for plan in b.get("plans", []):
            if not plan.get("on") or not plan.get("at") or (plan.get("days") and weekday not in plan["days"]):
                continue
            h, m = (int(x) for x in plan["at"].split(":"))
            ready = now.replace(hour=h, minute=m, second=0, microsecond=0)
            if hm == (ready - timedelta(minutes=heat)).strftime("%H:%M"):
                self._switch(entity, True)
                self.hass.async_create_task(self.async_set("boiler", {**b, "ready_at": ready.timestamp(), "until": (ready + timedelta(minutes=keep)).timestamp()}))
                return
        until = b.get("until")
        if until and now.timestamp() >= until:
            self._switch(entity, False)
            self.hass.async_create_task(self.async_set("boiler", {**b, "until": None, "ready_at": None}))

    # ---- irrigation that skips rainy days ----

    def _irrigation(self, now: datetime) -> None:
        ir = self.data.get("irrigation") or {}
        if not ir.get("on") or not ir.get("entity") or ir.get("at") != now.strftime("%H:%M"):
            return
        weekday = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"][now.weekday()]
        if ir.get("days") and weekday not in ir["days"]:
            return
        self.hass.async_create_task(self._water(ir, now))

    async def _water(self, ir: dict[str, Any], now: datetime) -> None:
        if ir.get("skip_rain", True) and (reason := await self._rain_coming()):
            await self.async_set("irrigation", {**ir, "last": {"date": now.date().isoformat(), "skipped": True, "reason": reason}})
            self.hass.bus.async_fire("smartnest_irrigation_skipped", {"reason": reason})
            if self.hass.services.has_service(DOMAIN, "show_message"):
                await self.hass.services.async_call(DOMAIN, "show_message", {"message": f"🌧️ {reason}", "icon": "weather-pouring"})
            return
        minutes = int(ir.get("minutes") or 15)
        self._switch(ir["entity"], True)
        await self.async_set("irrigation", {**ir, "last": {"date": now.date().isoformat(), "skipped": False, "until": now.timestamp() + minutes * 60}})
        await asyncio.sleep(minutes * 60)
        self._switch(ir["entity"], False)

    async def _rain_coming(self) -> str | None:
        """Rain today or tomorrow, from the weather entity the dashboard uses."""
        cfg = (self.hass.data.get(DOMAIN) or {}).get("config") or {}
        weather = ((cfg.get("settings") or {}).get("weather") or {}).get("entity")
        if not weather:
            return None
        try:
            res = await self.hass.services.async_call("weather", "get_forecasts", {"entity_id": weather, "type": "daily"}, blocking=True, return_response=True)
        except Exception:  # noqa: BLE001
            return None
        days = ((res or {}).get(weather) or {}).get("forecast") or []
        for day in days[:2]:
            mm = day.get("precipitation") or 0
            pct = day.get("precipitation_probability") or 0
            if mm >= 2 or pct >= 60:
                return f"rain: {mm} mm, {pct}%"
        return None

    # ---- wake-up light ----

    def _wake(self, now: datetime) -> None:
        for alarm in (self.data.get("wake") or {}).get("alarms", []):
            if not alarm.get("on") or not alarm.get("light") or not alarm.get("time"):
                continue
            days = alarm.get("days") or []
            minutes = int(alarm.get("minutes") or 20)
            h, m = (int(x) for x in alarm["time"].split(":"))
            start = now.replace(hour=h, minute=m) - timedelta(minutes=minutes)
            weekday = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"][start.weekday()]
            if days and weekday not in days:
                continue
            if (now.hour, now.minute) == (start.hour, start.minute) and alarm["id"] not in self._ramps:
                self._ramps[alarm["id"]] = self.hass.async_create_task(self._ramp(alarm, minutes))

    async def _ramp(self, alarm: dict[str, Any], minutes: int) -> None:
        """Sunrise in the bedroom: from a dim warm glow to full daylight by the alarm time."""
        steps = max(1, minutes * 2)
        try:
            for i in range(steps + 1):
                f = i / steps
                await self.hass.services.async_call(
                    "light",
                    "turn_on",
                    {"entity_id": alarm["light"], "brightness_pct": max(1, round(f * 100)), "color_temp_kelvin": round(2000 + f * 2200), "transition": 25},
                    blocking=False,
                )
                await asyncio.sleep(30)
            if speaker := alarm.get("speaker"):
                await self.hass.services.async_call("media_player", "volume_set", {"entity_id": speaker, "volume_level": 0.25}, blocking=False)
            self.hass.bus.async_fire("smartnest_wake", {"id": alarm["id"], "light": alarm["light"]})
        except asyncio.CancelledError:
            pass
        except Exception:  # noqa: BLE001
            _LOGGER.exception("Wake-up light failed")
        finally:
            self._ramps.pop(alarm["id"], None)

    # ---- light effects ----

    async def start_fx(self, effect: str, lights: list[str]) -> None:
        self.stop_fx(lights)
        task = self.hass.async_create_task(self._run_fx(effect, lights))
        for light in lights:
            self.fx[light] = task

    def stop_fx(self, lights: list[str]) -> None:
        for light in lights:
            if task := self.fx.pop(light, None):
                task.cancel()

    async def _run_fx(self, effect: str, lights: list[str]) -> None:
        call = lambda data: self.hass.services.async_call("light", "turn_on", {"entity_id": lights, **data}, blocking=False)  # noqa: E731
        hue = random.randint(0, 359)
        try:
            if effect == "sunset":
                # Twenty minutes from golden hour to a dim red, then off.
                for i in range(41):
                    f = i / 40
                    await call({"rgb_color": [255, round(170 - 120 * f), round(60 - 50 * f)], "brightness_pct": max(1, round(90 - 85 * f)), "transition": 29})
                    await asyncio.sleep(30)
                await self.hass.services.async_call("light", "turn_off", {"entity_id": lights, "transition": 20}, blocking=False)
                return
            while True:
                if effect == "candle":
                    await call({"rgb_color": [255, random.randint(120, 150), random.randint(30, 50)], "brightness_pct": random.randint(28, 55), "transition": 0.6})
                    await asyncio.sleep(random.uniform(0.7, 1.6))
                elif effect == "party":
                    hue = (hue + random.randint(60, 140)) % 360
                    await call({"hs_color": [hue, 100], "brightness_pct": 100, "transition": 0.4})
                    await asyncio.sleep(1.6)
                elif effect == "ramadan":
                    for rgb in ([255, 190, 60], [40, 180, 110], [140, 80, 220]):
                        await call({"rgb_color": rgb, "brightness_pct": 70, "transition": 4})
                        await asyncio.sleep(6)
                elif effect == "aurora":
                    hue = (hue + 12) % 360
                    await call({"hs_color": [160 + (hue % 120), 80], "brightness_pct": 60, "transition": 5})
                    await asyncio.sleep(5)
                else:
                    return
        except asyncio.CancelledError:
            pass
        except Exception:  # noqa: BLE001
            _LOGGER.exception("Light effect %s failed", effect)
        finally:
            for light in lights:
                if self.fx.get(light) is asyncio.current_task():
                    self.fx.pop(light, None)


def _family(hass: HomeAssistant) -> Family | None:
    return (hass.data.get(DOMAIN) or {}).get("family")


def _guard(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> Family | None:
    fam = _family(hass)
    if fam is None:
        connection.send_error(msg["id"], "not_loaded", "SmartNest is not set up")
        return None
    if not is_licensed(hass):
        connection.send_error(msg["id"], NOT_LICENSED, "SmartNest needs an activation key")
        return None
    return fam


@websocket_api.websocket_command({vol.Required("type"): "smartnest/kv/get", vol.Required("key"): vol.In(KEYS)})
@callback
def ws_kv_get(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    if fam := _guard(hass, connection, msg):
        connection.send_result(msg["id"], {"value": fam.data.get(msg["key"])})


@websocket_api.websocket_command({vol.Required("type"): "smartnest/kv/set", vol.Required("key"): vol.In(KEYS), vol.Required("value"): dict})
@websocket_api.async_response
async def ws_kv_set(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    if not (fam := _guard(hass, connection, msg)):
        return
    if len(json.dumps(msg["value"])) > _MAX:
        connection.send_error(msg["id"], "too_large", "Too much data")
        return
    await fam.async_set(msg["key"], msg["value"])
    connection.send_result(msg["id"])


@websocket_api.websocket_command({vol.Required("type"): "smartnest/kv/subscribe", vol.Required("key"): vol.In(KEYS)})
@callback
def ws_kv_subscribe(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    if not _guard(hass, connection, msg):
        return

    @callback
    def forward(value: Any) -> None:
        connection.send_message(websocket_api.event_message(msg["id"], {"value": value}))

    connection.subscriptions[msg["id"]] = async_dispatcher_connect(hass, _SIGNAL.format(msg["key"]), forward)
    connection.send_result(msg["id"])


@websocket_api.websocket_command(
    {
        vol.Required("type"): "smartnest/fx/start",
        vol.Required("effect"): vol.In(["candle", "sunset", "party", "ramadan", "aurora"]),
        vol.Required("lights"): [str],
    }
)
@websocket_api.async_response
async def ws_fx_start(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    if not (fam := _guard(hass, connection, msg)):
        return
    lights = [x for x in msg["lights"] if x.startswith("light.")][:12]
    await fam.start_fx(msg["effect"], lights)
    connection.send_result(msg["id"])


@websocket_api.websocket_command({vol.Required("type"): "smartnest/fx/stop", vol.Required("lights"): [str]})
@callback
def ws_fx_stop(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    if fam := _guard(hass, connection, msg):
        fam.stop_fx(msg["lights"])
        connection.send_result(msg["id"])
