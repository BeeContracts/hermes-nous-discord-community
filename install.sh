#!/usr/bin/env sh
set -eu
HERMES_HOME="${HERMES_HOME:-$HOME/.hermes}"
DEST="$HERMES_HOME/desktop-plugins/nous-discord-community"
SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
mkdir -p "$DEST"
cp "$SCRIPT_DIR/plugin.js" "$DEST/plugin.js"
printf 'Installed to %s\n' "$DEST"
printf '%s\n' "Run 'Reload desktop plugins' in Hermes Desktop."
