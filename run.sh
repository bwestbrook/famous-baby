#!/usr/bin/env bash
# famous Baby — local launcher.
# Starts a static file server in this directory and opens the site in the
# default browser. Stop with Ctrl+C.

set -euo pipefail

PORT="${PORT:-8080}"
HOST="http://localhost:${PORT}"

# Move to the directory of this script so it works no matter where you run it from.
cd "$(dirname "$0")"

# Quick sanity check on the dataset before serving — fail fast if data.js is broken.
if command -v node >/dev/null 2>&1; then
  if ! node --check data.js >/dev/null 2>&1; then
    echo "WARNING: data.js failed to parse. The site may not load."
    echo "Run 'node --check data.js' to see the error."
    echo
  fi
fi

echo "famous Baby → ${HOST}"
echo "Press Ctrl+C to stop."
echo

# Try to open the browser in the background; harmless if it fails.
( sleep 0.4
  if command -v open >/dev/null 2>&1; then        # macOS
    open "${HOST}" || true
  elif command -v xdg-open >/dev/null 2>&1; then  # Linux
    xdg-open "${HOST}" >/dev/null 2>&1 || true
  fi
) &

# Serve. Python 3 ships with macOS; works on any *nix.
exec python3 -m http.server "${PORT}"
