import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { services, getService } from '@/data/demo-content'
import { JsonLd } from '@/components/i18n/seo'
import { Breadcrumbs, CTA, FaqList } from '@/components/i18n/ui'
import { getMessages } from '@/lib/i18n'
import { localizedMetadata } from '@/lib/metadata'
import type { Locale } from '@/lib/site-config'

export function generateStaticParams() {
  return services.flatMap((service) => [
    { locale: 'sq', slug: service.slug },
    { locale: 'en', slug: service.slug },
  ])
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const service = getService(slug)
  if (!service) return {}
  const messages = await getMessages(locale)
  const copy = messages.services[service.key]
  return localizedMetadata({
    locale,
    path: `/services/${service.slug}`,
    title: copy.name,
    description: copy.short,
  })
}

export default async function ServicePage({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params
  const service = getService(slug)
  if (!service) notFound()
  const messages = await getMessages(locale)
  const copy = messages.services[service.key]
  const related = service.related.map(getService).filter(Boolean)

  return (
    <>
      <article className="section">
        <div className="container-page">
          <Breadcrumbs
            locale={locale}
            messages={messages}
            items={[
              { label: messages.nav.services, href: `/${locale}/services` },
              { label: copy.name },
            ]}
          />
          <div className="grid gap-12 lg:grid-cols-[0.7fr_0.3fr]">
            <div>
              <p className="eyebrow">{copy.primaryKeyword}</p>
              <h1 className="mt-4 font-heading text-5xl font-extrabold tracking-tight text-slate-950">{copy.name}</h1>
              <p className="mt-6 text-xl leading-9 text-slate-600">{copy.intro}</p>

              <section className="mt-12">
                <h2 className="font-heading text-3xl font-extrabold text-slate-950">{messages.serviceDetail.forTitle}</h2>
                <p className="mt-4 leading-8 text-slate-600">{copy.for}</p>
              </section>

              <section className="mt-12">
                <h2 className="font-heading text-3xl font-extrabold text-slate-950">{messages.serviceDetail.processTitle}</h2>
                <ol className="mt-5 grid gap-4">
                  {copy.process.map((step, index) => (
                    <li key={step} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-sm font-bold text-white">{index + 1}</span>
                      <span className="leading-7 text-slate-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </section>

              <section className="mt-12">
                <h2 className="font-heading text-3xl font-extrabold text-slate-950">{messages.faq.title}</h2>
                <div className="mt-5">
                  <FaqList faqs={copy.faqs} />
                </div>
              </section>
            </div>
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <dl className="grid gap-4 text-sm">
                  <div>
                    <dt className="font-bold text-slate-950">{messages.common.duration}</dt>
                    <dd className="mt-1 text-slate-600">{messages.common.durations[service.durationKey]}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-slate-950">{messages.common.priceFrom}</dt>
                    <dd className="mt-1 text-slate-600">{messages.common.from} {service.priceFrom}</dd>
                  </div>
                </dl>
                <h2 className="mt-8 font-heading text-xl font-extrabold text-slate-950">{messages.common.relatedServices}</h2>
                <div className="mt-4 grid gap-2">
                  {related.map((item) => item && (
                    <Link key={item.slug} href={`/${locale}/services/${item.slug}`} className="rounded-xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 hover:text-[var(--accent)]">
                      {messages.services[item.key].name}
                    </Link>
                  ))}
                </div>
                <Link href={`/${locale}/contact`} className="btn-primary mt-6 w-full">{messages.common.bookCta}</Link>
              </div>
            </aside>
          </div>
        </div>
      </article>
      <JsonLd data={{ type: 'breadcrumb', items: [{ name: messages.common.home, url: `/${locale}` }, { name: messages.nav.services, url: `/${locale}/services` }, { name: copy.name, url: `/${locale}/services/${service.slug}` }] }} />
      <JsonLd data={{ type: 'faq', faqs: copy.faqs }} />
      <JsonLd data={{ type: 'service', locale, slug: service.slug, messages }} />
      <CTA locale={locale} messages={messages} />
    </>
  )
}
