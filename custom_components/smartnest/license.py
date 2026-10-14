"""Activation: each house needs a key signed by the installer for its own Home Assistant installation ID."""
from __future__ import annotations

import base64
import json
from typing import Any

import voluptuous as vol
from cryptography.exceptions import InvalidSignature
from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PublicKey

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant
from homeassistant.helpers import instance_id
from homeassistant.helpers.storage import Store

from .const import DOMAIN, LICENSE_PUBLIC_KEY, LICENSE_STORAGE_KEY

NOT_LICENSED = "not_licensed"


def _b64d(text: str) -> bytes:
    return base64.urlsafe_b64decode(text + "=" * (-len(text) % 4))


def verify(key: str, iid: str) -> dict[str, Any] | None:
    """The key's details when it's genuinely ours and for this installation, else None."""
    try:
        prefix, body, sig = key.strip().split(".")
        if prefix != "SN1":
            return None
        payload = _b64d(body)
        Ed25519PublicKey.from_public_bytes(_b64d(LICENSE_PUBLIC_KEY)).verify(_b64d(sig), payload)
        data = json.loads(payload)
    except (ValueError, InvalidSignature, json.JSONDecodeError):
        return None
    return data if data.get("i") == iid else None


class License:
    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self.store: Store[dict] = Store(hass, 1, LICENSE_STORAGE_KEY)
        self.iid = ""
        self.info: dict[str, Any] | None = None

    async def async_load(self) -> None:
        self.iid = await instance_id.async_get(self.hass)
        saved = await self.store.async_load() or {}
        self.info = verify(saved.get("key", ""), self.iid) if saved.get("key") else None

    async def async_activate(self, key: str) -> bool:
        info = verify(key, self.iid)
        if info is None:
            return False
        await self.store.async_save({"key": key.strip()})
        self.info = info
        return True

    @property
    def valid(self) -> bool:
        return self.info is not None


def is_licensed(hass: HomeAssistant) -> bool:
    lic: License | None = (hass.data.get(DOMAIN) or {}).get("license")
    return bool(lic and lic.valid)


@websocket_api.websocket_command({vol.Required("type"): "smartnest/license/status"})
@websocket_api.async_response
async def ws_license_status(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    lic: License | None = (hass.data.get(DOMAIN) or {}).get("license")
    connection.send_result(
        msg["id"],
        {
            "licensed": bool(lic and lic.valid),
            "instance_id": lic.iid if lic else "",
            "licensee": (lic.info or {}).get("n", "") if lic else "",
        },
    )


@websocket_api.require_admin
@websocket_api.websocket_command({vol.Required("type"): "smartnest/license/activate", vol.Required("key"): str})
@websocket_api.async_response
async def ws_license_activate(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    lic: License | None = (hass.data.get(DOMAIN) or {}).get("license")
    if lic is None or not await lic.async_activate(msg["key"]):
        connection.send_error(msg["id"], "invalid_key", "This key isn't valid for this installation")
        return
    connection.send_result(msg["id"], {"licensed": True, "licensee": lic.info.get("n", "") if lic.info else ""})
