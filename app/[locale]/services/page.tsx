import type { Metadata } from 'next'
import { ServiceGrid } from '@/components/i18n/ui'
import { JsonLd } from '@/components/i18n/seo'
import { getMessages } from '@/lib/i18n'
import { localizedMetadata } from '@/lib/metadata'
import type { Locale } from '@/lib/site-config'

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  const messages = await getMessages(locale)
  return localizedMetadata({
    locale,
    path: '/services',
    title: messages.metadata.services.title,
    description: messages.metadata.services.description,
  })
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const messages = await getMessages(locale)

  return (
    <section className="section">
      <div className="container-page">
        <p className="eyebrow">{messages.servicesPage.eyebrow}</p>
        <h1 className="mt-4 max-w-4xl font-heading text-5xl font-extrabold tracking-tight text-slate-950">{messages.servicesPage.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{messages.servicesPage.intro}</p>
        <div className="mt-12">
          <ServiceGrid locale={locale} messages={messages} />
        </div>
      </div>
      <JsonLd data={{ type: 'breadcrumb', items: [{ name: messages.common.home, url: `/${locale}` }, { name: messages.nav.services, url: `/${locale}/services` }] }} />
    </section>
  )
}
