"""WebSocket API the panel talks to: read, save, and watch the dashboard config."""
from __future__ import annotations

import json
from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.dispatcher import async_dispatcher_connect, async_dispatcher_send

from .const import DOMAIN, MAX_CONFIG_BYTES, SIGNAL_CONFIG_UPDATED
from .license import NOT_LICENSED, is_licensed


@callback
def async_register_commands(hass: HomeAssistant) -> None:
    websocket_api.async_register_command(hass, ws_get_config)
    websocket_api.async_register_command(hass, ws_save_config)
    websocket_api.async_register_command(hass, ws_subscribe_config)
    from .license import ws_license_activate, ws_license_status
    from .automations import ws_automations_get, ws_automations_set
    from .messages import ws_feedback, ws_message_ack, ws_message_send, ws_message_subscribe
    from .timers import ws_timer_cancel, ws_timer_list, ws_timer_set
    from .ai import ws_ai_ask
    from .history import ws_history_list, ws_history_restore
    from . import issuer
    from .codes import ws_codes_add, ws_codes_list, ws_codes_remove
    from .family import ws_fx_start, ws_fx_stop, ws_kv_get, ws_kv_set, ws_kv_subscribe
    from .plan_ai import ws_plan_read_rooms
    from .visitors import ws_list_visitors

    websocket_api.async_register_command(hass, ws_list_visitors)
    websocket_api.async_register_command(hass, ws_license_status)
    websocket_api.async_register_command(hass, ws_license_activate)
    for cmd in (
        ws_timer_list, ws_timer_set, ws_timer_cancel,
        ws_message_subscribe, ws_message_send, ws_message_ack,
        ws_automations_get, ws_automations_set, ws_feedback, ws_plan_read_rooms, ws_ai_ask,
        ws_kv_get, ws_kv_set, ws_kv_subscribe, ws_fx_start, ws_fx_stop,
        ws_history_list, ws_history_restore,
        issuer.ws_status, issuer.ws_setup, issuer.ws_forget, issuer.ws_issue, issuer.ws_renew,
        issuer.ws_update, issuer.ws_remove, issuer.ws_import,
        ws_codes_list, ws_codes_add, ws_codes_remove,
    ):
        websocket_api.async_register_command(hass, cmd)


def _data(hass: HomeAssistant) -> dict[str, Any] | None:
    return hass.data.get(DOMAIN)


@websocket_api.websocket_command({vol.Required("type"): "smartnest/config/get"})
@callback
def ws_get_config(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Any signed-in user can read the dashboard."""
    data = _data(hass)
    if data is None:
        connection.send_error(msg["id"], "not_loaded", "SmartNest is not set up")
        return
    if not is_licensed(hass):
        connection.send_error(msg["id"], NOT_LICENSED, "SmartNest needs an activation key")
        return
    connection.send_result(msg["id"], {"config": data["config"]})


@websocket_api.require_admin
@websocket_api.websocket_command(
    {vol.Required("type"): "smartnest/config/save", vol.Required("config"): dict}
)
@websocket_api.async_response
async def ws_save_config(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Only admins (the installer) can change the dashboard."""
    data = _data(hass)
    if data is None:
        connection.send_error(msg["id"], "not_loaded", "SmartNest is not set up")
        return
    if not is_licensed(hass):
        connection.send_error(msg["id"], NOT_LICENSED, "SmartNest needs an activation key")
        return
    config = msg["config"]
    if len(json.dumps(config)) > MAX_CONFIG_BYTES:
        connection.send_error(msg["id"], "too_large", "Dashboard config is too large")
        return
    if not isinstance(config.get("pages"), list) or not isinstance(config.get("settings"), dict):
        connection.send_error(msg["id"], "invalid_format", "Dashboard config is malformed")
        return
    from .history import async_remember

    await async_remember(hass, data.get("config"), connection.user.name or "")
    await data["store"].async_save(config)
    data["config"] = config
    async_dispatcher_send(hass, SIGNAL_CONFIG_UPDATED, config)
    connection.send_result(msg["id"])


@websocket_api.websocket_command({vol.Required("type"): "smartnest/config/subscribe"})
@callback
def ws_subscribe_config(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Push saved changes to every open screen, so the wall tablet updates without a reload."""

    @callback
    def forward(config: dict[str, Any]) -> None:
        connection.send_message(websocket_api.event_message(msg["id"], {"config": config}))

    connection.subscriptions[msg["id"]] = async_dispatcher_connect(hass, SIGNAL_CONFIG_UPDATED, forward)
    connection.send_result(msg["id"])
