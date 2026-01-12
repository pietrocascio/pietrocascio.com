# pietrocascio.com

The personal engineering blog and portfolio for Pietro Cascio.

## 🏗 Architecture
- **Generator:** [Eleventy (11ty)](https://www.11ty.dev/) - Zero-config, high-performance static site generator.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework.
- **Hosting:** Namecheap (Apache).
- **CI/CD:** GitHub Actions -> FTP Deploy.

## 🚀 Deployment Strategy
The site uses a Continuous Deployment pipeline defined in `.github/workflows/deploy.yml`.
1.  **Push** to `master`.
2.  **GitHub Actions** installs dependencies and builds the static assets.
3.  **FTP Action** syncs the `_site` output folder to the production server.

## ⚡ Performance
- **Zero Client-Side JavaScript** (for content rendering).
- **Semantic HTML5**.
