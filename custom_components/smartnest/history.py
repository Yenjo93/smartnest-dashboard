"""Earlier versions of the dashboard, so a bad edit (or a curious client) can be undone."""
from __future__ import annotations

import secrets
import time
from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant
from homeassistant.helpers.dispatcher import async_dispatcher_send
from homeassistant.helpers.storage import Store

from .const import DOMAIN, SIGNAL_CONFIG_UPDATED
from .license import NOT_LICENSED, is_licensed

KEEP = 20
# Saves closer together than this are one editing session: only the version before it is kept.
_SESSION = 10 * 60


def _store(hass: HomeAssistant) -> Store[dict]:
    data = hass.data[DOMAIN]
    if "history_store" not in data:
        data["history_store"] = Store(hass, 1, "smartnest.history")
    return data["history_store"]


async def async_remember(hass: HomeAssistant, previous: dict[str, Any] | None, user: str) -> None:
    """Called before a save overwrites the dashboard."""
    if not previous:
        return
    store = _store(hass)
    saved = await store.async_load() or {"items": []}
    items: list[dict[str, Any]] = saved["items"]
    now = time.time()
    if items and now - items[0].get("saved_at", 0) < _SESSION and items[0].get("user") == user:
        items[0]["saved_at"] = now
    else:
        items.insert(0, {"id": secrets.token_hex(6), "time": now, "saved_at": now, "user": user, "config": previous})
    await store.async_save({"items": items[:KEEP]})


@websocket_api.require_admin
@websocket_api.websocket_command({vol.Required("type"): "smartnest/history/list"})
@websocket_api.async_response
async def ws_history_list(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    saved = await _store(hass).async_load() or {"items": []}
    connection.send_result(
        msg["id"],
        {
            "items": [
                {
                    "id": i["id"],
                    "time": i["time"],
                    "user": i.get("user", ""),
                    "pages": len(i["config"].get("pages", [])),
                    "widgets": sum(len(p.get("widgets", [])) for p in i["config"].get("pages", [])),
                }
                for i in saved["items"]
            ]
        },
    )


@websocket_api.require_admin
@websocket_api.websocket_command({vol.Required("type"): "smartnest/history/restore", vol.Required("version"): str})
@websocket_api.async_response
async def ws_history_restore(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    if not is_licensed(hass):
        connection.send_error(msg["id"], NOT_LICENSED, "SmartNest needs an activation key")
        return
    data = hass.data[DOMAIN]
    saved = await _store(hass).async_load() or {"items": []}
    item = next((i for i in saved["items"] if i["id"] == msg["version"]), None)
    if item is None:
        connection.send_error(msg["id"], "not_found", "That version is gone")
        return
    # Restoring is itself undoable: today's dashboard goes into the history first.
    await async_remember(hass, data.get("config"), f"{connection.user.name} (restore)")
    await data["store"].async_save(item["config"])
    data["config"] = item["config"]
    async_dispatcher_send(hass, SIGNAL_CONFIG_UPDATED, item["config"])
    connection.send_result(msg["id"])
