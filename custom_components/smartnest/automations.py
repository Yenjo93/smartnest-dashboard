"""A readable summary of the automations built in the dashboard, so non-admin screens can draw the weekly schedule.
The automations themselves are normal Home Assistant automations (created by an admin through HA's config API)."""
from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store

from .const import DOMAIN

STORE_KEY = "smartnest.automations"


def _store(hass: HomeAssistant) -> Store[dict]:
    data = hass.data[DOMAIN]
    if "automations_store" not in data:
        data["automations_store"] = Store(hass, 1, STORE_KEY)
    return data["automations_store"]


@websocket_api.websocket_command({vol.Required("type"): "smartnest/automations/get"})
@websocket_api.async_response
async def ws_automations_get(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    saved = await _store(hass).async_load() or {}
    connection.send_result(msg["id"], {"items": saved.get("items", [])})


@websocket_api.require_admin
@websocket_api.websocket_command({vol.Required("type"): "smartnest/automations/set", vol.Required("items"): list})
@websocket_api.async_response
async def ws_automations_set(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    await _store(hass).async_save({"items": msg["items"][:200]})
    connection.send_result(msg["id"])
