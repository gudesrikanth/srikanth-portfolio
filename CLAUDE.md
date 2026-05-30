# srikanth-portfolio — Context for Claude

## What this is
Personal portfolio website for Srikanth Gude, Cloud-Native Full Stack Engineer.
Next.js 15 + TypeScript, deployed as a container on AWS Lambda + API Gateway HTTP API v2
using the Lambda Web Adapter. Same infra/CI/CD pattern as the SwiftLink project.

## Package structure
```
src/
├── app/
│   ├── api/health/route.ts   # GET /api/health → {"status":"UP"} — Lambda readiness probe
│   ├── layout.tsx            # Root layout, Geist font, SEO metadata
│   └── page.tsx              # Assembles all section components
└── components/
    ├── Navbar.tsx            # Fixed top nav with smooth-scroll links
    ├── Hero.tsx              # Name, title, CTA buttons
    ├── About.tsx             # Bio, philosophy, years of experience
    ├── Skills.tsx            # Grouped skill badges
    ├── Projects.tsx          # Project cards (SwiftLink + others)
    ├── Contact.tsx           # LinkedIn + email links
    └── Footer.tsx
```

## Key design decisions
- **Next.js standalone output**: `output: 'standalone'` in next.config.ts produces a
  self-contained Node.js server at `.next/standalone/server.js` — no `next start` needed.
- **Lambda Web Adapter**: `/opt/extensions/lambda-adapter` extension polls `/api/health`
  before marking the function ready. Port is 3000 (set via `PORT` env var).
- **No database**: portfolio is static content — no DynamoDB, no Redis, no external state.
- **Tailwind v4**: uses CSS-first config (`@import "tailwindcss"`) not tailwind.config.ts.
- **Framer Motion**: `useInView` scroll-triggered animations on all sections.
- **TypeScript strict**: `strict: true` in tsconfig.json, no `any` allowed.

## Infrastructure layout
```
infra/
├── bootstrap/          # ONE-TIME: S3 state bucket + DynamoDB lock table
├── modules/
│   ├── ecr/            # ECR repository + lifecycle policy
│   ├── iam/            # Lambda execution role (ECR + CloudWatch only — no DynamoDB)
│   ├── lambda/         # Lambda function (container image), log group, alarms
│   └── api_gateway/    # HTTP API v2, catch-all route → Lambda, throttle, CORS, access logs
└── environments/
    ├── dev/            # 512 MB Lambda, 7-day logs, no alarm SNS
    └── prod/           # 1024 MB Lambda, 30-day logs, SNS alarm email
```

## API endpoints
| Method | Path | Description |
|--------|------|-------------|
| GET | / | Portfolio home page |
| GET | /api/health | Health check — `{"status":"UP"}` |

## Build and dev commands
```bash
npm run dev          # local dev server on :3000
npm run build        # production build (outputs .next/standalone)
npm run lint         # ESLint
npm run type-check   # tsc --noEmit
```

## Functional tests
```bash
bash scripts/test-dev.sh --url <api-gateway-url>
```
Checks: health 200 + status=UP, home 200, content sections, SwiftLink project, 404 path.
Runs as `functional-tests-dev` / `functional-tests-prod` in pipeline.yml (needs: deploy-*).

## CI/CD workflows
One unified `pipeline.yml` handles every app deploy path; infra has its own files.

| Workflow | Trigger | What it does |
|---|---|---|
| pipeline.yml | PR / push to main/develop / push tag v*.*.* / workflow_dispatch | lint + type-check + build → Trivy scan. PR also runs a Docker-validate. Push main/develop → ECR → Lambda dev → functional + Playwright tests. Tag v*.*.* or dispatch(target=prod) → ECR → Lambda prod (env approval) → functional + Playwright tests. Dispatch with `promote_image_tag` re-tags a dev image into prod ECR instead of rebuilding. |
| infra-bootstrap.yml | workflow_dispatch | one-time S3 + DynamoDB lock table |
| infra-dev.yml | PR paths, workflow_dispatch | terraform plan/apply/destroy — dev |
| infra-prod.yml | PR paths, workflow_dispatch | terraform plan/apply/destroy — prod |

Top-level `permissions:` grants `security-events: write` so Trivy can upload SARIF to GitHub code scanning. Concurrency group `pipeline-${{ github.ref }}` cancels redundant PR runs but lets deploys serialize.

## Docker build pattern
Multi-stage: `deps` (npm ci) → `builder` (npm run build) → `lambda-adapter` → `runtime` (node:22-alpine).
Key flags: `provenance=false sbom=false platforms=linux/amd64` — required for Lambda ECR image compatibility.
Non-root user `portfolio` in runtime stage.

## Required GitHub secrets
- `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY`
- `TF_STATE_BUCKET` / `TF_LOCK_TABLE` — output from infra-bootstrap workflow

## First-time deploy sequence
1. Add AWS credential secrets to GitHub
2. Run `infra-bootstrap` workflow → copy TF_STATE_BUCKET + TF_LOCK_TABLE as secrets
3. Run `infra-dev` → action: apply (bootstraps ECR, pushes placeholder, full apply)
4. Push to main → `pipeline.yml` builds, deploys to dev Lambda, and runs functional + Playwright tests automatically

## Conventions
- No comments unless WHY is non-obvious
- All components use Framer Motion with `useInView` for scroll animations
- Section IDs match navbar href anchors: `#about`, `#skills`, `#projects`, `#contact`
- Health route must always return 200 — Lambda Web Adapter depends on it for readiness
