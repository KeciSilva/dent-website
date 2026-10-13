import Link from 'next/link'
import { CalendarDays, Mail, MapPin, Phone } from 'lucide-react'
import { navItems, services, site } from '@/lib/site-data'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/92 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label={`${site.name} home`}>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-teal-700 text-lg font-bold text-white">
            A
          </span>
          <span>
            <span className="block font-display text-lg font-extrabold tracking-tight text-slate-950">
              {site.name}
            </span>
            <span className="block text-xs font-medium text-slate-500">Tirana, Albania</span>
          </span>
        </Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-6 lg:flex">
          {navItems.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-700 transition hover:text-teal-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="btn-primary hidden sm:inline-flex">
          Book Appointment
        </Link>
      </div>
      <nav
        aria-label="Mobile navigation"
        className="flex gap-2 overflow-x-auto border-t border-slate-100 px-4 py-3 text-sm lg:hidden"
      >
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="shrink-0 rounded-full bg-slate-100 px-4 py-2 text-slate-700">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-1">
          <div className="font-display text-xl font-extrabold">{site.name}</div>
          <p className="mt-3 text-sm leading-6 text-slate-300">{site.description}</p>
        </div>
        <div>
          <h2 className="footer-heading">Navigation</h2>
          <div className="mt-4 grid gap-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="footer-link">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="footer-heading">Services</h2>
          <div className="mt-4 grid gap-2">
            {services.slice(0, 6).map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className="footer-link">
                {service.shortTitle}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="footer-heading">Contact</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <p className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" /> {site.contact.address}</p>
            <p className="flex gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0" /> {site.contact.phone}</p>
            <p className="flex gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0" /> {site.contact.email}</p>
            <p className="flex gap-2"><CalendarDays className="mt-0.5 h-4 w-4 shrink-0" /> {site.contact.hours.join(', ')}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-slate-400">
        © 2026 {site.name}. {site.footerNote}
      </div>
    </footer>
  )
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-500">
      <ol className="flex flex-wrap items-center gap-2">
        <li><Link href="/" className="hover:text-teal-700">Home</Link></li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-2">
            <span>/</span>
            {item.href ? <Link href={item.href} className="hover:text-teal-700">{item.label}</Link> : <span>{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function CTA() {
  return (
    <section className="section bg-teal-800 text-white">
      <div className="mx-auto max-w-4xl text-center">
        <p className="eyebrow text-teal-100">Appointments</p>
        <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
          Ready to discuss your dental treatment?
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-teal-50">
          Send a consultation request and the clinic can confirm availability, treatment interests and next steps.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/contact" className="btn-light">Book Appointment</Link>
          <Link href="/international-patients" className="btn-outline-light">International Patients</Link>
        </div>
      </div>
    </section>
  )
}
