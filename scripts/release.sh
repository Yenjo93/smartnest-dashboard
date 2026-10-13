#!/usr/bin/env bash
# Publishes a new version: HACS on every client then shows "Update available".
#
#   ./scripts/release.sh 0.3.0 "Kiosk lock with PIN"
#
# Needs the GitHub CLI, logged in once with: gh auth login
set -euo pipefail

VERSION="${1:?usage: release.sh X.Y.Z \"what changed\"}"
NOTES="${2:-}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Commit or stash your changes first."
  exit 1
fi

npm pkg set version="$VERSION"
npm run build

ZIP="smartnest-dashboard-v$VERSION.zip"
rm -f smartnest-dashboard-v*.zip
zip -rq "$ZIP" custom_components/smartnest -x "*/__pycache__/*" "*.DS_Store"

git add package.json package-lock.json custom_components/smartnest
git commit -m "Release v$VERSION"
git tag "v$VERSION"
git push origin HEAD "v$VERSION"

# The zip is attached too, for installs without HACS.
gh release create "v$VERSION" "$ZIP" --title "v$VERSION" --notes "${NOTES:-v$VERSION}"
echo "Released v$VERSION"
