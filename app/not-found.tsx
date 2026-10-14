import Link from 'next/link'
import sq from '@/messages/sq.json'

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-page max-w-3xl text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 font-heading text-4xl font-extrabold text-slate-950">{sq.notFound.title}</h1>
        <p className="mt-4 text-slate-600">{sq.notFound.text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/sq" className="btn-primary">{sq.notFound.cta}</Link>
          <Link href="/sq/services" className="btn-secondary">{sq.notFound.servicesCta}</Link>
          <Link href="/sq/contact" className="btn-secondary">{sq.notFound.contactCta}</Link>
        </div>
      </div>
    </section>
  )
}
