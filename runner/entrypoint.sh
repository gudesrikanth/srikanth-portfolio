#!/usr/bin/env bash
set -euo pipefail

: "${REPO_URL:?set REPO_URL, e.g. https://github.com/owner/repo}"
: "${GITHUB_PAT:?set GITHUB_PAT (fine-grained PAT with repo Administration: read+write)}"

RUNNER_NAME="${RUNNER_NAME:-laptop-$(hostname)-$$}"
RUNNER_LABELS="${RUNNER_LABELS:-self-hosted,playwright}"
REPO_PATH="${REPO_URL#https://github.com/}"

echo "==> Requesting fresh registration token for ${REPO_PATH}"
TOKEN=$(
  curl -sf \
    -X POST \
    -H "Authorization: Bearer ${GITHUB_PAT}" \
    -H "Accept: application/vnd.github+json" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    "https://api.github.com/repos/${REPO_PATH}/actions/runners/registration-token" \
    | jq -r .token
)

if [[ -z "${TOKEN}" || "${TOKEN}" == "null" ]]; then
  echo "Failed to obtain registration token. Check GITHUB_PAT scopes." >&2
  exit 1
fi

echo "==> Configuring runner '${RUNNER_NAME}' with labels '${RUNNER_LABELS}'"
./config.sh \
  --url "${REPO_URL}" \
  --token "${TOKEN}" \
  --name "${RUNNER_NAME}" \
  --labels "${RUNNER_LABELS}" \
  --work _work \
  --ephemeral \
  --unattended \
  --replace

cleanup() {
  echo "==> Caught signal, attempting to deregister runner"
  ./config.sh remove --token "${TOKEN}" || true
}
trap cleanup INT TERM

echo "==> Starting runner (will exit after one job — --ephemeral)"
exec ./run.sh
