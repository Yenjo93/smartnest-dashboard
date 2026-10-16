"""Messages on the home screens: "Dinner's ready", medicine reminders with a "Taken ✓" button."""
from __future__ import annotations

from typing import Any
import uuid

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, ServiceCall, callback
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.dispatcher import async_dispatcher_connect, async_dispatcher_send

from .const import DOMAIN

SIGNAL = "smartnest_message"
EVENT_ACK = "smartnest_message_ack"

SERVICE_SCHEMA = vol.Schema(
    {
        vol.Required("message"): cv.string,
        vol.Optional("title"): cv.string,
        vol.Optional("ack"): cv.string,
        vol.Optional("icon"): cv.string,
    }
)


def _show(hass: HomeAssistant, data: dict[str, Any]) -> dict[str, Any]:
    msg = {"id": uuid.uuid4().hex[:12], **data}
    hass.data[DOMAIN]["message"] = msg
    async_dispatcher_send(hass, SIGNAL, msg)
    return msg


@callback
def async_register_service(hass: HomeAssistant) -> None:
    async def show_message(call: ServiceCall) -> None:
        _show(hass, dict(call.data))

    hass.services.async_register(DOMAIN, "show_message", show_message, schema=SERVICE_SCHEMA)


@websocket_api.websocket_command({vol.Required("type"): "smartnest/message/subscribe"})
@callback
def ws_message_subscribe(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    @callback
    def forward(message: dict[str, Any] | None) -> None:
        connection.send_message(websocket_api.event_message(msg["id"], {"message": message}))

    connection.subscriptions[msg["id"]] = async_dispatcher_connect(hass, SIGNAL, forward)
    connection.send_result(msg["id"])
    if current := (hass.data.get(DOMAIN) or {}).get("message"):
        forward(current)


@websocket_api.websocket_command({vol.Required("type"): "smartnest/message/send", vol.Required("message"): str})
@callback
def ws_message_send(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    from .license import is_licensed

    if not is_licensed(hass):
        connection.send_error(msg["id"], "not_licensed", "SmartNest needs an activation key")
        return
    user = connection.user
    sent = _show(hass, {"message": msg["message"][:500], "title": user.name if user else ""})
    connection.send_result(msg["id"], {"id": sent["id"]})


@websocket_api.websocket_command({vol.Required("type"): "smartnest/message/ack", vol.Required("message_id"): str})
@callback
def ws_message_ack(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    data = hass.data.get(DOMAIN) or {}
    current = data.get("message")
    # Not "id": that's the websocket message's own number, so the screen message's id travels as "message_id".
    if current and current["id"] == msg["message_id"]:
        data["message"] = None
        hass.bus.async_fire(EVENT_ACK, {"id": current["id"], "message": current.get("message"), "user": connection.user.name if connection.user else ""})
        async_dispatcher_send(hass, SIGNAL, None)
    connection.send_result(msg["id"])


EVENT_FEEDBACK = "smartnest_feedback"


@websocket_api.websocket_command(
    {vol.Required("type"): "smartnest/feedback", vol.Required("stars"): vol.All(int, vol.Range(min=1, max=5)), vol.Optional("comment", default=""): str}
)
@callback
def ws_feedback(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """The family rates the installer; an automation (smartnest_health.yaml) forwards it to the installer's Telegram."""
    hass.bus.async_fire(
        EVENT_FEEDBACK,
        {"stars": msg["stars"], "comment": msg["comment"][:500], "user": connection.user.name if connection.user else ""},
    )
    connection.send_result(msg["id"])
