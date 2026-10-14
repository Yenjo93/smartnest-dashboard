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

# Family photos for the screensaver, inside HA's local media folder (Media → My media).
PHOTOS_DIR = "smartnest-photos"

STORAGE_KEY = "smartnest.dashboard"
STORAGE_VERSION = 1

SIGNAL_CONFIG_UPDATED = "smartnest_config_updated"

MAX_UPLOAD_BYTES = 15 * 1024 * 1024
MAX_CONFIG_BYTES = 2 * 1024 * 1024

# Public half of the installer's signing key (scripts/license.mjs). The private half never leaves the installer's computer.
LICENSE_PUBLIC_KEY = "yvSxJrxdvcXiAJ4-3L-7PM_yJXQn98nKqWQL_-nKjE8"
# Where every house reports to (the license desk). Built in and never shown in the dashboard; it only accepts genuine keys.
HEARTBEAT_URL_B64 = "aHR0cHM6Ly9vbWFyLnNtYXJ0bmVzdC5wcm8vYXBpL3dlYmhvb2svc21hcnRuZXN0XzUwNzBhYzBkYjdkMmQxZDRkNjBlMzM1ZGYyMWU1ZmVj"
LICENSE_STORAGE_KEY = "smartnest.license"
