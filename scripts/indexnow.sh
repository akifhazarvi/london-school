#!/usr/bin/env bash
# indexnow.sh — submit URLs to IndexNow (Bing, Yandex, Seznam, Naver, Yep)
#
# Usage:
#   scripts/indexnow.sh <url> [<url> ...]                # submit specific URLs
#   scripts/indexnow.sh --changed                        # submit URLs changed in last commit
#   scripts/indexnow.sh --since <ref>                    # submit URLs changed since <ref> (e.g. HEAD~5, main)
#   scripts/indexnow.sh --all                            # submit every URL in sitemap.xml
#
# Notes:
#   - Up to 10,000 URLs per call; this script chunks at 5,000 to stay well under.
#   - The key file at /<KEY>.txt must already be deployed and reachable on the live host.
#   - Pass --dry-run as the first arg to print the payload without sending.
#
# Exit non-zero on HTTP error so CI/hooks can detect failure.

set -euo pipefail

HOST="londoneducation.pk"
KEY="8b4f117b173cba99fb617252259a56e0"
KEY_LOCATION="https://${HOST}/${KEY}.txt"
ENDPOINT="https://api.indexnow.org/indexnow"
SITE_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

# path_to_url: convert a repo-relative HTML/XML path into the canonical https URL.
# index.html and blog/index.html are submitted as directory form (cleaner canonical).
path_to_url() {
  local p="$1"
  case "$p" in
    index.html)        echo "https://${HOST}/" ;;
    blog/index.html)   echo "https://${HOST}/blog/" ;;
    sitemap.xml)       echo "https://${HOST}/sitemap.xml" ;;
    *)                 echo "https://${HOST}/${p}" ;;
  esac
}

DRY_RUN=0
if [[ "${1:-}" == "--dry-run" ]]; then
  DRY_RUN=1
  shift
fi

# Build the URL list based on mode.
urls=()
case "${1:-}" in
  --changed)
    # Last commit's HTML/XML changes, plus any uncommitted changes still in the tree.
    while IFS= read -r f; do
      [[ -z "$f" ]] && continue
      urls+=("$(path_to_url "$f")")
    done < <( {
      git -C "$SITE_ROOT" diff --name-only HEAD~1 HEAD -- '*.html' '*.xml' 2>/dev/null || true
      git -C "$SITE_ROOT" diff --name-only HEAD -- '*.html' '*.xml' 2>/dev/null || true
      git -C "$SITE_ROOT" ls-files --others --exclude-standard -- '*.html' '*.xml' 2>/dev/null || true
    } | sort -u )
    ;;
  --since)
    ref="${2:?--since requires a git ref, e.g. main, HEAD~5}"
    while IFS= read -r f; do
      [[ -z "$f" ]] && continue
      urls+=("$(path_to_url "$f")")
    done < <(git -C "$SITE_ROOT" diff --name-only "$ref" HEAD -- '*.html' '*.xml' 2>/dev/null || true)
    ;;
  --all)
    while IFS= read -r u; do
      [[ -z "$u" ]] && continue
      urls+=("$u")
    done < <(grep -oE '<loc>[^<]+</loc>' "$SITE_ROOT/sitemap.xml" | sed -E 's#</?loc>##g')
    ;;
  "")
    echo "Usage: $0 [--dry-run] <url> [<url> ...]" >&2
    echo "       $0 [--dry-run] --changed | --since <ref> | --all" >&2
    exit 2
    ;;
  *)
    for arg in "$@"; do
      if [[ "$arg" == http*://* ]]; then
        urls+=("$arg")
      else
        urls+=("$(path_to_url "$arg")")
      fi
    done
    ;;
esac

if [[ ${#urls[@]} -eq 0 ]]; then
  echo "No URLs to submit." >&2
  exit 0
fi

# De-duplicate while preserving order. (awk works on macOS bash 3.2 too.)
deduped=()
while IFS= read -r u; do
  [[ -z "$u" ]] && continue
  deduped+=("$u")
done < <(printf '%s\n' "${urls[@]}" | awk '!seen[$0]++')
urls=("${deduped[@]}")

echo "IndexNow: ${#urls[@]} URL(s) for ${HOST}"
for u in "${urls[@]}"; do echo "  → $u"; done

# Chunk and submit.
chunk_size=5000
total=${#urls[@]}
i=0
while (( i < total )); do
  chunk=("${urls[@]:i:chunk_size}")
  json_urls=$(printf '%s\n' "${chunk[@]}" | python3 -c '
import json, sys
print(json.dumps([line.strip() for line in sys.stdin if line.strip()]))
')
  payload=$(cat <<EOF
{
  "host": "${HOST}",
  "key": "${KEY}",
  "keyLocation": "${KEY_LOCATION}",
  "urlList": ${json_urls}
}
EOF
)

  if (( DRY_RUN )); then
    echo "--- DRY RUN payload (chunk $((i/chunk_size + 1))) ---"
    echo "$payload"
  else
    echo
    echo "Submitting chunk $((i/chunk_size + 1)) (${#chunk[@]} URLs)..."
    http_code=$(curl -sS -o /tmp/indexnow-response.txt -w "%{http_code}" \
      -X POST "$ENDPOINT" \
      -H "Content-Type: application/json; charset=utf-8" \
      --data-binary "$payload")
    body=$(cat /tmp/indexnow-response.txt)
    rm -f /tmp/indexnow-response.txt
    case "$http_code" in
      200|202)
        echo "  ✓ HTTP $http_code (accepted)"
        ;;
      *)
        echo "  ✗ HTTP $http_code"
        [[ -n "$body" ]] && echo "  Response: $body"
        exit 1
        ;;
    esac
  fi

  i=$((i + chunk_size))
done

echo
echo "Done."
