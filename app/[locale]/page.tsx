import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { JsonLd } from '@/components/i18n/seo'
import { CTA, FaqList, ServiceGrid, TrustBar } from '@/components/i18n/ui'
import { siteConfig, type Locale } from '@/lib/site-config'
import { getMessages } from '@/lib/i18n'
import { localizedMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  const messages = await getMessages(locale)
  return localizedMetadata({
    locale,
    path: '/',
    title: messages.metadata.home.title,
    description: messages.metadata.home.description,
  })
}

export default async function LocaleHomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const messages = await getMessages(locale)

  return (
    <>
      <section className="relative overflow-hidden bg-white">
        <div className="mx-auto grid min-h-[78svh] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
          <div className="animate-fade-up">
            <p className="eyebrow">{messages.home.heroEyebrow}</p>
            <h1 className="mt-5 max-w-4xl font-heading text-5xl font-extrabold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              {messages.home.heroTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{messages.home.heroText}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href={`/${locale}/contact`} className="btn-primary">{messages.home.primaryCta}</Link>
              <Link href={`/${locale}/services`} className="btn-secondary">{messages.home.secondaryCta}</Link>
            </div>
          </div>
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-100 shadow-2xl shadow-slate-200">
              <Image
                src="/images/suite.jpg"
                alt={messages.home.heroAlt}
                fill
                priority
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <TrustBar messages={messages} />

      <section className="section">
        <div className="container-page">
          <div className="mb-10 max-w-3xl">
            <p className="eyebrow">{messages.nav.services}</p>
            <h2 className="mt-3 font-heading text-4xl font-extrabold tracking-tight text-slate-950">{messages.home.servicesTitle}</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">{messages.home.servicesText}</p>
          </div>
          <ServiceGrid locale={locale} messages={messages} limit={6} />
          <div className="mt-8">
            <Link href={`/${locale}/services`} className="btn-secondary">{messages.common.allServices}</Link>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">{messages.nav.about}</p>
            <h2 className="mt-3 font-heading text-4xl font-extrabold text-slate-950">{messages.home.aboutTitle}</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">{messages.home.aboutText}</p>
            <ul className="mt-8 grid gap-3">
              {messages.home.why.map((item) => (
                <li key={item} className="rounded-2xl border border-slate-200 bg-[var(--background)] p-4 text-slate-700">{item}</li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
            <Image src="/images/consult.jpg" alt={messages.about.technologyTitle} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">{messages.team.eyebrow}</p>
            <h2 className="mt-3 font-heading text-4xl font-extrabold text-slate-950">{messages.home.teamTitle}</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {siteConfig.team.slice(0, 4).map((doctor) => (
              <article key={doctor.id} className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="font-heading text-xl font-extrabold text-slate-950">{doctor.name}</h3>
                <p className="mt-1 text-sm font-semibold text-[var(--accent)]">{doctor.specialty}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{messages.team.bios[doctor.id]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">{messages.faq.eyebrow}</p>
            <h2 className="mt-3 font-heading text-4xl font-extrabold text-slate-950">{messages.home.faqTitle}</h2>
          </div>
          <FaqList faqs={messages.faq.items.slice(0, 3)} />
        </div>
      </section>

      <JsonLd data={{ type: 'faq', faqs: messages.faq.items.slice(0, 3) }} />
      <CTA locale={locale} messages={messages} />
    </>
  )
}
