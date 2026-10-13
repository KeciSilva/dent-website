import type { MetadataRoute } from 'next'
import { allowIndexing, siteConfig } from '@/lib/site-config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: allowIndexing ? { userAgent: '*', allow: '/' } : { userAgent: '*', disallow: '/' },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
