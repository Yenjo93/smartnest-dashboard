"""Photos from a phone to the wall frame by scanning a QR code: no app, no login.

The tablet asks for a one-time link (valid 15 minutes, 40 photos at most). The page behind it only accepts images
and only writes them into the frame's photo folder.
"""
from __future__ import annotations

from http import HTTPStatus
import os
import secrets
import time
from typing import Any

import voluptuous as vol
from aiohttp import web

from homeassistant.components import websocket_api
from homeassistant.components.http import HomeAssistantView
from homeassistant.core import HomeAssistant

from .const import DOMAIN, MAX_UPLOAD_BYTES, PHOTOS_DIR
from .license import NOT_LICENSED, is_licensed
from .upload import _detect

_TTL = 15 * 60
_MAX_FILES = 40

_PAGE = """<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>SmartNest · الصور</title><style>
body{font-family:system-ui,-apple-system,sans-serif;margin:0;background:#f6f1ea;color:#1d1d1f;display:grid;place-items:center;min-height:100vh}
main{width:min(420px,92vw);display:grid;gap:16px;text-align:center}
h1{margin:0;font-size:24px}p{margin:0;color:#6e6e73}
label{display:grid;place-items:center;min-height:120px;border:2px dashed #e9971d;border-radius:20px;background:#fff;font-size:18px;font-weight:600;cursor:pointer}
input{display:none}#s{font-weight:600}
</style></head><body><main><h1>📷 صور لبرواز البيت</h1><p>اختار صور، وبتطلع عالشاشة بالبيت.</p>
<label>اختار الصور<input id="f" type="file" accept="image/jpeg,image/png,image/webp" multiple></label><div id="s"></div></main>
<script>
const s=document.getElementById("s");
document.getElementById("f").onchange=async(e)=>{const files=[...e.target.files];let ok=0;
for(const [i,file] of files.entries()){s.textContent="عم برفع "+(i+1)+" من "+files.length+"…";
const b=new FormData();b.append("file",file);const r=await fetch(location.pathname,{method:"POST",body:b});if(r.ok)ok++;else if(r.status===410){s.textContent="الرابط خلص. اعمل واحد جديد من الشاشة.";return;}}
s.textContent=ok?"✓ انرفعت "+ok+" صور":"ما انرفع إشي";};
</script></body></html>"""


def _tokens(hass: HomeAssistant) -> dict[str, dict[str, Any]]:
    return hass.data[DOMAIN].setdefault("photo_tokens", {})


@websocket_api.websocket_command({vol.Required("type"): "smartnest/photos/link"})
@websocket_api.async_response
async def ws_photo_link(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    if not is_licensed(hass):
        connection.send_error(msg["id"], NOT_LICENSED, "SmartNest needs an activation key")
        return
    tokens = _tokens(hass)
    now = time.time()
    for t in [t for t, v in tokens.items() if v["until"] < now]:
        tokens.pop(t, None)
    token = secrets.token_urlsafe(18)
    tokens[token] = {"until": now + _TTL, "left": _MAX_FILES}
    connection.send_result(msg["id"], {"path": f"/api/smartnest/photos/{token}", "minutes": _TTL // 60})


class PhotoDropView(HomeAssistantView):
    """GET shows the picker page; POST takes one image. The token is the only key."""

    url = "/api/smartnest/photos/{token}"
    name = "api:smartnest:photos"
    requires_auth = False

    def __init__(self, hass: HomeAssistant) -> None:
        self._hass = hass

    def _valid(self, token: str) -> dict[str, Any] | None:
        entry = _tokens(self._hass).get(token)
        return entry if entry and entry["until"] > time.time() and entry["left"] > 0 else None

    async def get(self, request: web.Request, token: str) -> web.Response:
        if not self._valid(token):
            return web.Response(status=HTTPStatus.GONE, text="This link has expired.", content_type="text/plain")
        return web.Response(text=_PAGE, content_type="text/html", headers={"Cache-Control": "no-store", "X-Frame-Options": "DENY"})

    async def post(self, request: web.Request, token: str) -> web.Response:
        entry = self._valid(token)
        if not entry:
            return web.Response(status=HTTPStatus.GONE)
        media = self._hass.config.media_dirs.get("local")
        if not media:
            return web.Response(status=HTTPStatus.SERVICE_UNAVAILABLE)
        reader = await request.multipart()
        field = await reader.next()
        if field is None or getattr(field, "name", None) != "file":
            return web.Response(status=HTTPStatus.BAD_REQUEST)
        chunks: list[bytes] = []
        size = 0
        while chunk := await field.read_chunk(256 * 1024):
            size += len(chunk)
            if size > MAX_UPLOAD_BYTES:
                return web.Response(status=HTTPStatus.REQUEST_ENTITY_TOO_LARGE)
            chunks.append(chunk)
        body = b"".join(chunks)
        ext = _detect(body[:16])
        if ext is None:
            return web.Response(status=HTTPStatus.UNSUPPORTED_MEDIA_TYPE)
        cfg = (self._hass.data[DOMAIN].get("config") or {}).get("settings") or {}
        folder = str((cfg.get("screensaver") or {}).get("photo_folder") or PHOTOS_DIR)
        if folder.startswith("media-source://") or ".." in folder:
            folder = PHOTOS_DIR
        target = os.path.join(media, folder)
        name = f"phone-{time.strftime('%Y%m%d')}-{secrets.token_hex(4)}{ext}"
        await self._hass.async_add_executor_job(_write, target, name, body)
        entry["left"] -= 1
        return web.json_response({"ok": True})


def _write(folder: str, name: str, body: bytes) -> None:
    os.makedirs(folder, exist_ok=True)
    with open(os.path.join(folder, name), "wb") as fh:
        fh.write(body)
