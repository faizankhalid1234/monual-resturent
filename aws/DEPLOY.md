# AWS Deployment Guide — Monal Lahore

Deploy the full stack on AWS: **Amplify** (Next.js frontend + API routes), **App Runner** or **ECS** (Express backend), and **RDS PostgreSQL** (database).

## Architecture

```
                    ┌─────────────────────┐
                    │   Amazon RDS        │
                    │   PostgreSQL        │
                    └──────────┬──────────┘
                               │
         ┌─────────────────────┼─────────────────────┐
         │                     │                     │
         ▼                     ▼                     │
┌─────────────────┐   ┌─────────────────┐          │
│ AWS Amplify     │   │ AWS App Runner  │          │
│ Next.js 16      │──▶│ Express API     │──────────┘
│ (frontend/)     │   │ (backend/)      │
└─────────────────┘   └─────────────────┘
```

---

## Step 1 — RDS PostgreSQL

1. Open **AWS RDS** → Create database.
2. Engine: **PostgreSQL 16**.
3. Template: Free tier (dev) or Production.
4. Set master username/password and note the endpoint.
5. Enable **Public access** only for testing; use VPC security groups in production.
6. Security group: allow inbound **5432** from Amplify/App Runner subnets.

**Connection string:**

```
postgresql://USER:PASSWORD@your-rds-endpoint.region.rds.amazonaws.com:5432/monal?sslmode=require
```

Run schema + seed locally once (or from a bastion):

```bash
DATABASE_URL="your-rds-url" npm run db:push
DATABASE_URL="your-rds-url" npm run db:seed
```

---

## Step 2 — Frontend on AWS Amplify

1. **Amplify Console** → New app → Host web app → GitHub.
2. Select repo: `monual-resturent`.
3. **Root directory:** `frontend`
4. Amplify detects Next.js; it uses `amplify.yml` automatically.

### Environment variables (Amplify → App settings → Environment variables)

| Variable | Example |
|----------|---------|
| `DATABASE_URL` | RDS connection string |
| `NEXT_PUBLIC_API_URL` | `https://your-api.awsapprunner.com` |
| `API_SECRET_KEY` | Strong random secret |
| `OPENAI_API_KEY` | Optional — AI chat |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Optional — auth |
| `CLERK_SECRET_KEY` | Optional — auth |

5. Save and deploy. Amplify runs `prisma generate` + `next build`.

**Custom domain:** Amplify → Domain management → add your domain.

---

## Step 3 — Backend on AWS App Runner

1. Push backend Docker image to **Amazon ECR**:

```bash
aws ecr create-repository --repository-name monal-api
aws ecr get-login-password --region YOUR_REGION | docker login --username AWS --password-stdin ACCOUNT.dkr.ecr.YOUR_REGION.amazonaws.com

docker build -f backend/Dockerfile -t monal-api .
docker tag monal-api:latest ACCOUNT.dkr.ecr.YOUR_REGION.amazonaws.com/monal-api:latest
docker push ACCOUNT.dkr.ecr.YOUR_REGION.amazonaws.com/monal-api:latest
```

2. **App Runner** → Create service → Container registry → ECR image.
3. Port: **4000**
4. Environment variables:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Same RDS URL |
| `CORS_ORIGIN` | `https://your-amplify-domain.amplifyapp.com` |
| `API_SECRET_KEY` | Same as Amplify |
| `PORT` | `4000` |

5. Copy the App Runner URL → set as `NEXT_PUBLIC_API_URL` in Amplify → redeploy frontend.

---

## Step 4 — Alternative: ECS Fargate

Use `docker-compose.yml` as reference. Create:

- ECS cluster + Fargate task definitions for `frontend` and `backend`
- Application Load Balancer with two target groups (ports 3000 / 4000)
- RDS in same VPC

---

## Local Docker (test before AWS)

```bash
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:4000
- Postgres: localhost:5432

Initialize DB (first run):

```bash
docker compose exec frontend sh -c "npx prisma db push --schema=./prisma/schema.prisma"
```

---

## Cost tips

| Service | Dev estimate |
|---------|----------------|
| RDS db.t3.micro | ~$15/mo |
| Amplify | Free tier / ~$5+ |
| App Runner | ~$5–25/mo |
| **Total** | ~$25–50/mo |

Use **Lightsail** or a single **EC2 + Docker Compose** for cheaper dev setups.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Build fails on Prisma | Ensure `DATABASE_URL` is set in Amplify env |
| API 403 on reservations | Match `API_SECRET_KEY` on frontend + backend |
| CORS errors | Set `CORS_ORIGIN` to exact Amplify URL |
| Images missing | Commit files under `frontend/public/images/` |

---

© Monal Lahore — AWS deployment guide
