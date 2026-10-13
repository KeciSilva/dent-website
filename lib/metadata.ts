import type { Metadata } from 'next'
import { hreflang } from '@/components/i18n/seo'
import { allowIndexing, siteConfig, type Locale } from '@/lib/site-config'

export function localizedMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale
  path: string
  title: string
  description: string
}): Metadata {
  const cleanPath = path === '/' ? '' : path
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${cleanPath}`,
      languages: hreflang(cleanPath),
    },
    openGraph: {
      title,
      description,
      url: `/${locale}${cleanPath}`,
      siteName: siteConfig.name,
      locale: locale === 'sq' ? 'sq_AL' : 'en_US',
      alternateLocale: locale === 'sq' ? ['en_US'] : ['sq_AL'],
      type: 'website',
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: locale === 'sq' ? 'Ambient modern i klinikës dentare Auro Dent' : 'Modern Auro Dent dental clinic interior' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [siteConfig.ogImage],
    },
    robots: { index: allowIndexing, follow: allowIndexing },
  }
}
