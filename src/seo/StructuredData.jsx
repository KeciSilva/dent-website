import { buildJsonLd } from './siteConfig'

/**
 * Emits the site's JSON-LD structured data as a single <script> tag.
 * Renders nothing visible. Mount once near the top of <App/>.
 *
 * Googlebot renders JS, so this is read on crawl; the build-time prerender
 * (scripts/prerender.mjs) also bakes this script into the static dist/index.html
 * so non-JS crawlers see it too.
 */
export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      // Structured data is trusted, build-time-derived JSON — safe to inject.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }}
    />
  )
}
