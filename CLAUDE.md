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
  ├── index.njk              # Home page (lists 3 most recent articles)
  ├── articles.njk           # Articles Archive page (lists all articles)
  ├── topics.njk             # One page per topic (paginated over _data/topics.json)
  ├── _data/
  │   └── topics.json        # Allowed article topics (slug → name, description)
  ├── _includes/
  │   ├── base.njk           # Base layout template (used by all pages)
  │   └── post-card.njk      # Article card used by the archive and topic pages
  ├── articles/              # Article markdown files
  │   └── *.md               # Articles with front matter metadata
  ├── css/
  │   └── styles.css         # Custom CSS (minimal, Tailwind via CDN)
  └── images/                # Static images (favicon, profile, icons, etc.)

IDEAS.md                     # Idea storage, episode backlog, and article pitch templates
.eleventy.js                 # Eleventy config (copies images, custom filters)
.github/workflows/
  └── deploy.yml             # GitHub Actions CI/CD pipeline
```

## Content Architecture

### Articles
Articles are Markdown files in `src/articles/` with YAML front matter:

```markdown
---
layout: post.njk              # Must use post.njk
title: Article title in sentence case
description: Short description in sentence case (used in meta tags)
tags: [post, ai-agents]       # MUST include 'post'; add exactly one topic slug
date: YYYY-MM-DD              # Publication date
language: english             # 'english' or 'italian'
---

# Article content heading in sentence case
```

**Important:**
- **Casing Rule:** Always use **sentence case** for titles, headings, and front matter descriptions (never title case).
- Only articles tagged with `tags: post` are included in the `collections.post` collection.
- **Topics:** every article also carries one topic slug in `tags`. The allowed topics live in `src/_data/topics.json` (currently `ai-agents`, `code-quality`, `java`). Don't invent new slugs per article; add a topic to `topics.json` only when it will hold 2–3+ articles. Topics are subjects, not formats (a course-promo post about Java is tagged `java`).
- Each topic gets a page at `/topics/<slug>/` (`src/topics.njk`); the archive page lists all topics with counts.
- Article headers render topic links with `{% topicBadges tags %}` after the language badge. Article Markdown is pre-processed with **Liquid**, so use shortcodes there, not Nunjucks `set`/`include`.
- The **Home Page** (`index.njk`) displays only the **3 most recent posts**.
- The **Articles Page** (`articles.njk`) displays the **full archive**.
- The `base.njk` layout renders the article with Tailwind's prose classes.
- **Article Length Tiers:**
  - *Quick Code Fixes / Snippets:* 400–800 words
  - *Standard Feature Explanations / Essays:* 1,000–1,500 words
  - *Tutorials and How-To Guides:* 1,500–2,500 words
  - *Deep Dives / Pillar Architecture Guides:* 3,000+ words

### LinkedIn Content Guidelines
- **Ideal Length:** 1,300–2,000 characters (200–350 words). Absolute maximum: 3,000 characters.
- **The Hook (First 150–200 characters):** Must immediately state the core technical problem or bold takeaway before the "See more..." fold.
- **Structure & Formatting:** 1–2 sentence paragraphs, generous white space, front-loaded technical insights/data, ending with a link to the article.
- **Hashtags:** End every post with 3–5 hashtags on their own line, after the link and closing line. Mix broad (#SoftwareEngineering), topic (#AIAgents) and specific (#Java) tags, in PascalCase. A series keeps a fixed core set so its posts are found together (see the series' `SERIES.md`); add 1–2 post-specific tags on top. Course-promo posts follow the Pluralsight mix instead, including #Pluralsight.

### Templating
- Base layout (`src/_includes/base.njk`) is used by all pages.
- Nunjucks templating syntax: `{{ variable }}`, `{% for ... %}`.
- Custom filters: `dateDisplay` (formats dates using Intl.DateTimeFormat).
- Tailwind CSS classes applied directly in templates (via CDN).

### Styling
- Tailwind CSS loaded from CDN in `base.njk` with typography plugin.
- Inter font family from Google Fonts.
- No build step for CSS (all client-side).
- Custom styles in `styles.css` override or extend Tailwind as needed.

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
- **Collections:** Articles are automatically collected with tag `post`
- **Custom Filters:** 
  - `dateDisplay`: Formats Date objects to "Month Day, Year" (e.g., January 1, 2026).
- **Shortcodes:**
  - `topicBadges`: Renders a link badge for each tag that is a known topic.

## GitHub Actions Secrets

Required for deployment (set in repository settings):
- `FTP_SERVER` - Namecheap FTP host
- `FTP_USERNAME` - FTP username
- `FTP_PASSWORD` - FTP password

Do not commit these values.

## Agent skills

### Issue tracker

GitHub issues via `gh` CLI. See `docs/agents/issue-tracker.md`.

### Domain docs

Single-context repository. See `docs/agents/domain.md`.

