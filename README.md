# Oracle Club KAU — Official Website

The official website for Oracle Student Club at King Abdulaziz University, Jeddah.

A full-stack web platform built with Next.js, PostgreSQL, and a custom admin dashboard for managing all website content dynamically.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + Vanilla CSS |
| Animations | Framer Motion |
| Database | PostgreSQL (via Docker) |
| ORM | Prisma |
| Auth | JWT (jsonwebtoken) + HTTP-Only Cookies |
| Email | Resend SDK |
| Spam Protection | Cloudflare Turnstile |
| Uploads | Local filesystem (`public/uploads/`) |

---

## Pages

| Route | Description |
|---|---|
| `/` | Homepage — hero, stats, upcoming event card |
| `/about` | About the club — mission, values, binary matrix background |
| `/members` | Club members by department, with social links |
| `/projects` | Project portfolio with detailed specs panel |
| `/achievements` | Timeline of club milestones and awards |
| `/sponsors` | Partner organizations + contact/partnership form |
| `/join` | Membership info, open roles, team contact |
| `/admin` | Password-protected dashboard (CRUD for all content) |
| `/admin/login` | Admin login page |

---

## Local Development Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) — required for the PostgreSQL database

### 1. Clone the repository

```bash
git clone https://github.com/OracleKau/website
cd oracle-club-website
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create your `.env` file

The `.env` file is **not committed to Git** (it contains secrets). Create one in the project root by copying this template:

```env
# PostgreSQL connection — matches the Docker container below
DATABASE_URL="postgresql://postgres:postgrespassword@localhost:5432/oracle_db?schema=public"

# Admin dashboard credentials
ADMIN_EMAIL="admin@oracle.sa"
ADMIN_PASSWORD="admin"
JWT_SECRET="oracle-club-website-secret-key-change-me-in-production-12345"

# Email notifications (Resend) — leave as-is for local dev, set real key in production
RESEND_API_KEY="re_123456789"
NOTIFICATION_RECEIVER_EMAIL="sponsors@oracle-kau.sa"

# Cloudflare Turnstile — these are Cloudflare's always-pass test keys, safe for local dev
NEXT_PUBLIC_TURNSTILE_SITE_KEY="1x00000000000000000000AA"
TURNSTILE_SECRET_KEY="1x00000000000000000000000000000000"

# Controls the "Join Us" CTA and registration form visibility
# Set to "true" to open applications, "false" to hide them
NEXT_PUBLIC_REGISTRATION_OPEN="false"
```

### 4. Start the database

```bash
docker compose up -d
```

This starts a PostgreSQL container on port `5432`. Docker Desktop must be running.

### 5. Set up the database schema and seed data

```bash
npx prisma db push
node prisma/seed.js
```

- `db push` creates all the tables from `prisma/schema.prisma`
- `seed.js` populates the database with initial members, projects, achievements, sponsors, and a sample event

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Admin Dashboard

Go to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

Default credentials (from your `.env`):
- **Email:** `admin@oracle.sa`
- **Password:** `admin`

From the dashboard you can manage: Members, Projects, Achievements, Sponsors, Events, and Partnership Requests.

---

## Project Structure

```
oracle-club-website/
├── app/
│   ├── page.tsx              # Homepage
│   ├── layout.tsx            # Root layout (fonts, SEO, metadata)
│   ├── globals.css           # Global styles + background themes
│   ├── about/                # About page
│   ├── members/              # Members page
│   ├── projects/             # Projects page
│   ├── achievements/         # Achievements page
│   ├── sponsors/             # Sponsors + contact form
│   ├── join/                 # Join / membership page
│   ├── admin/                # Admin dashboard + login
│   ├── components/
│   │   ├── Navbar.tsx        # Global navigation bar
│   │   └── EventDetailsModal.tsx  # Reusable event modal
│   ├── api/                  # API routes (REST)
│   │   ├── auth/             # Login, logout, session
│   │   ├── members/          # Members CRUD
│   │   ├── projects/         # Projects CRUD
│   │   ├── achievements/     # Achievements CRUD
│   │   ├── sponsors/         # Sponsors CRUD
│   │   ├── events/           # Events CRUD + upcoming
│   │   ├── contacts/         # Partnership submissions
│   │   ├── submit-contact/   # Public contact form endpoint
│   │   └── upload/           # Image upload endpoint
│   └── lib/
│       ├── db.ts             # Prisma client singleton
│       └── auth.ts           # JWT session verification
├── prisma/
│   ├── schema.prisma         # Database models
│   └── seed.js               # Initial data seed script
├── public/                   # Static assets (logos, images, fonts)
├── docker-compose.yml        # PostgreSQL container config
└── .env                      # Environment variables (not committed)
```

---

## Git Rules

- **Never commit** `.env` — it contains secrets
- **Never commit** `node_modules/` or `.next/`
- Test locally before pushing
- Keep design consistent across pages
- Ask before editing shared components (`Navbar.tsx`, `EventDetailsModal.tsx`, `globals.css`, `layout.tsx`)
- Use only real club information — no placeholder stats or fake sponsors

---

## Production Deployment Notes

Before deploying to production:
1. Change `ADMIN_PASSWORD` to a strong password
2. Replace `JWT_SECRET` with a securely generated random string
3. Set `RESEND_API_KEY` to a real Resend API key
4. Point `DATABASE_URL` to your hosted PostgreSQL instance
5. Set `NEXT_PUBLIC_REGISTRATION_OPEN` to `"true"` when applications open
