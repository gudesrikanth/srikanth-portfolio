#!/usr/bin/env bash
set -euo pipefail

# ─── Args ────────────────────────────────────────────────────────────────────
BASE_URL=""
while [[ $# -gt 0 ]]; do
  case $1 in
    --url) BASE_URL="$2"; shift 2 ;;
    *) echo "Unknown arg: $1"; exit 1 ;;
  esac
done

if [[ -z "$BASE_URL" ]]; then
  echo "Usage: $0 --url <api-gateway-url>"
  exit 1
fi

BASE_URL="${BASE_URL%/}"   # strip trailing slash

# ─── Helpers ─────────────────────────────────────────────────────────────────
PASS=0
FAIL=0

pass() { echo "  PASS  $1"; PASS=$((PASS + 1)); }
fail() { echo "  FAIL  $1"; FAIL=$((FAIL + 1)); }

assert_status() {
  local label="$1" expected="$2" url="$3"
  local actual
  actual=$(curl -s -o /dev/null -w "%{http_code}" "$url")
  if [[ "$actual" == "$expected" ]]; then
    pass "$label — HTTP $actual"
  else
    fail "$label — expected HTTP $expected, got $actual  ($url)"
  fi
}

assert_body_contains() {
  local label="$1" pattern="$2" url="$3"
  local body
  body=$(curl -s "$url")
  if echo "$body" | grep -q "$pattern"; then
    pass "$label — found '$pattern'"
  else
    fail "$label — '$pattern' not found in response"
  fi
}

assert_json_field() {
  local label="$1" field="$2" expected="$3" url="$4"
  local actual
  actual=$(curl -s "$url" | grep -o "\"${field}\":\"[^\"]*\"" | cut -d'"' -f4 || echo "")
  if [[ "$actual" == "$expected" ]]; then
    pass "$label — $field=$actual"
  else
    fail "$label — expected $field=$expected, got $actual"
  fi
}

assert_header_contains() {
  local label="$1" header="$2" pattern="$3" url="$4"
  local actual
  actual=$(curl -s -o /dev/null -D - "$url" | grep -i "^${header}:" | tr -d '\r' | head -1)
  if echo "$actual" | grep -qi "$pattern"; then
    pass "$label — $actual"
  else
    fail "$label — expected '$header' to contain '$pattern', got '$actual'"
  fi
}

assert_body_not_contains() {
  local label="$1" pattern="$2" url="$3"
  local body
  body=$(curl -s "$url")
  if echo "$body" | grep -q "$pattern"; then
    fail "$label — unexpected '$pattern' found in response"
  else
    pass "$label — '$pattern' absent"
  fi
}

# ─── Tests ───────────────────────────────────────────────────────────────────
echo ""
echo "════════════════════════════════════════════"
echo "  Portfolio Functional Tests"
echo "  $BASE_URL"
echo "════════════════════════════════════════════"
echo ""
echo "── Health ──────────────────────────────────"

assert_status      "health endpoint"              "200" "$BASE_URL/api/health"
assert_json_field  "health returns status=UP"     "status" "UP" "$BASE_URL/api/health"

echo ""
echo "── Pages ───────────────────────────────────"

assert_status      "home page returns 200"        "200" "$BASE_URL/"
assert_body_contains "home contains name"         "Srikanth" "$BASE_URL/"
assert_body_contains "home contains title"        "Cloud-Native" "$BASE_URL/"

echo ""
echo "── Content sections ────────────────────────"

assert_body_contains "home has About section"     "About" "$BASE_URL/"
assert_body_contains "home has Skills section"    "Skills" "$BASE_URL/"
assert_body_contains "home has Projects section"  "Projects" "$BASE_URL/"
assert_body_contains "home has Contact section"   "Contact" "$BASE_URL/"

echo ""
echo "── Project content ─────────────────────────"

assert_body_contains "SwiftLink project present"  "SwiftLink" "$BASE_URL/"
assert_body_contains "Lambda mentioned"           "Lambda" "$BASE_URL/"

echo ""
echo "── Avatar proxy ────────────────────────────"

assert_status         "avatar proxy returns 200"        "200" "$BASE_URL/api/avatar"
assert_header_contains "avatar serves image content"    "Content-Type" "image/" "$BASE_URL/api/avatar"
assert_header_contains "avatar is cacheable"            "Cache-Control" "max-age" "$BASE_URL/api/avatar"
assert_body_contains  "home references /api/avatar"     "/api/avatar" "$BASE_URL/"
assert_body_not_contains "home hides github avatar url" "avatars.githubusercontent.com" "$BASE_URL/"

echo ""
echo "── Not found ───────────────────────────────"

assert_status      "unknown page returns 404"     "404" "$BASE_URL/does-not-exist-xyz"

echo ""
echo "════════════════════════════════════════════"
echo "  Results: $PASS passed, $FAIL failed"
echo "════════════════════════════════════════════"
echo ""

if [[ $FAIL -gt 0 ]]; then
  exit 1
fi
