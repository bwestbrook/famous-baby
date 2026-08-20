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
# Uses sips, which ships with macOS. Genuinely idempotent: a file already
# inside the budget is not touched at all.
#
# It used to re-encode everything and keep whichever copy came out smaller,
# which is not the same thing. Measured on a pass where only four portraits
# were new: 967 files rewritten to save one megabyte between them. Every one
# of those is a fresh blob in git — history holds 711 MB of photographs
# against 169 MB on disk, and that gap is re-encoding, not people. It also
# costs a little quality each time, since JPEG loses on every generation.

set -euo pipefail

MAX_EDGE="${1:-512}"
QUALITY="${2:-72}"
DIR="$(cd "$(dirname "$0")" && pwd)/photos"

command -v sips >/dev/null || { echo "sips not found (macOS only)" >&2; exit 1; }
[ -d "$DIR" ] || { echo "no photos/ directory" >&2; exit 1; }

before=$(du -sk "$DIR" | cut -f1)
count=0

kept=0
unreadable=0

for f in "$DIR"/*.jpg; do
  [ -e "$f" ] || continue

  # Ask before doing anything. A real JPEG already within the edge budget is
  # left exactly as it is — byte for byte, so git sees no change.
  if info=$(sips -g format -g pixelWidth -g pixelHeight "$f" 2>/dev/null); then
    fmt=$(printf '%s\n' "$info" | awk '/format:/{print $2}')
    w=$(printf '%s\n' "$info" | awk '/pixelWidth:/{print $2}')
    h=$(printf '%s\n' "$info" | awk '/pixelHeight:/{print $2}')
    if [ "$fmt" = "jpeg" ] && [ "${w:-99999}" -le "$MAX_EDGE" ] && [ "${h:-99999}" -le "$MAX_EDGE" ]; then
      kept=$((kept + 1))
      continue
    fi
  else
    unreadable=$((unreadable + 1))
    echo "  skipped (sips could not read): $(basename "$f")" >&2
    continue
  fi

  tmp="$f.resizing"
  if sips -Z "$MAX_EDGE" -s format jpeg -s formatOptions "$QUALITY" "$f" --out "$tmp" >/dev/null 2>&1; then
    # Belt and braces: an oversized file always comes out smaller, but a PNG
    # wearing a .jpg suffix occasionally doesn't, and a bigger file is not a
    # trade worth making.
    if [ "$(stat -f%z "$tmp")" -lt "$(stat -f%z "$f")" ]; then
      mv "$tmp" "$f"
      count=$((count + 1))
    else
      rm -f "$tmp"
      kept=$((kept + 1))
    fi
  else
    rm -f "$tmp"
    unreadable=$((unreadable + 1))
    echo "  skipped (sips could not read): $(basename "$f")" >&2
  fi
done

after=$(du -sk "$DIR" | cut -f1)
echo "resized $count file(s) to ${MAX_EDGE}px / q${QUALITY}; left $kept alone${unreadable:+, $unreadable unreadable}"
printf 'photos/: %d MB -> %d MB\n' "$((before / 1024))" "$((after / 1024))"
