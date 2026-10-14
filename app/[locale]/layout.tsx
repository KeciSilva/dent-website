import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/i18n/seo'
import { SiteFooter, SiteHeader } from '@/components/i18n/layout'
import { getMessages } from '@/lib/i18n'
import { allowIndexing, isLocale, locales, siteConfig, type Locale } from '@/lib/site-config'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const messages = await getMessages(locale)
  return {
    title: {
      default: messages.metadata.home.title,
      template: `%s | ${siteConfig.name}`,
    },
    description: messages.metadata.home.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        sq: '/sq',
        en: '/en',
        'x-default': '/sq',
      },
    },
    robots: { index: allowIndexing, follow: allowIndexing },
    openGraph: {
      title: messages.metadata.home.title,
      description: messages.metadata.home.description,
      url: `/${locale}`,
      siteName: siteConfig.name,
      locale: locale === 'sq' ? 'sq_AL' : 'en_US',
      alternateLocale: locale === 'sq' ? ['en_US'] : ['sq_AL'],
      type: 'website',
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: locale === 'sq' ? 'Ambient modern i klinikës dentare Auro Dent' : 'Modern Auro Dent dental clinic interior' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: messages.metadata.home.title,
      description: messages.metadata.home.description,
      images: [siteConfig.ogImage],
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const messages = await getMessages(locale)

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:font-bold focus:text-[var(--accent)]">
        {messages.nav.skip}
      </a>
      <SiteHeader locale={locale as Locale} messages={messages} />
      <JsonLd data={{ type: 'base', locale: locale as Locale, messages }} />
      <main id="main" className="min-h-screen">{children}</main>
      <SiteFooter locale={locale as Locale} messages={messages} />
    </>
  )
}
