# Monal Lahore — Final Production Website

Luxury AI-powered restaurant platform with **local images**, **light & dark themes**, dark-gold UI, and full menu/chef name matching.

## Quick Start

```bash
# 1. Install
cd frontend && npm install
cd ../backend && npm install
cd .. && npm install

# 2. Environment — copy .env.example to .env and frontend/.env.local

# 3. Database
npm run db:push
npm run db:seed

# 4. Run
cd backend && npm run dev    # http://localhost:4000
cd frontend && npm run dev   # http://localhost:3000
```

## Theme

- **Dark mode** (default): luxury black + gold
- **Light mode**: warm cream + gold — toggle via Sun/Moon icon in header
- Preference saved in `localStorage` (`monal-theme`)

## Docker (local full stack)

```bash
docker compose up --build
# Frontend http://localhost:3000 | API http://localhost:4000
```

## Deploy

### AWS (recommended)

| Component | Service | Root / path |
|-----------|---------|-------------|
| Frontend + Next.js API | **AWS Amplify** | `frontend/` |
| Express backend | **AWS App Runner** or ECS | `backend/Dockerfile` |
| Database | **Amazon RDS PostgreSQL** | — |

Full guide: **[aws/DEPLOY.md](./aws/DEPLOY.md)**

### Vercel (alternative)

- Root directory = `frontend`
- Set `DATABASE_URL`, `NEXT_PUBLIC_API_URL`, `API_SECRET_KEY`

## Images

All food & chef photos are stored locally under `frontend/public/images/`.  
Mapping is in `frontend/src/lib/images.ts`.

## Pages

| URL | Description |
|-----|-------------|
| `/` | Hero, popular dishes, reviews, gallery, CTA |
| `/about` | Story + chefs |
| `/menu` | Full menu, search, cart, AI recommend |
| `/reservations` | Booking form |
| `/events` | Private dining |
| `/gallery` | Photo gallery |
| `/contact` | Map + form |
| `/qr-menu` | Mobile QR menu |
| `/admin` | Dashboard |

---

© Monal Lahore — Luxury rooftop dining above Lahore.
