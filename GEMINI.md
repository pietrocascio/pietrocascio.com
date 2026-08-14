# pietrocascio.com - Project Context

## Project Overview
This is the personal engineering blog and portfolio for **Pietro Cascio**, a Senior Software Engineer and Pluralsight Author. The site is a high-performance static website focused on simplicity, semantic HTML, and zero client-side JavaScript for rendering.

### Core Technologies
- **Static Site Generator:** [Eleventy (11ty)](https://www.11ty.dev/) (v3.1.2)
- **Templating:** Nunjucks (`.njk`) for layouts and pages, Markdown (`.md`) for articles.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) via CDN (includes Typography plugin).
- **Font:** Inter (via Google Fonts).
- **Architecture:** Zero-framework, server-side generated static assets.

---

## Building and Running

### Development
To start the local development server with live reload:
```bash
npm start
```
This runs `npx @11ty/eleventy --serve`. By default, the site is available at `http://localhost:8080`.

### Production Build
To generate the static site for production:
```bash
npm run build
```
The output will be generated in the `_site/` directory.

---

## Project Structure
- `src/`: Root directory for all source content.
  - `_includes/`: Contains layouts (e.g., `base.njk`).
  - `articles/`: Markdown files for blog posts.
  - `articles.njk`: The main archive page listing all posts.
  - `css/`: Directory for CSS files.
  - `images/`: Static assets (favicons, profile pictures, logos).
- `.eleventy.js`: 11ty configuration file (handles passthrough copies for `src/images`).
- `package.json`: Node.js dependencies and scripts.
- `_site/`: The generated static site (excluded from version control).

---

## Development Conventions

### Content Creation
- **Articles:** Created as Markdown files in `src/articles/`. 
- **Front Matter:** Every article must include:
  ```yaml
  layout: base.njk
  title: "Your Title"
  description: "Brief summary"
  tags: post
  date: YYYY-MM-DD
  ```
- **Layouts:** Use `base.njk` as the primary layout. Content is injected into the `{{ content | safe }}` block.

### Styling
- **Tailwind CSS:** The site uses the Tailwind CDN in `base.njk`.
- **Customizations:** Tailwind configuration is extended in `base.njk` within a `<script>` tag (e.g., custom fonts).
- **Typography:** The Tailwind Typography plugin (`prose` classes) is used for rendering Markdown content.

### Deployment
- **CI/CD:** Automated via GitHub Actions (`.github/workflows/deploy.yml`).
- **Target:** Deployed to Namecheap (Apache) via FTP upon pushing to the `master` branch.
- **Performance:** Maintain the "Zero Client-Side JS" philosophy for content.
