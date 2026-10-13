import type { MetadataRoute } from 'next'
import { allIndexablePaths } from '@/components/i18n/seo'
import { locales, siteConfig } from '@/lib/site-config'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return locales.flatMap((locale) =>
    allIndexablePaths().map((path) => ({
      url: `${siteConfig.url}/${locale}${path}`,
      lastModified: now,
      changeFrequency: path.includes('/blog/') ? 'yearly' as const : 'monthly' as const,
      priority: path === '' ? 1 : path.includes('/services/') ? 0.9 : 0.7,
      alternates: {
        languages: {
          sq: `${siteConfig.url}/sq${path}`,
          en: `${siteConfig.url}/en${path}`,
          'x-default': `${siteConfig.url}/sq${path}`,
        },
      },
    })),
  )
}
