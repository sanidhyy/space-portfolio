# CMS Guide

This portfolio uses a browser admin dashboard with Supabase storage in production and local JSON fallback in development.

## Access

Start the app:

```bash
npm run dev
```

Open:

```bash
http://localhost:3000/admin
```

Default local password:

```bash
portfolio-admin
```

Set `ADMIN_PASSWORD` in production.

## Editable Areas

- Hero text, CTA, and animated icons
- Skills, descriptions, levels, project mapping, and icon uploads
- Certifications
- Experience
- Achievements
- Blogs
- Projects, cover images, highlights, deployment links, and source links
- Contact details
- SEO title, description, favicon, and social image
- Social links and footer content

## Storage

With Supabase env vars configured, content is saved to the `cms_content` table and uploads are saved to the `portfolio-uploads` storage bucket.

Without Supabase env vars, content falls back to:

```bash
data/cms.json
```

Local fallback uploads are saved to:

```bash
public/uploads
```

Use the admin dashboard for content changes. Edit `data/cms.json` directly only when doing careful manual maintenance.

## Supabase Setup

Run this SQL in the Supabase SQL editor:

```bash
supabase/schema.sql
```

Then set these environment variables on Vercel:

```bash
SUPABASE_URL=your-project-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_CMS_TABLE=cms_content
SUPABASE_UPLOAD_BUCKET=portfolio-uploads
ADMIN_PASSWORD=your-secure-password
```
