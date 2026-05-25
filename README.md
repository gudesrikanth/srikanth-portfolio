# Srikanth Gude — Portfolio

Personal portfolio site for **Srikanth Gude**, Cloud-Native Full Stack Engineer.

Built with Next.js 15, deployed as a container on AWS Lambda + API Gateway — the same production-grade pattern used for real workloads.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) + TypeScript strict |
| Styling | Tailwind CSS v4 + Framer Motion |
| Runtime | Node.js 22 (standalone output) |
| Compute | AWS Lambda (container image, x86_64) |
| API | AWS API Gateway HTTP API v2 |
| Registry | Amazon ECR |
| IaC | Terraform 1.9 |
| CI/CD | GitHub Actions |

---

## Project structure

```
srikanth-portfolio/
├── src/
│   ├── app/
│   │   ├── api/health/route.ts   # Lambda readiness probe
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components/
│       ├── Navbar.tsx
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Skills.tsx
│       ├── Projects.tsx
│       ├── Contact.tsx
│       └── Footer.tsx
├── infra/
│   ├── bootstrap/                # One-time: S3 state bucket + DynamoDB lock table
│   ├── modules/
│   │   ├── ecr/                  # ECR repository + lifecycle policy
│   │   ├── iam/                  # Lambda execution role + policies
│   │   ├── lambda/               # Lambda function, log group, alarms
│   │   └── api_gateway/          # HTTP API v2, catch-all route, throttle, CORS
│   └── environments/
│       ├── dev/                  # 512 MB Lambda, 7-day logs
│       └── prod/                 # 1024 MB Lambda, 30-day logs, SNS alarms
├── scripts/
│   └── test-dev.sh               # Functional tests run post-deploy
├── .github/workflows/
│   ├── ci.yml                    # Lint + type-check + build on every push/PR
│   ├── deploy-dev.yml            # Build → push → Lambda update → functional tests
│   ├── deploy-prod.yml           # Tag-triggered or promote-dev-image, env gate
│   ├── infra-bootstrap.yml       # One-time state backend setup
│   ├── infra-dev.yml             # Terraform plan/apply/destroy — dev
│   └── infra-prod.yml            # Terraform plan/apply/destroy — prod
├── Dockerfile                    # Multi-stage: deps → builder → runtime (Lambda Web Adapter)
└── next.config.ts                # output: standalone
```

---

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run lint         # ESLint
npm run type-check   # tsc --noEmit
npm run build        # production build
```

---

## AWS deployment

### First-time setup

**1. Bootstrap Terraform state backend** (run once)

Run the `Infra — Bootstrap` workflow in GitHub Actions.  
Copy the two output values as GitHub repository secrets:

| Secret | Value from bootstrap output |
|---|---|
| `TF_STATE_BUCKET` | `swiftlink-tf-state-...` |
| `TF_LOCK_TABLE` | `swiftlink-tf-locks` |

Also add your AWS credentials as secrets:

| Secret | Description |
|---|---|
| `AWS_ACCESS_KEY_ID` | IAM user access key |
| `AWS_SECRET_ACCESS_KEY` | IAM user secret key |

**2. Provision infrastructure**

Run `Infra — Dev` workflow → action: `apply`.

The workflow:
1. Creates ECR repository (targeted apply)
2. Pushes a placeholder image so Lambda can be created
3. Runs full `terraform apply` (IAM, Lambda, API Gateway)

**3. Deploy the application**

Push to `main` — the `Deploy — Dev` workflow runs automatically:
- Builds Next.js + Docker image
- Pushes to ECR with tag `dev-{git-sha}`
- Updates Lambda image URI
- Runs functional tests against the live URL

---

## How it works on Lambda

```
Client → API Gateway HTTP API v2
       → Lambda (container image)
          ├── Lambda Web Adapter extension (translates Lambda ↔ HTTP)
          └── Next.js standalone server (Node.js, port 3000)
```

The [AWS Lambda Web Adapter](https://github.com/awslabs/aws-lambda-web-adapter) bridges Lambda's invocation protocol to plain HTTP, so the Next.js server runs unchanged — no Lambda-specific SDK needed.

Cold starts are handled by lazy initialization and a readiness probe at `/api/health` that the adapter polls before accepting traffic.

---

## Functional tests

```bash
bash scripts/test-dev.sh --url https://<api-gateway-url>
```

Covers: health check, home page 200, all content sections present, SwiftLink project card, 404 for unknown paths.

Run automatically as the final job in both `deploy-dev` and `deploy-prod` pipelines.

---

## Environments

| | Dev | Prod |
|---|---|---|
| Lambda memory | 512 MB | 1024 MB |
| Lambda timeout | 30s | 30s |
| Log retention | 7 days | 30 days |
| Alarm SNS | — | configured |
| Approval gate | — | GitHub environment |
