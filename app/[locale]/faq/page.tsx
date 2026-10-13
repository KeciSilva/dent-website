import type { Metadata } from 'next'
import { JsonLd } from '@/components/i18n/seo'
import { CTA, FaqList } from '@/components/i18n/ui'
import { getMessages } from '@/lib/i18n'
import { localizedMetadata } from '@/lib/metadata'
import type { Locale } from '@/lib/site-config'

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  const messages = await getMessages(locale)
  return localizedMetadata({ locale, path: '/faq', title: messages.metadata.faq.title, description: messages.metadata.faq.description })
}

export default async function FaqPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const messages = await getMessages(locale)
  return (
    <>
      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">{messages.faq.eyebrow}</p>
            <h1 className="mt-4 font-heading text-5xl font-extrabold tracking-tight text-slate-950">{messages.faq.title}</h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">{messages.faq.intro}</p>
          </div>
          <FaqList faqs={messages.faq.items} />
        </div>
      </section>
      <JsonLd data={{ type: 'faq', faqs: messages.faq.items }} />
      <JsonLd data={{ type: 'breadcrumb', items: [{ name: messages.common.home, url: `/${locale}` }, { name: messages.nav.faq, url: `/${locale}/faq` }] }} />
      <CTA locale={locale} messages={messages} />
    </>
  )
}
