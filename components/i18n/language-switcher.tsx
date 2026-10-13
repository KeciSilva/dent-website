'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { locales, type Locale } from '@/lib/site-config'
import { stripLocale } from '@/lib/i18n'

export function LanguageSwitcher({ currentLocale, label }: { currentLocale: Locale; label: string }) {
  const pathname = usePathname()
  const basePath = stripLocale(pathname || '/')

  return (
    <div className="flex items-center gap-1" aria-label={label}>
      {locales.map((locale) => (
        <Link
          key={locale}
          href={`/${locale}${basePath === '/' ? '' : basePath}`}
          className={`rounded-full px-3 py-2 text-xs font-bold uppercase transition ${
            locale === currentLocale ? 'bg-[var(--accent)] text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
          hrefLang={locale}
        >
          {locale}
        </Link>
      ))}
    </div>
  )
}
