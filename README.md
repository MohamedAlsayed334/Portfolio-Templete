# Portfolio-Templete

A fully-featured **portfolio template** built with **Next.js (App Router)** and **Supabase** — complete with an **admin panel** so you can edit all your content directly from a dashboard (no code changes needed).

> Built with Next.js 16, React 19, Supabase, and CSS Modules.

---

## Features

### Public Portfolio
- **Hero** — Name, title, tagline
- **About** — Bio with image and paragraphs
- **Education** — Timeline-style education cards (image optional)
- **Experience** — Work experience timeline (image optional)
- **Skills** — Categorized skill tags
- **Projects** — Project cards with tech stack, features, and GitHub links
- **Contact** — Social links (WhatsApp, Email, GitHub, LinkedIn, Facebook)
- Scroll-triggered reveal animations
- Smooth scrolling navigation
- Responsive design (mobile + desktop)

### Admin Panel (`/admin`)
- Secure login with Supabase email/password auth
- Dashboard overview with content counts
- Edit **Hero, About, Education, Experience, Skills, Projects, Contact** via forms
- Tag input for skills, tech stacks, bullet lists
- Image URL fields
- Reorderable items (via `order_index`)

### Tech Stack
| Layer | Technology |
|-------|-----------|
| Framework | Next.js (App Router) |
| UI | React, CSS Modules |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (email/password) |
| Deployment | Vercel |

---

## Prerequisites

- **Node.js** 18+ (recommended: 20 LTS)
- A **Supabase** account (free tier works)
- **npm** (comes with Node.js)

---

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/MohamedAlsayed334/Portfolio-Templete.git
cd Portfolio-Templete
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to the **SQL Editor** and paste + run the contents of `src/data/schema.sql`
3. Go to **Authentication → Providers → Email** and enable email/password auth
4. Go to **Authentication → Users** and create an admin user (this will be your login)

### 4. Configure environment variables

```bash
cp  .env
```

Edit `.env` and fill in your Supabase credentials:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

You can find both values in **Supabase → Settings → API**.

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio.
Open [http://localhost:3000/admin](http://localhost:3000/admin) and log in with the admin user you created.

---

## Project Structure

```
Portfolio-Templete/
├── public/                    # Static assets (images, etc.)
├── src/
│   ├── app/
│   │   ├── admin/             # Admin panel pages
│   │   │   ├── login/         # Login page
│   │   │   ├── hero/          # Edit hero section
│   │   │   ├── about/         # Edit about section
│   │   │   ├── education/     # Edit education entries
│   │   │   ├── experience/    # Edit experience entries
│   │   │   ├── skills/        # Edit skill categories
│   │   │   ├── projects/      # Edit projects
│   │   │   ├── contact/       # Edit contact info
│   │   │   ├── layout.js      # Admin layout with sidebar
│   │   │   └── page.js        # Admin dashboard
│   │   ├── api/               # API routes
│   │   │   ├── admin/[table]/ # CRUD proxy to Supabase (authenticated)
│   │   │   ├── public/[table]/# Read-only proxy to Supabase (public)
│   │   │   └── auth/          # Login and session verification
│   │   ├── globals.css        # Global styles
│   │   ├── layout.js          # Root layout
│   │   └── page.js            # Home page (portfolio)
│   ├── components/            # React components
│   │   ├── ui/                # Reusable UI components (Button, Section, Icons)
│   │   ├── admin/             # Admin-specific components (TagInput)
│   │   ├── Hero.js
│   │   ├── About.js
│   │   ├── Education.js
│   │   ├── Experience.js
│   │   ├── Skills.js
│   │   ├── Projects.js
│   │   ├── Contact.js
│   │   ├── Navbar.js
│   │   ├── Footer.js
│   │   ├── ScrollReveal.js
│   │   └── ...
│   ├── data/                  # Fallback data & SQL schema
│   │   ├── content.js         # Fallback content (edit for defaults)
│   │   ├── projects.js        # Fallback projects
│   │   └── schema.sql         # Supabase table definitions
│   └── lib/
│       ├── api.js             # API client (auth, admin, public)
│       ├── content-context.js # React context for loading content
│       └── utils.js           # Utility functions
├── .env.example               # Environment variable template
├── .gitignore
├── package.json
└── next.config.mjs
```

---

## Customization Guide

### Content via Supabase (admin panel)

The easiest way: log into `/admin` and edit everything through the forms.

### Content via fallback files

If Supabase is not configured, the site falls back to data in `src/data/content.js` and `src/data/projects.js`. Edit these files to set default content.

### Styling

- **Global styles**: `src/app/globals.css`
- **Admin styles**: `src/app/admin/admin.css`
- **Component styles**: Each component has a co-located `.module.css` file (e.g., `Hero.module.css`)

### Layout

The portfolio sections are assembled in `src/app/page.js`. Add, remove, or reorder sections there.

### Images

Place your images in the `public/images/` directory and reference them as `/images/your-image.webp`.

> **Note**: Images in **Education** and **Experience** sections are optional. If you leave the image path empty, the image block is hidden and the content adjusts gracefully. If an image path is provided but broken, it silently hides without breaking the layout.

---

## Deployment

### Deploy to Vercel

1. Push the repo to GitHub
2. Import the project in [Vercel](https://vercel.com/new)
3. Add environment variables (`SUPABASE_URL`, `SUPABASE_ANON_KEY`)
4. Deploy — that's it!

The `vercel.json` is already configured for Next.js.

---

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SUPABASE_URL` | Your Supabase project URL | Yes |
| `SUPABASE_ANON_KEY` | Your Supabase anon/public key | Yes |

> **Note**: These are server-side only (no `NEXT_PUBLIC_` prefix). The anon key is safe to expose per Supabase docs since RLS policies protect your data.

---

## How It Works

### API Architecture

The app uses **API routes** as a proxy between the browser and Supabase:

```
Browser → Next.js API Route → Supabase REST API
```

- **Public routes** (`/api/public/[table]`) — read-only, use the anon key
- **Admin routes** (`/api/admin/[table]`) — authenticated, use the user's JWT token
- **Auth routes** (`/api/auth/login`, `/api/auth/me`) — authenticate with Supabase Auth

This approach keeps Supabase credentials server-side and allows proper auth validation.

### Content Loading

1. On page load, React fetches data from `/api/public/[table]`
2. If Supabase is configured and reachable, data comes from the database
3. If Supabase is unavailable (or not configured), the app falls back to local data files

### Admin Authentication

1. Admin logs in via email/password at `/admin/login`
2. Supabase returns `access_token` and `refresh_token`
3. Tokens are stored in `localStorage`
4. All admin API requests include the JWT in the `Authorization` header
5. The server verifies the token with Supabase Auth before proxying requests

---

## License

MIT — feel free to use this for personal or commercial projects.

---

## Contributing

Contributions are welcome! If you find a bug or have a feature request, open an issue or submit a PR.
