# Payoshnee Joshi Portfolio

A custom portfolio for Payoshnee Joshi, focused on cloud engineering, AI/ML, projects, skills, achievements, certifications, experience, blogs, and placement-ready presentation.

This project is a custom portfolio application with a CMS-style admin dashboard, animated hero section, rocket-stage navigation, project popups, skill filters, SEO settings, and editable content stored in local JSON.

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
- Local JSON CMS backend

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

The CMS content is saved in:

```bash
data/cms.json
```

Uploaded files are saved in:

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

## Deployment

This app uses API routes and local JSON file writes for the admin CMS. It works best on a server where the filesystem can persist changes, such as a VPS or Render.

For Vercel, the public portfolio can run, but local JSON writes are not reliable long-term on serverless storage. Use an external database or storage provider before treating the admin panel as production content management on Vercel.

## Content Ownership

All visible portfolio content is managed for Payoshnee Joshi through the CMS data and admin dashboard. Update real project URLs, social links, email address, deployment links, and credentials from `/admin` before publishing.
