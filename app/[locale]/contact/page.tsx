import type { Metadata } from 'next'
import { Mail, MapPin, Phone } from 'lucide-react'
import { services } from '@/data/demo-content'
import { getMessages } from '@/lib/i18n'
import { localizedMetadata } from '@/lib/metadata'
import { siteConfig, type Locale } from '@/lib/site-config'

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  const messages = await getMessages(locale)
  return localizedMetadata({ locale, path: '/contact', title: messages.metadata.contact.title, description: messages.metadata.contact.description })
}

export default async function ContactPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const messages = await getMessages(locale)
  return (
    <section className="section">
      <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="eyebrow">{messages.contact.eyebrow}</p>
          <h1 className="mt-4 font-heading text-5xl font-extrabold tracking-tight text-slate-950">{messages.contact.title}</h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">{messages.contact.intro}</p>
          <div className="mt-8 grid gap-4">
            <p className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4"><MapPin className="h-5 w-5 text-[var(--accent)]" /> {siteConfig.address}</p>
            <p className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4"><Phone className="h-5 w-5 text-[var(--accent)]" /> <a href={`tel:${siteConfig.phone.replaceAll(' ', '')}`}>{siteConfig.phone}</a></p>
            <p className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4"><Mail className="h-5 w-5 text-[var(--accent)]" /> <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></p>
            <p className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700">{messages.common.hours}: {messages.common.hoursWeekdays} {siteConfig.hours[0].opens}–{siteConfig.hours[0].closes}; {messages.common.hoursSaturday} {siteConfig.hours[1].opens}–{siteConfig.hours[1].closes}</p>
          </div>
          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <iframe
              title={messages.contact.mapTitle}
              src={siteConfig.mapEmbed}
              className="h-72 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <form className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60">
          <div className="grid gap-5">
            <label className="grid gap-2 text-sm font-bold text-slate-800">
              {messages.contact.form.name}
              <input required name="name" className="rounded-xl border border-slate-300 px-4 py-3 font-normal" autoComplete="name" />
            </label>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-slate-800">
                {messages.contact.form.phone}
                <input required name="phone" type="tel" className="rounded-xl border border-slate-300 px-4 py-3 font-normal" autoComplete="tel" />
              </label>
              <label className="grid gap-2 text-sm font-bold text-slate-800">
                {messages.contact.form.email}
                <input name="email" type="email" className="rounded-xl border border-slate-300 px-4 py-3 font-normal" autoComplete="email" />
              </label>
            </div>
            <label className="grid gap-2 text-sm font-bold text-slate-800">
              {messages.contact.form.service}
              <select name="service" className="rounded-xl border border-slate-300 px-4 py-3 font-normal">
                {services.map((service) => <option key={service.slug}>{messages.services[service.key].name}</option>)}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-800">
              {messages.contact.form.message}
              <textarea name="message" rows={5} className="rounded-xl border border-slate-300 px-4 py-3 font-normal" />
            </label>
            <button type="submit" formAction={`mailto:${siteConfig.email}`} className="btn-primary">
              {messages.contact.form.submit}
            </button>
            <p className="text-sm leading-6 text-slate-500">{messages.contact.form.note}</p>
          </div>
        </form>
      </div>
    </section>
  )
}
