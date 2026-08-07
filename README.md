# Space Portfolio

A modern space-themed portfolio built with Next.js, React, TypeScript, Tailwind CSS, Three.js, Framer Motion, and React Icons.

This version includes a reusable CMS-style admin dashboard so portfolio owners can manage hero content, skills, certifications, experience, achievements, blogs, projects, contact details, social links, footer data, uploads, and SEO metadata without editing component code.

## Features

- Animated space-themed homepage
- CMS-backed hero content and animated hero skill icons
- Rocket-stage navigation that highlights completed sections
- Skills section with icon hover mode, graph mode, and category filters
- Project cards with cover images, highlights, source links, deployment links, and detailed popups
- Project tech-stack usage graph
- Certifications, experience, achievements, blogs, contact, custom sections, and footer
- Admin dashboard at `/admin`
- API routes for CMS reads/writes and uploads
- Supabase database support for persistent CMS data
- Supabase Storage support for persistent uploaded assets
- Local JSON fallback for development
- Vercel cron keep-alive endpoint
- SEO metadata generated from CMS content

## Demo Content

The included CMS seed uses a fictional profile named **Alex Carter**. Replace it from `/admin` or by editing `data/cms.json`.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Three.js and React Three Fiber
- React Icons
- Supabase

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
http://localhost:3000/admin
```

Default local admin password:

```bash
portfolio-admin
```

Set `ADMIN_PASSWORD` in production.

## CMS Storage

Without Supabase environment variables, the app reads and writes local CMS data at:

```bash
data/cms.json
```

With Supabase configured, CMS data is stored in the `cms_content` table and uploads are stored in the `portfolio-uploads` bucket.

## Supabase Setup

Run the SQL in:

```bash
supabase/schema.sql
```

Then set:

```bash
ADMIN_PASSWORD=your-secure-password
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_CMS_TABLE=cms_content
SUPABASE_UPLOAD_BUCKET=portfolio-uploads
```

Keep `SUPABASE_SERVICE_ROLE_KEY` server-only.

## Vercel

The app can be deployed to Vercel. The included `vercel.json` schedules `/api/keep-alive` once per day, which is compatible with Vercel Hobby accounts.

## Checks

```bash
npm run lint
npm run build
```

## Contributing

Issues and pull requests are welcome. When contributing, keep demo content generic and avoid committing personal credentials or private links.
