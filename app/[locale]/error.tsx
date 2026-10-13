'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import en from '@/messages/en.json'
import sq from '@/messages/sq.json'

export default function ErrorPage() {
  const params = useParams<{ locale?: string }>()
  const locale = params.locale === 'en' ? 'en' : 'sq'
  const messages = locale === 'en' ? en : sq

  return (
    <section className="section">
      <div className="container-page max-w-3xl text-center">
        <h1 className="font-heading text-4xl font-extrabold text-slate-950">{messages.error.title}</h1>
        <p className="mt-4 text-slate-600">{messages.error.text}</p>
        <Link href={`/${locale}`} className="btn-primary mt-8">{messages.common.home}</Link>
      </div>
    </section>
  )
}
