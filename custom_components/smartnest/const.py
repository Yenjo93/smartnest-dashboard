"""Constants for the SmartNest dashboard."""
from __future__ import annotations

from pathlib import Path

DOMAIN = "smartnest"

PANEL_URL_PATH = "smartnest"
PANEL_COMPONENT = "smartnest-panel"
PANEL_TITLE = "SmartNest"
PANEL_ICON = "mdi:home-heart"

FRONTEND_DIR = Path(__file__).parent / "frontend"
STATIC_URL = "/smartnest_static"

# Uploaded floor plans live in <config>/smartnest/ and are served from here.
FILES_DIR = "smartnest"
FILES_URL = "/smartnest_files"

STORAGE_KEY = "smartnest.dashboard"
STORAGE_VERSION = 1

SIGNAL_CONFIG_UPDATED = "smartnest_config_updated"

MAX_UPLOAD_BYTES = 15 * 1024 * 1024
MAX_CONFIG_BYTES = 2 * 1024 * 1024
