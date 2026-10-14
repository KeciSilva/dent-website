'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import type { Locale } from '@/lib/site-config'
import type { Messages } from '@/lib/i18n'

const navKeys = ['home', 'about', 'services', 'team', 'gallery', 'blog', 'international', 'faq', 'contact'] as const
const navPath = (locale: Locale, key: (typeof navKeys)[number]) => key === 'home' ? `/${locale}` : `/${locale}/${key === 'international' ? 'international-patients' : key}`

export function MobileMenu({ locale, messages }: { locale: Locale; messages: Messages }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? messages.nav.close : messages.nav.menu}
      >
        {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
      </button>
      <div
        id="mobile-menu"
        className={`absolute inset-x-4 top-20 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl transition ${
          open ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
        }`}
      >
        <nav className="grid gap-1" aria-label={messages.nav.menu}>
          {navKeys.map((key) => (
            <Link
              key={key}
              href={navPath(locale, key)}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 font-medium text-slate-700 hover:bg-slate-50"
            >
              {messages.nav[key]}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
