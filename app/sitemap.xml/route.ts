import { allIndexablePaths } from '@/components/i18n/seo'
import { locales, siteConfig } from '@/lib/site-config'

export function GET() {
  const now = new Date().toISOString()
  const urls = locales.flatMap((locale) =>
    allIndexablePaths().map((path) => {
      const loc = `${siteConfig.url}/${locale}${path}`
      const alternates = locales
        .map((alt) => `<xhtml:link rel="alternate" hreflang="${alt}" href="${siteConfig.url}/${alt}${path}" />`)
        .join('\n')

      return `<url>
<loc>${loc}</loc>
${alternates}
<xhtml:link rel="alternate" hreflang="x-default" href="${siteConfig.url}/sq${path}" />
<lastmod>${now}</lastmod>
<changefreq>${path.includes('/blog/') ? 'yearly' : 'monthly'}</changefreq>
<priority>${path === '' ? '1.0' : path.includes('/services/') ? '0.9' : '0.7'}</priority>
</url>`
    }),
  )

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  })
}
