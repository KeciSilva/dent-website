import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import { services } from '@/data/demo-content'
import { siteConfig, type Locale } from '@/lib/site-config'
import type { Messages } from '@/lib/i18n'

export function Breadcrumbs({
  items,
  locale,
  messages,
}: {
  items: { label: string; href?: string }[]
  locale: Locale
  messages: Messages
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-500">
      <ol className="flex flex-wrap items-center gap-2">
        <li><Link href={`/${locale}`} className="hover:text-[var(--accent)]">{messages.common.home}</Link></li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-2">
            <span>/</span>
            {item.href ? <Link href={item.href} className="hover:text-[var(--accent)]">{item.label}</Link> : <span>{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function ServiceGrid({ locale, messages, limit }: { locale: Locale; messages: Messages; limit?: number }) {
  const shown = limit ? services.slice(0, limit) : services
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {shown.map((service) => {
        const copy = messages.services[service.key]
        return (
          <Link
            key={service.slug}
            href={`/${locale}/services/${service.slug}`}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl hover:shadow-slate-200/70"
          >
            <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-xl bg-slate-100">
              <Image src={service.image} alt={copy.name} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
            </div>
            <h3 className="font-heading text-xl font-extrabold text-slate-950">{copy.name}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{copy.short}</p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-500">
              <span className="rounded-full bg-slate-100 px-3 py-1">{service.duration}</span>
              <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-[var(--accent)]">{service.priceFrom}</span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export function FaqList({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <div className="space-y-3">
      {faqs.map((faq) => (
        <details key={faq.q} className="rounded-2xl border border-slate-200 bg-white p-5">
          <summary className="cursor-pointer font-heading text-lg font-extrabold text-slate-950">{faq.q}</summary>
          <p className="mt-3 leading-7 text-slate-600">{faq.a}</p>
        </details>
      ))}
    </div>
  )
}

export function CTA({ locale, messages }: { locale: Locale; messages: Messages }) {
  return (
    <section className="section bg-[var(--accent)] text-white">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/75">{messages.common.demoBadge}</p>
        <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight sm:text-5xl">{messages.home.finalTitle}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-white/85">{messages.home.finalText}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href={`/${locale}/contact`} className="btn-light">{messages.common.bookCta}</Link>
          <a href={`tel:${siteConfig.phone.replaceAll(' ', '')}`} className="btn-outline-light">{siteConfig.phone}</a>
        </div>
      </div>
    </section>
  )
}

export function TrustBar({ messages }: { messages: Messages }) {
  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:px-6 md:grid-cols-3 lg:px-8">
        {messages.home.trust.map((item) => (
          <article key={item.title} className="rounded-2xl border border-slate-200 bg-[var(--background)] p-5">
            <CheckCircle2 className="h-5 w-5 text-[var(--accent)]" />
            <h2 className="mt-4 font-heading text-lg font-extrabold text-slate-950">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
