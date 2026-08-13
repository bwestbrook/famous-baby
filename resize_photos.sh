#!/usr/bin/env bash
# resize_photos.sh — bring photos/ down to a size worth shipping.
#
#   ./resize_photos.sh [maxEdge] [quality]     defaults: 512 72
#
# Two things make a freshly fetched folder heavy:
#
#   * Wikipedia's thumbnailer doesn't always honour the width we ask for, so
#     some "640px" thumbs arrive 960 or 1200 wide.
#   * fetch_photos.py saves every file as <id>.jpg whatever the bytes really
#     are, because the site looks images up by that exact name. Ten of them
#     are PNGs wearing a .jpg suffix, and a PNG portrait runs to a megabyte.
#
# Re-encoding both cases as real JPEG at a sane edge takes the folder from
# ~49 MB to ~9 MB with no visible loss at the size the globe draws a face.
#
# Uses sips, which ships with macOS. Idempotent: running it twice is a no-op
# beyond a second round of JPEG encoding, and it skips anything already small.

set -euo pipefail

MAX_EDGE="${1:-512}"
QUALITY="${2:-72}"
DIR="$(cd "$(dirname "$0")" && pwd)/photos"

command -v sips >/dev/null || { echo "sips not found (macOS only)" >&2; exit 1; }
[ -d "$DIR" ] || { echo "no photos/ directory" >&2; exit 1; }

before=$(du -sk "$DIR" | cut -f1)
count=0

for f in "$DIR"/*.jpg; do
  [ -e "$f" ] || continue
  tmp="$f.resizing"
  if sips -Z "$MAX_EDGE" -s format jpeg -s formatOptions "$QUALITY" "$f" --out "$tmp" >/dev/null 2>&1; then
    # Only take the new file if it actually saved something — re-encoding an
    # already-small JPEG can come out bigger.
    if [ "$(stat -f%z "$tmp")" -lt "$(stat -f%z "$f")" ]; then
      mv "$tmp" "$f"
      count=$((count + 1))
    else
      rm -f "$tmp"
    fi
  else
    rm -f "$tmp"
    echo "  skipped (sips could not read): $(basename "$f")" >&2
  fi
done

after=$(du -sk "$DIR" | cut -f1)
echo "resized $count file(s) to ${MAX_EDGE}px / q${QUALITY}"
printf 'photos/: %d MB -> %d MB\n' "$((before / 1024))" "$((after / 1024))"
