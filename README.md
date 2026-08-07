# Payoshnee Joshi Portfolio

A custom portfolio for Payoshnee Joshi, focused on cloud engineering, AI/ML, projects, skills, achievements, certifications, experience, blogs, and placement-ready presentation.

This project is a custom portfolio application with a CMS-style admin dashboard, animated hero section, rocket-stage navigation, project popups, skill filters, SEO settings, and editable content stored in Supabase for production.

## Features

- Animated space-themed portfolio homepage
- CMS-backed hero content and animated hero skill icons
- Skills section with icon hover mode and optional graph mode
- Project cards with cover images, highlights, source links, deployment links, and detailed popups
- Project tech-stack usage graph
- Certifications, experience, achievements, blogs, contact, footer, and social media sections
- Rocket-stage navbar with completed-section highlighting
- SEO metadata controlled from CMS content
- Admin dashboard for editing content from the browser
- Image upload API for icons, project covers, favicon, and SEO images

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- React Icons
- Three.js and React Three Fiber
- Supabase database and storage CMS backend

## Admin Dashboard

Open the admin panel at:

```bash
http://localhost:3000/admin
```

Default local password:

```bash
portfolio-admin
```

For production, set:

```bash
ADMIN_PASSWORD=your-secure-password
```

In production, CMS content is saved in Supabase. Locally, if Supabase env vars are missing, the app falls back to:

```bash
data/cms.json
```

In production, uploaded files are saved in Supabase Storage. Local fallback uploads are saved in:

```bash
public/uploads
```

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Run checks:

```bash
npm run lint
npm run build
```

## Supabase Setup

Create a Supabase project, then run the SQL in:

```bash
supabase/schema.sql
```

Set these environment variables in Vercel:

```bash
SUPABASE_URL=your-project-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_CMS_TABLE=cms_content
SUPABASE_UPLOAD_BUCKET=portfolio-uploads
ADMIN_PASSWORD=your-secure-password
```

Keep `SUPABASE_SERVICE_ROLE_KEY` secret. Do not expose it in client-side code.

## Deployment

Deploy the repo to Vercel. The app includes a Vercel cron that calls `/api/keep-alive` every 6 hours to touch the app and CMS database.

Supabase free data remains stored even if the database pauses. The keep-alive route helps reduce inactivity, but provider free-plan limits can still apply.

## Content Ownership

All visible portfolio content is managed for Payoshnee Joshi through the CMS data and admin dashboard. Update real project URLs, social links, email address, deployment links, and credentials from `/admin` before publishing.
