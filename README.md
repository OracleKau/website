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

You need two things installed on your machine before you can run this project:

#### 1. Node.js (v18 or higher)
Node.js is the JavaScript runtime that runs the Next.js development server and all tooling (`npm`, `npx`).

- Download from: https://nodejs.org/ — choose the **LTS** version
- After installing, verify it works by opening a terminal and running:
  ```bash
  node -v
  npm -v
  ```
  Both should print a version number.

#### 2. Docker Desktop
Docker is used to run the PostgreSQL database locally inside a container, so you don't need to install PostgreSQL manually on your machine.

- Download from: https://www.docker.com/products/docker-desktop/
- Install it and **open Docker Desktop** — you should see it running in your taskbar/system tray
- **Important:** Docker Desktop must be open and running every time you work on this project, before you run `docker compose up -d`
- Verify Docker is running:
  ```bash
  docker -v
  ```
  Should print a version number. If it says "command not found", Docker is not installed or not running.

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

Make sure **Docker Desktop is open and running** first (check your taskbar — you should see the Docker whale icon).

Then run:

```bash
docker compose up -d
```

This downloads and starts a PostgreSQL database container in the background on port `5432`. You only need to do this once — Docker remembers the container and you can restart it anytime with the same command.

To stop the database when you're done working:
```bash
docker compose down
```

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
│   │   ├── stats/            # Database statistics endpoint
│   │   └── upload/           # Image upload endpoint
│   └── lib/
│       ├── db.ts             # Prisma client singleton
│       └── auth.ts           # JWT session verification
├── prisma/
│   ├── schema.prisma         # Database models
│   └── seed.js               # Initial data seed script
├── public/                   # Static assets (logos, images, fonts)
├── docker-compose.yml        # PostgreSQL container config
├── .env.example              # Environment variables template
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

## Production Deployment Guide

Follow these steps to deploy the application to production:

### 1. Database Provisioning (PostgreSQL)
Provision a production-ready PostgreSQL instance on a cloud provider like **Supabase** or **Neon.tech**.
- Set up a new database instance.
- Copy the transaction-connection string (for Neon or Supabase, usually looks like: `postgresql://username:password@host/database`).

### 2. Push Database Schema & Seed Initial Data
Before building the app, push the schema tables and seed the database with the initial club information:
1. Temporarily edit your local `.env` database URL:
   ```env
   DATABASE_URL="your-production-database-connection-string"
   ```
2. Run the database push command to create all tables:
   ```bash
   npx prisma db push
   ```
3. Seed the initial club members, departments, achievements, and projects:
   ```bash
   node prisma/seed.js
   ```
4. Restore your local `.env` database URL back to `localhost` to avoid accidental overrides.

### 3. Deploy App Server (Next.js via Vercel)
Deploying on **Vercel** is recommended for Next.js applications:
1. Import the project repository to Vercel.
2. In the project **Settings > Environment Variables**, configure the production variables (refer to `.env.example` in the root folder):
   - `DATABASE_URL`: The production database connection string.
   - `ADMIN_EMAIL`: The login email for the back-office admin dashboard.
   - `ADMIN_PASSWORD`: A secure, strong password for the admin login.
   - `JWT_SECRET`: A long, randomly generated secure string for session security.
   - `RESEND_API_KEY`: API Key from [Resend.com](https://resend.com) for partnership contact emails.
   - `NOTIFICATION_RECEIVER_EMAIL`: The email address where form submissions should be routed.
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY` & `TURNSTILE_SECRET_KEY`: Keys from Cloudflare Turnstile dashboard.
   - `NEXT_PUBLIC_REGISTRATION_OPEN`: Set to `true` when recruitment cycles are open, or `false` to redirect `/join` to home.
3. Click **Deploy**. Vercel will build the application, optimize pages, and launch the site.

