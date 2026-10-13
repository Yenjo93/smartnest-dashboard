#!/usr/bin/env bash
# Builds the panel and copies the integration to a client's Home Assistant over SSH.
#
#   ./scripts/deploy.sh root@192.168.1.50            # copy only
#   ./scripts/deploy.sh root@192.168.1.50 --restart  # copy, then restart HA (needed on first install)
#
# Needs the "Advanced SSH & Web Terminal" add-on (or any SSH access to /config) on the client.
set -euo pipefail

HOST="${1:?usage: deploy.sh user@host [--restart]}"
RESTART="${2:-}"
PORT="${SSH_PORT:-22}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/custom_components/smartnest/"
DEST="/config/custom_components/smartnest/"

cd "$ROOT"
npm run build

VERSION="$(node -p "require('./package.json').version")"
echo "→ SmartNest v$VERSION → $HOST:$DEST"

ssh -p "$PORT" "$HOST" "mkdir -p $DEST"
# --delete keeps old files from piling up; uploads live in /config/smartnest, so they're untouched.
rsync -az --delete -e "ssh -p $PORT" --exclude "__pycache__" "$SRC" "$HOST:$DEST"

if [[ "$RESTART" == "--restart" ]]; then
  echo "→ restarting Home Assistant"
  ssh -p "$PORT" "$HOST" "ha core restart"
else
  echo "Done. Reload the integration (Settings → Devices & services → SmartNest → ⋮ → Reload) so screens pick up v$VERSION."
fi
