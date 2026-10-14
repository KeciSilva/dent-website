import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/i18n/seo'
import { CTA, FaqList } from '@/components/i18n/ui'
import { services } from '@/data/demo-content'
import { getMessages } from '@/lib/i18n'
import { localizedMetadata } from '@/lib/metadata'
import type { Locale } from '@/lib/site-config'

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  const messages = await getMessages(locale)
  return localizedMetadata({
    locale,
    path: '/international-patients',
    title: messages.metadata.international.title,
    description: messages.metadata.international.description,
  })
}

export default async function InternationalPatientsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const messages = await getMessages(locale)

  return (
    <>
      <article className="section">
        <div className="container-page max-w-5xl">
          <p className="eyebrow">{messages.international.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl font-heading text-5xl font-extrabold tracking-tight text-slate-950">{messages.international.title}</h1>
          <p className="mt-6 max-w-3xl text-xl leading-9 text-slate-600">{messages.international.intro}</p>

          <section className="mt-14">
            <h2 className="font-heading text-3xl font-extrabold text-slate-950">{messages.international.treatmentsTitle}</h2>
            <p className="mt-4 max-w-3xl leading-8 text-slate-600">{messages.international.treatmentsText}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {services.map((service) => (
                <Link key={service.slug} href={`/${locale}/services/${service.slug}`} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:border-[var(--accent)] hover:text-[var(--accent)]">
                  {messages.services[service.key].name}
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-14">
            <h2 className="font-heading text-3xl font-extrabold text-slate-950">{messages.international.processTitle}</h2>
            <ol className="mt-6 grid gap-4 md:grid-cols-2">
              {messages.international.process.map((step, index) => (
                <li key={step} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-sm font-bold text-white">{index + 1}</span>
                  <span className="leading-7 text-slate-700">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="font-heading text-2xl font-extrabold text-slate-950">{messages.international.travelTitle}</h2>
              <p className="mt-4 leading-7 text-slate-600">{messages.international.travelText}</p>
            </section>
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="font-heading text-2xl font-extrabold text-slate-950">{messages.international.aftercareTitle}</h2>
              <p className="mt-4 leading-7 text-slate-600">{messages.international.aftercareText}</p>
            </section>
          </div>

          <section className="mt-14">
            <h2 className="font-heading text-3xl font-extrabold text-slate-950">{messages.international.faqTitle}</h2>
            <div className="mt-6"><FaqList faqs={messages.international.faqs} /></div>
          </section>

          <Link href={`/${locale}/contact`} className="btn-primary mt-10">{messages.international.cta}</Link>
        </div>
      </article>
      <JsonLd data={{ type: 'faq', faqs: messages.international.faqs }} />
      <JsonLd data={{ type: 'breadcrumb', items: [{ name: messages.common.home, url: `/${locale}` }, { name: messages.nav.international, url: `/${locale}/international-patients` }] }} />
      <CTA locale={locale} messages={messages} />
    </>
  )
}
