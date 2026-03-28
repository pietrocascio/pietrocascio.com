# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**pietrocascio.com** is a personal engineering blog and portfolio built with Eleventy (11ty), a zero-config static site generator. The site features technical articles and is deployed via GitHub Actions to Namecheap hosting.

### Stack
- **Generator:** Eleventy (11ty) v3.1.2
- **Templating:** Nunjucks (.njk)
- **Styling:** Tailwind CSS (loaded from CDN)
- **Hosting:** Namecheap / Apache
- **CI/CD:** GitHub Actions → FTP Deploy

### Philosophy
- Zero client-side JavaScript for content rendering
- Semantic HTML5 only
- Simple, performant static site

## Common Commands

```bash
# Start development server with live reload
npm start

# Build the static site to _site/
npm run build
```

**Notes:**
- Development server watches `src/` directory and rebuilds on changes
- Output is generated in `_site/` directory (do not edit directly)
- Deployment is automatic on push to `master` via GitHub Actions workflow

## Project Structure

```
src/
  ├── index.njk              # Home page (lists articles)
  ├── _includes/
  │   └── base.njk           # Base layout template (used by all pages)
  ├── articles/              # Article markdown files
  │   └── *.md               # Articles with front matter metadata
  ├── css/
  │   └── styles.css         # Custom CSS (minimal, Tailwind via CDN)
  └── images/                # Static images (favicon, profile, icons, etc.)

.eleventy.js                 # Eleventy config (copies images, sets input/output dirs)
.github/workflows/
  └── deploy.yml             # GitHub Actions CI/CD pipeline
```

## Content Architecture

### Articles
Articles are Markdown files in `src/articles/` with YAML front matter:

```markdown
---
layout: base.njk              # Must use base.njk
title: Article Title
description: Short description (used in meta tags)
tags: post                    # MUST be 'post' for articles to appear
date: YYYY-MM-DD              # Publication date
---

# Article content in Markdown
```

**Important:**
- Only articles tagged with `tags: post` are included in the home page collection (`collections.post`)
- The `base.njk` layout renders the article with Tailwind's prose classes

### Templating
- Base layout (`src/_includes/base.njk`) is used by all pages
- Nunjucks templating syntax: `{{ variable }}`, `{% for ... %}`
- Tailwind CSS classes applied directly in templates (via CDN)
- Custom CSS in `src/css/styles.css` is minimal

### Styling
- Tailwind CSS loaded from CDN in `base.njk` with typography plugin
- Inter font family from Google Fonts
- No build step for CSS (all client-side)
- Custom styles in `styles.css` override or extend Tailwind as needed

## Deployment Pipeline

Defined in `.github/workflows/deploy.yml`:

1. **Trigger:** Push to `master` branch
2. **Build:** Node.js 20, `npm install`, `npm run build`
3. **Deploy:** FTP sync of `_site/` to Namecheap server
4. **Note:** `dangerous-clean-slate: true` removes old files on server during sync

To deploy: push to `master` branch. GitHub Actions handles the rest.

## Development Tips

**Adding an Article:**
1. Create new `.md` file in `src/articles/`
2. Add front matter with `tags: post` (required for listing)
3. Write content in Markdown
4. Commit and push to `master` to deploy

**Styling:**
- Most styling uses Tailwind utility classes directly in `.njk` templates
- Prose classes from Tailwind typography plugin are used for article content
- Extend Tailwind in `base.njk` via inline script (custom theme config)

**Testing:** No test suite currently configured.

## Eleventy Configuration Notes

- **Input:** `src/`
- **Output:** `_site/`
- **Pass-through copy:** Images are copied as-is to output
- Collections: Articles are automatically collected with tag `post`
- No custom filters or shortcodes currently defined

## GitHub Actions Secrets

Required for deployment (set in repository settings):
- `FTP_SERVER` - Namecheap FTP host
- `FTP_USERNAME` - FTP username
- `FTP_PASSWORD` - FTP password

Do not commit these values.
