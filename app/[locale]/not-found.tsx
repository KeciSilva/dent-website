import Link from 'next/link'
import { getMessages } from '@/lib/i18n'
import { defaultLocale } from '@/lib/site-config'

export default async function NotFound() {
  const messages = await getMessages(defaultLocale)
  return (
    <section className="section">
      <div className="container-page max-w-3xl text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 font-heading text-4xl font-extrabold text-slate-950">{messages.notFound.title}</h1>
        <p className="mt-4 text-slate-600">{messages.notFound.text}</p>
        <Link href={`/${defaultLocale}`} className="btn-primary mt-8">{messages.notFound.cta}</Link>
      </div>
    </section>
  )
}
