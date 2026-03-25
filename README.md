# Booksfera

Premium, mobile-first static site for book analysis. HTML, CSS, and minimal JavaScript—no framework runtime.

## Requirements

- [Node.js](https://nodejs.org/) 18+

## Development

Open the source files directly in a browser (paths like `/favicon.svg` need a local server), or edit and run a production build:

```bash
npm run build
npm run preview
```

Then visit `http://localhost:8080`.

## Production build

```bash
npm run build
```

Output is written to **`dist/`**. Deploy **only** the contents of `dist/` (not the repo root).

### Cloudflare Pages

| Setting | Value |
|--------|--------|
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | `/` (repository root) |

Cloudflare sets **`CF_PAGES_URL`** during the build. The build script uses it (or **`SITE_URL`**) to fill canonical links, `og:url`, `og:image`, and `sitemap.xml`.

To test absolute URLs locally:

```bash
# PowerShell
$env:SITE_URL="https://your-project.pages.dev"; npm run build

# Unix
SITE_URL=https://your-project.pages.dev npm run build
```

Optional: add **`SITE_URL`** in the Cloudflare Pages project **Environment variables** if you need a fixed production domain (e.g. custom domain) instead of the default `*.pages.dev` URL.

### GitHub

Push the repository to GitHub, connect the repo to Cloudflare Pages, and use the same build settings as above.

## Project layout

| Path | Role |
|------|------|
| `index.html`, `book.html`, `reader.html` | Page templates (source) |
| `css/` | Stylesheets (`main.css` imports the rest) |
| `js/app.js` | Scroll reveals, book section nav |
| `public/` | Static assets copied into `dist/` (`favicon.svg`, `og-default.svg`) |
| `scripts/build.mjs` | Copies assets into `dist/` and injects SEO URLs |
| `dist/` | **Build output** (gitignored)—deploy this folder |

## SEO

- Per-page `<title>`, `meta name="description"`, Open Graph, and Twitter tags in the HTML sources.
- Build injects **canonical**, **og:url**, and absolute **og:image** when `CF_PAGES_URL` or `SITE_URL` is set.
- **`robots.txt`** is generated in `dist/`; **`sitemap.xml`** is generated when a site URL is available at build time.

Replace placeholder contact emails in the footer (`hello@booksfera.com`) with your own.

## License

Proprietary — Booksfera.
