import Link from 'next/link'
import { headers } from 'next/headers'
import { getMessages } from '@/lib/i18n'
import { defaultLocale, isLocale, type Locale } from '@/lib/site-config'

export default async function NotFound() {
  const localeHeader = (await headers()).get('x-auro-locale')
  const locale: Locale = localeHeader && isLocale(localeHeader) ? localeHeader : defaultLocale
  const messages = await getMessages(locale)
  return (
    <section className="section">
      <div className="container-page max-w-3xl text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 font-heading text-4xl font-extrabold text-slate-950">{messages.notFound.title}</h1>
        <p className="mt-4 text-slate-600">{messages.notFound.text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href={`/${locale}`} className="btn-primary">{messages.notFound.cta}</Link>
          <Link href={`/${locale}/services`} className="btn-secondary">{messages.notFound.servicesCta}</Link>
        </div>
      </div>
    </section>
  )
}
