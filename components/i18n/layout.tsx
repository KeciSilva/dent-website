import Link from 'next/link'
import { CalendarDays, Mail, MapPin, Phone } from 'lucide-react'
import { LanguageSwitcher } from '@/components/i18n/language-switcher'
import { MobileMenu } from '@/components/i18n/mobile-menu'
import { siteConfig, type Locale } from '@/lib/site-config'
import type { Messages } from '@/lib/i18n'

const navKeys = ['about', 'services', 'team', 'gallery', 'blog', 'international', 'faq', 'contact'] as const

export function SiteHeader({ locale, messages }: { locale: Locale; messages: Messages }) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href={`/${locale}`} className="flex items-center gap-3" aria-label={siteConfig.name}>
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[var(--accent)] font-heading text-lg font-extrabold text-white">
            AD
          </span>
          <span>
            <span className="block font-heading text-lg font-extrabold tracking-tight text-slate-950">{siteConfig.name}</span>
            <span className="block text-xs text-slate-500">{messages.common.city}, {messages.common.country}</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex" aria-label={messages.nav.menu}>
          {navKeys.map((key) => (
            <Link key={key} href={`/${locale}/${key}`} className="text-sm font-medium text-slate-700 hover:text-[var(--accent)]">
              {messages.nav[key]}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher currentLocale={locale} label={messages.nav.language} />
          <Link href={`/${locale}/contact`} className="btn-primary">{messages.nav.book}</Link>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher currentLocale={locale} label={messages.nav.language} />
          <MobileMenu locale={locale} messages={messages} />
        </div>
      </div>
    </header>
  )
}

export function SiteFooter({ locale, messages }: { locale: Locale; messages: Messages }) {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div>
          <div className="font-heading text-xl font-extrabold">{siteConfig.name}</div>
          <p className="mt-3 text-sm leading-6 text-slate-600">{messages.metadata.home.description}</p>
        </div>
        <div>
          <h2 className="footer-heading">{messages.nav.services}</h2>
          <div className="mt-4 grid gap-2">
            <Link href={`/${locale}/services/general-dentistry`} className="footer-link">{messages.services.generalDentistry.name}</Link>
            <Link href={`/${locale}/services/dental-implants`} className="footer-link">{messages.services.dentalImplants.name}</Link>
            <Link href={`/${locale}/services/teeth-whitening`} className="footer-link">{messages.services.teethWhitening.name}</Link>
          </div>
        </div>
        <div>
          <h2 className="footer-heading">{messages.nav.menu}</h2>
          <div className="mt-4 grid gap-2">
            {navKeys.map((key) => (
              <Link key={key} href={`/${locale}/${key}`} className="footer-link">{messages.nav[key]}</Link>
            ))}
            <Link href={`/${locale}/privacy`} className="footer-link">{messages.nav.privacy}</Link>
          </div>
        </div>
        <div>
          <h2 className="footer-heading">{messages.nav.contact}</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <p className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" /> {siteConfig.address}</p>
            <p className="flex gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" /> <a href={`tel:${siteConfig.phone.replaceAll(' ', '')}`}>{siteConfig.phone}</a></p>
            <p className="flex gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" /> <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></p>
            <p className="flex gap-2"><CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" /><span><span className="block">{messages.common.hoursWeekdays} {siteConfig.hours[0].opens}–{siteConfig.hours[0].closes}</span><span className="block">{messages.common.hoursSaturday} {siteConfig.hours[1].opens}–{siteConfig.hours[1].closes}</span></span></p>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 px-4 py-5 text-center text-xs text-slate-500">
        <p>© 2026 {siteConfig.name}. {messages.common.city}, {messages.common.country}.</p>
        <p className="mt-1">{messages.common.demoFooter}</p>
      </div>
    </footer>
  )
}
