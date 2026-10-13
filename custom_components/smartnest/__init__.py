"""SmartNest dashboard: a custom panel plus the storage and upload API behind it."""
from __future__ import annotations

import logging

from homeassistant.components import frontend, panel_custom
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.storage import Store
from homeassistant.loader import async_get_integration

from .const import (
    DOMAIN,
    FILES_DIR,
    FILES_URL,
    FRONTEND_DIR,
    PANEL_COMPONENT,
    PANEL_ICON,
    PANEL_TITLE,
    PANEL_URL_PATH,
    STATIC_URL,
    STORAGE_KEY,
    STORAGE_VERSION,
)
from .upload import SmartNestUploadView
from .websocket import async_register_commands

_LOGGER = logging.getLogger(__name__)

CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN)

# Routes and WebSocket commands can't be unregistered, so they're added once per HA run.
_REGISTERED = f"{DOMAIN}_registered"


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Load the saved dashboard and show the panel."""
    store: Store[dict] = Store(hass, STORAGE_VERSION, STORAGE_KEY)
    hass.data[DOMAIN] = {"store": store, "config": await store.async_load()}

    files_dir = hass.config.path(FILES_DIR)
    await hass.async_add_executor_job(_ensure_dir, files_dir)

    if not hass.data.get(_REGISTERED):
        await hass.http.async_register_static_paths(
            [
                # No caching: after copying a new build, a reload is enough to pick it up.
                StaticPathConfig(STATIC_URL, str(FRONTEND_DIR), False),
                # Upload names are random and never reused, so these can be cached.
                StaticPathConfig(FILES_URL, files_dir, True),
            ]
        )
        hass.http.register_view(SmartNestUploadView(hass, files_dir))
        async_register_commands(hass)
        hass.data[_REGISTERED] = True

    integration = await async_get_integration(hass, DOMAIN)
    version = str(integration.version)
    stamp = await hass.async_add_executor_job(_build_stamp)

    await panel_custom.async_register_panel(
        hass,
        frontend_url_path=PANEL_URL_PATH,
        webcomponent_name=PANEL_COMPONENT,
        sidebar_title=PANEL_TITLE,
        sidebar_icon=PANEL_ICON,
        module_url=f"{STATIC_URL}/smartnest-panel.js?v={version}-{stamp}",
        embed_iframe=False,
        require_admin=False,
        config={"asset_base": f"{STATIC_URL}/static/", "version": version},
    )
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Remove the panel; the saved dashboard stays on disk."""
    frontend.async_remove_panel(hass, PANEL_URL_PATH)
    hass.data.pop(DOMAIN, None)
    return True


def _ensure_dir(path: str) -> None:
    import os

    os.makedirs(path, exist_ok=True)


def _build_stamp() -> int:
    """Changes whenever a new panel build is copied in, so browsers fetch it fresh."""
    js = FRONTEND_DIR / "smartnest-panel.js"
    try:
        return int(js.stat().st_mtime)
    except OSError:
        _LOGGER.error("SmartNest panel build missing at %s", js)
        return 0
