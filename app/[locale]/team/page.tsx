import type { Metadata } from 'next'
import Image from 'next/image'
import { CTA } from '@/components/i18n/ui'
import { siteConfig, type Locale } from '@/lib/site-config'
import { getMessages } from '@/lib/i18n'
import { localizedMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  const messages = await getMessages(locale)
  return localizedMetadata({ locale, path: '/team', title: messages.metadata.team.title, description: messages.metadata.team.description })
}

export default async function TeamPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const messages = await getMessages(locale)
  return (
    <>
      <section className="section">
        <div className="container-page">
          <p className="eyebrow">{messages.team.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl font-heading text-5xl font-extrabold tracking-tight text-slate-950">{messages.team.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{messages.team.intro}</p>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {siteConfig.team.map((doctor) => (
              <article key={doctor.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="relative aspect-[4/3] bg-slate-100">
                  <Image src={doctor.image} alt={doctor.name} fill sizes="(min-width: 1024px) 25vw, 100vw" className="object-cover" />
                </div>
                <div className="p-5">
                  <h2 className="font-heading text-xl font-extrabold text-slate-950">{doctor.name}</h2>
                  <p className="mt-1 text-sm font-semibold text-[var(--accent)]">{doctor.specialty}</p>
                  <p className="mt-3 text-sm text-slate-500">{doctor.credential}</p>
                  <p className="mt-4 text-sm leading-6 text-slate-600">{messages.team.bios[doctor.id]}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTA locale={locale} messages={messages} />
    </>
  )
}
