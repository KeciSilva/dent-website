/* ====================================================================
 * Generates sitemap.xml from siteConfig (single source of truth).
 * Writes to dist/ after build (postbuild) and to public/ so dev/preview
 * also serve it. Single-page site → one <url> entry.
 *
 * Run: node scripts/generate-sitemap.mjs
 * ==================================================================== */
import { writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { siteConfig } from '../src/seo/siteConfig.js'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const lastmod = new Date().toISOString().slice(0, 10) // YYYY-MM-DD (build date)

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteConfig.siteUrl}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`

for (const dir of ['public', 'dist']) {
  const target = resolve(root, dir)
  if (dir === 'public' || existsSync(target)) {
    mkdirSync(target, { recursive: true })
    writeFileSync(resolve(target, 'sitemap.xml'), xml)
    console.log(`✓ ${dir}/sitemap.xml (lastmod ${lastmod})`)
  }
}
