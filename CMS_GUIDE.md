# CMS Guide

This portfolio uses a small local JSON CMS with a browser admin dashboard.

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

Content is saved to:

```bash
data/cms.json
```

Uploads are saved to:

```bash
public/uploads
```

Use the admin dashboard for content changes. Edit `data/cms.json` directly only when doing careful manual maintenance.
