"""Activation: each house needs a key signed by the installer for its own Home Assistant installation ID."""
from __future__ import annotations

import base64
import json
import time
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
        # Set when the installer stopped this house from afar (over the heartbeat). Only a newer key undoes it.
        self.revoked_at: float | None = None

    async def async_load(self) -> None:
        self.iid = await instance_id.async_get(self.hass)
        saved = await self.store.async_load() or {}
        self.info = verify(saved.get("key", ""), self.iid) if saved.get("key") else None
        self.revoked_at = saved.get("revoked_at")

    async def _save(self) -> None:
        saved = await self.store.async_load() or {}
        await self.store.async_save({"key": saved.get("key", ""), "revoked_at": self.revoked_at})

    def is_revoked_key(self, info: dict[str, Any]) -> bool:
        """A key made before the stop: re-entering it doesn't undo the stop."""
        return self.revoked_at is not None and int(info.get("t") or 0) <= self.revoked_at

    async def async_activate(self, key: str) -> bool:
        info = verify(key, self.iid)
        if info is None or self.is_revoked_key(info):
            return False
        self.revoked_at = None
        await self.store.async_save({"key": key.strip(), "revoked_at": None})
        self.info = info
        return True

    async def async_set_revoked(self, revoked: bool) -> None:
        if revoked == (self.revoked_at is not None):
            return
        self.revoked_at = time.time() if revoked else None
        await self._save()

    @property
    def expired(self) -> bool:
        exp = (self.info or {}).get("x")
        return bool(exp) and time.time() > float(exp)

    @property
    def valid(self) -> bool:
        return self.info is not None and not self.expired and self.revoked_at is None

    def status(self) -> dict[str, Any]:
        info = self.info or {}
        return {
            "licensed": self.valid,
            "expired": self.expired,
            "revoked": self.revoked_at is not None,
            "instance_id": self.iid,
            "licensee": info.get("n", ""),
            # Keys issued before plans existed unlock everything.
            "plan": info.get("p", "premium"),
            "expires": info.get("x"),
            "trial": bool(info.get("tr")),
            "reseller": info.get("r", ""),
        }


def is_licensed(hass: HomeAssistant) -> bool:
    lic: License | None = (hass.data.get(DOMAIN) or {}).get("license")
    return bool(lic and lic.valid)


@websocket_api.websocket_command({vol.Required("type"): "smartnest/license/status"})
@websocket_api.async_response
async def ws_license_status(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    lic: License | None = (hass.data.get(DOMAIN) or {}).get("license")
    connection.send_result(msg["id"], lic.status() if lic else {"licensed": False, "instance_id": ""})


@websocket_api.require_admin
@websocket_api.websocket_command({vol.Required("type"): "smartnest/license/activate", vol.Required("key"): str})
@websocket_api.async_response
async def ws_license_activate(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    lic: License | None = (hass.data.get(DOMAIN) or {}).get("license")
    if lic is None:
        connection.send_error(msg["id"], "invalid_key", "SmartNest is not set up")
        return
    info = verify(msg["key"], lic.iid)
    exp = (info or {}).get("x")
    if info is None or (exp and time.time() > float(exp)) or lic.is_revoked_key(info):
        connection.send_error(msg["id"], "invalid_key", "This key isn't valid (or has expired) for this installation")
        return
    await lic.async_activate(msg["key"])
    connection.send_result(msg["id"], lic.status())


@websocket_api.websocket_command({vol.Required("type"): "smartnest/license/check"})
@websocket_api.async_response
async def ws_license_check(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Calls the installer now instead of waiting for the next heartbeat: picks up a renewal (or a stop) right away."""
    data = hass.data.get(DOMAIN) or {}
    lic: License | None = data.get("license")
    beat = data.get("heartbeat")
    reached = await beat.async_send() if beat else False
    connection.send_result(msg["id"], {**(lic.status() if lic else {"licensed": False, "instance_id": ""}), "reached": reached})
