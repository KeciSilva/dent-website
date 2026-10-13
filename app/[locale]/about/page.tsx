import type { Metadata } from 'next'
import Image from 'next/image'
import { CTA } from '@/components/i18n/ui'
import { getMessages } from '@/lib/i18n'
import { localizedMetadata } from '@/lib/metadata'
import type { Locale } from '@/lib/site-config'

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  const messages = await getMessages(locale)
  return localizedMetadata({ locale, path: '/about', title: messages.metadata.about.title, description: messages.metadata.about.description })
}

export default async function AboutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const messages = await getMessages(locale)
  return (
    <>
      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">{messages.about.eyebrow}</p>
            <h1 className="mt-4 font-heading text-5xl font-extrabold tracking-tight text-slate-950">{messages.about.title}</h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">{messages.about.intro}</p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
            <Image src="/images/dentist-patient-consultation.jpg" alt={messages.about.imageAlt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>
      <section className="section bg-white">
        <div className="container-page grid gap-8 lg:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 p-6">
            <h2 className="font-heading text-2xl font-extrabold text-slate-950">{messages.about.storyTitle}</h2>
            <p className="mt-4 leading-7 text-slate-600">{messages.about.story}</p>
          </article>
          <article className="rounded-2xl border border-slate-200 p-6">
            <h2 className="font-heading text-2xl font-extrabold text-slate-950">{messages.about.technologyTitle}</h2>
            <p className="mt-4 leading-7 text-slate-600">{messages.about.technology}</p>
          </article>
          <article className="rounded-2xl border border-slate-200 p-6">
            <h2 className="font-heading text-2xl font-extrabold text-slate-950">{messages.about.teamTitle}</h2>
            <p className="mt-4 leading-7 text-slate-600">{messages.about.team}</p>
          </article>
        </div>
      </section>
      <section className="section">
        <div className="container-page">
          <h2 className="font-heading text-3xl font-extrabold text-slate-950">{messages.about.valuesTitle}</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {messages.about.values.map((item) => (
              <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="font-heading text-xl font-extrabold text-slate-950">{item.title}</h3>
                <p className="mt-3 text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTA locale={locale} messages={messages} />
    </>
  )
}
