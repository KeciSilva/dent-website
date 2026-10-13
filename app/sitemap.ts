import type { MetadataRoute } from 'next'
import { allIndexablePaths } from '@/components/i18n/seo'
import { locales, siteUrl } from '@/lib/site-config'

const lastModified = new Date('2026-10-13T00:00:00.000Z')

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    allIndexablePaths().map((path) => {
      const pathname = `/${locale}${path}`
      const languages = Object.fromEntries(
        locales.map((alternate) => [alternate, `${siteUrl}/${alternate}${path}`]),
      )

      return {
        url: `${siteUrl}${pathname}`,
        lastModified,
        changeFrequency: path.includes('/blog/') ? 'yearly' : 'monthly',
        priority: path === '' ? 1 : path.includes('/services/') ? 0.9 : 0.7,
        alternates: { languages: { ...languages, 'x-default': `${siteUrl}/sq${path}` } },
      }
    }),
  )
}
