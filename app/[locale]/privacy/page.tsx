import type { Metadata } from 'next'
import { getMessages } from '@/lib/i18n'
import { localizedMetadata } from '@/lib/metadata'
import type { Locale } from '@/lib/site-config'

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  const messages = await getMessages(locale)
  return localizedMetadata({ locale, path: '/privacy', title: messages.metadata.privacy.title, description: messages.metadata.privacy.description })
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const messages = await getMessages(locale)
  return (
    <section className="section">
      <div className="container-page max-w-4xl">
        <h1 className="font-heading text-5xl font-extrabold tracking-tight text-slate-950">{messages.privacy.title}</h1>
        <p className="mt-6 text-lg leading-8 text-slate-600">{messages.privacy.intro}</p>
        <div className="mt-12 space-y-8">
          {messages.privacy.sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-heading text-2xl font-extrabold text-slate-950">{section.title}</h2>
              <p className="mt-3 leading-8 text-slate-600">{section.text}</p>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}
