# Self-hosted GitHub Actions runner (Docker, laptop)

A small Docker container that registers itself as an **ephemeral** self-hosted
runner for `gudesrikanth/srikanth-portfolio`. Intended for learning — moves
only the `5. E2E Tests (dev)` job off the GitHub-hosted runner so Playwright's
chromium download gets cached across runs.

## ⚠️ Public-repo safety first

This repo is public. **Before** starting the runner, lock down workflow
approval for fork PRs:

1. Repo → **Settings** → **Actions** → **General**
2. Under **Fork pull request workflows from outside collaborators**, pick
   **Require approval for all outside collaborators** (or stricter).
3. Save.

Why: anyone can open a PR with a modified workflow that runs on your runner.
With the runner being ephemeral and on your laptop, the blast radius is
already limited, but the approval gate is the primary defense.

The container also runs as non-root, uses `--ephemeral` (one job per
registration), and has CPU/memory caps in `docker-compose.yml`.

## What you need

- Docker Desktop running
- A **fine-grained Personal Access Token** with:
  - Repository access: **Only select** → this repo
  - Repository permissions → **Administration**: Read and write
  - Mint at https://github.com/settings/personal-access-tokens/new
- ~3 GB free disk for the image + caches

## Setup

```bash
cd runner
cp .env.example .env
# edit .env, paste your GITHUB_PAT
docker compose up -d --build
docker compose logs -f
```

You should see something like:
```
==> Requesting fresh registration token for gudesrikanth/srikanth-portfolio
==> Configuring runner 'laptop' with labels 'self-hosted,playwright'
√ Connected to GitHub
√ Runner successfully added
√ Runner connection is good
Listening for Jobs
```

Confirm in GitHub: repo → **Settings** → **Actions** → **Runners**. You
should see your runner as **Idle**.

## Flip the E2E job to self-hosted

In `.github/workflows/pipeline.yml`, change job #5:

```yaml
  e2e-tests-dev:
    name: 5. E2E Tests (dev)
    runs-on: [self-hosted, playwright]   # was: ubuntu-latest
    needs: deploy-dev
```

Commit + push. On the next run you'll watch the GitHub Actions log stream
from your laptop container.

## How --ephemeral works here

- Container starts → entrypoint fetches a fresh registration token →
  `config.sh --ephemeral --replace` registers the runner
- Runner picks up exactly **one** job and runs it
- `run.sh` exits when the job finishes
- Docker compose's `restart: unless-stopped` brings the container back up
- New cycle: fresh token, fresh registration, ready for the next job

State that **survives** between cycles (via named volumes):
- Playwright browser binaries (`~/.cache/ms-playwright`)
- npm cache (`~/.npm`)

State that **gets wiped** between cycles:
- The runner's `_work/` directory (workspace)
- Anything the job wrote to the container filesystem

## Stop / clean up

```bash
docker compose down              # stop
docker compose down -v           # stop and wipe Playwright + npm caches
docker volume rm runner_playwright-cache runner_npm-cache  # if compose down didn't
```

If the runner registration gets stuck on GitHub (e.g. you killed Docker
ungracefully), delete it manually: repo → Settings → Actions → Runners →
the stale entry → Remove.

## Troubleshooting

| Symptom | Fix |
|---|---|
| `Failed to obtain registration token` | PAT missing `Administration: write` scope or wrong repo. Re-mint the PAT. |
| Container restarts loop with `Runner already exists` | A previous registration wasn't cleaned up. The `--replace` flag should handle it, but if not, remove the runner via GitHub UI. |
| E2E job sits in "Queued" forever | Either your runner is offline (check `docker compose ps`) or the labels in `runs-on:` don't match the runner's labels. Default labels are `self-hosted,playwright`. |
| Playwright tests can't reach the dev API | The container can talk to the public internet by default — should be fine. If you're behind a corporate proxy, set `HTTP_PROXY` / `HTTPS_PROXY` env in `docker-compose.yml`. |

## Going back to GitHub-hosted

Revert the `runs-on:` change and `docker compose down`. No other state to
clean up.
