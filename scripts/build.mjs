/**
 * Production build: copies static assets into dist/ and injects SEO URLs.
 * Cloudflare Pages sets CF_PAGES_URL during build; override with SITE_URL if needed.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const dist = path.join(root, "dist");

const siteUrl = (process.env.CF_PAGES_URL || process.env.SITE_URL || "")
  .trim()
  .replace(/\/$/, "");

const pages = {
  "index.html": { path: "/" },
  "samolubny-gen.html": { path: "/samolubny-gen.html" },
  "book.html": { path: "/book.html" },
  "reader.html": { path: "/reader.html" },
};

function absoluteUrl(pathSuffix) {
  if (!siteUrl) return "";
  if (pathSuffix === "/") return `${siteUrl}/`;
  return `${siteUrl}${pathSuffix}`;
}

function processHtml(html, filename) {
  const cfg = pages[filename];
  const ogImage = siteUrl ? `${siteUrl}/og-default.svg` : "/og-default.svg";

  html = html.replace(/__OG_IMAGE__/g, ogImage);

  if (siteUrl) {
    const canonical = absoluteUrl(cfg.path);
    const ogUrl = canonical;
    html = html.replace(/__CANONICAL__/g, canonical);
    html = html.replace(/__OG_URL__/g, ogUrl);
  } else {
    // Remove lines only; do not use \s* after /> or it eats indentation before the next tag.
    html = html.replace(/\r?\n[ \t]*<link rel="canonical" href="__CANONICAL__" \/>/g, "");
    html = html.replace(/\r?\n[ \t]*<meta property="og:url" content="__OG_URL__" \/>/g, "");
  }
  return html;
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const name of fs.readdirSync(src)) {
    const from = path.join(src, name);
    const to = path.join(dest, name);
    const stat = fs.statSync(from);
    if (stat.isDirectory()) copyDir(from, to);
    else fs.copyFileSync(from, to);
  }
}

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

for (const file of Object.keys(pages)) {
  const raw = fs.readFileSync(path.join(root, file), "utf8");
  fs.writeFileSync(path.join(dist, file), processHtml(raw, file), "utf8");
}

copyDir(path.join(root, "css"), path.join(dist, "css"));
copyDir(path.join(root, "js"), path.join(dist, "js"));
copyDir(path.join(root, "public"), path.join(dist));

const robots = [
  "User-agent: *",
  "Allow: /",
  siteUrl ? "" : "",
  siteUrl ? `Sitemap: ${siteUrl}/sitemap.xml` : "",
]
  .filter(Boolean)
  .join("\n");

fs.writeFileSync(path.join(dist, "robots.txt"), robots + "\n", "utf8");

if (siteUrl) {
  const locs = ["/", "/samolubny-gen.html", "/book.html", "/reader.html"];
  const body = locs
    .map((p) => {
      const loc = absoluteUrl(p);
      return `  <url><loc>${escapeXml(loc)}</loc></url>`;
    })
    .join("\n");
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
  fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap, "utf8");
}

function escapeXml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
}

console.log("Build complete → dist/");
if (!siteUrl) {
  console.log(
    "Note: Set SITE_URL (or deploy on Cloudflare Pages to use CF_PAGES_URL) for absolute canonical, og:url, and sitemap."
  );
}
