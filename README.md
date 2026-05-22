# Monal Lahore — Final Production Website

Luxury AI-powered restaurant platform with **local images** (no broken links), dark gold UI, and full menu/chef name matching.

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

## Images (Important)

All food & chef photos are stored locally:

```
frontend/public/images/
├── menu/          ← mutton-karahi.jpg, chicken-handi.jpg, etc.
├── chefs/         ← ali-raza.jpg, maria-santos.jpg, li-wei.jpg
├── gallery/
└── hero/
```

**Dish name → image file** mapping is in `frontend/src/lib/images.ts`.  
To replace a photo: swap the JPG with the **same filename**.

| Menu Item | File |
|-----------|------|
| Mutton Karahi | `menu/mutton-karahi.jpg` |
| Chicken Handi | `menu/chicken-handi.jpg` |
| Seekh Kebab Platter | `menu/seekh-kebab-platter.jpg` |
| Beef Bihari Boti | `menu/beef-bihari-boti.jpg` |
| Dragon Chicken | `menu/dragon-chicken.jpg` |
| Szechuan Noodles | `menu/szechuan-noodles.jpg` |
| Grilled Atlantic Salmon | `menu/grilled-salmon.jpg` |
| Beef Tenderloin Steak | `menu/beef-steak.jpg` |
| Gulab Jamun Trio | `menu/gulab-jamun.jpg` |
| Chocolate Lava Cake | `menu/chocolate-lava-cake.jpg` |
| Fresh Mint Margarita | `menu/mint-margarita.jpg` |
| Karak Chai | `menu/karak-chai.jpg` |

## Pages

| URL | Description |
|-----|-------------|
| `/` | Hero, popular dishes, reviews, gallery, CTA |
| `/about` | Story + chefs with photos |
| `/menu` | Full menu, search, cart, AI recommend |
| `/reservations` | Booking form |
| `/events` | Private dining |
| `/gallery` | Photo gallery |
| `/contact` | Map + form |
| `/qr-menu` | Mobile QR menu |
| `/admin` | Dashboard |

## Deploy

- **Vercel:** Root directory = `frontend`
- **Railway:** Root directory = `backend`
- Commit `public/images/` — images are bundled with the app

---

© Monal Lahore — Luxury rooftop dining above Lahore.
