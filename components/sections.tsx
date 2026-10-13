import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { services } from '@/lib/site-data'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto grid min-h-[78svh] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
        <div>
          <p className="eyebrow">Dental clinic in Tirana</p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl font-extrabold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
            Modern Dentistry. Confident Smiles.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Aura Dental Studio provides modern, personalised dental care in Tirana for local patients and people travelling to Albania for treatment.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="btn-primary">Book an Appointment</Link>
            <Link href="/services" className="btn-secondary">Explore Treatments</Link>
          </div>
        </div>
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-100 shadow-2xl shadow-slate-200">
            <Image
              src="/images/suite.jpg"
              alt="Modern dental treatment room"
              fill
              priority
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export function TrustSection() {
  const items = [
    ['Modern treatment planning', 'Clear explanations before treatment decisions.'],
    ['Personalised care', 'Plans built around oral health, goals and timing.'],
    ['High-quality materials', 'Material choices explained before restorative work.'],
    ['Comfortable environment', 'A calm clinic experience for routine and complex care.'],
  ]
  return (
    <section className="border-y border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:px-6 md:grid-cols-4 lg:px-8">
        {items.map(([title, text]) => (
          <article key={title} className="rounded-lg bg-white p-5 shadow-sm">
            <CheckCircle2 className="h-5 w-5 text-teal-700" />
            <h2 className="mt-4 font-display text-lg font-bold text-slate-950">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export function ServicesGrid({ limit }: { limit?: number }) {
  const shown = limit ? services.slice(0, limit) : services
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {shown.map((service) => (
        <Link
          key={service.slug}
          href={`/services/${service.slug}`}
          className="group rounded-lg border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl hover:shadow-slate-200/70"
        >
          <h3 className="font-display text-xl font-bold text-slate-950">{service.shortTitle}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">{service.summary}</p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-teal-700">
            Learn more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </span>
        </Link>
      ))}
    </div>
  )
}

export function FaqList({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <div className="space-y-3">
      {faqs.map((faq) => (
        <details key={faq.question} className="rounded-lg border border-slate-200 bg-white p-5">
          <summary className="cursor-pointer font-display text-lg font-bold text-slate-950">
            {faq.question}
          </summary>
          <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
        </details>
      ))}
    </div>
  )
}
