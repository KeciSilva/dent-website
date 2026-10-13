import type { Metadata } from 'next'
import Image from 'next/image'
import { CTA } from '@/components/i18n/ui'
import { getMessages } from '@/lib/i18n'
import { localizedMetadata } from '@/lib/metadata'
import type { Locale } from '@/lib/site-config'

const images = ['/images/pediatric-dentistry.png', '/images/modern-dental-treatment-room.jpg', '/images/teeth-whitening-after.png']

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  const messages = await getMessages(locale)
  return localizedMetadata({ locale, path: '/gallery', title: messages.metadata.gallery.title, description: messages.metadata.gallery.description })
}

export default async function GalleryPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const messages = await getMessages(locale)
  return (
    <>
      <section className="section">
        <div className="container-page">
          <p className="eyebrow">{messages.gallery.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl font-heading text-5xl font-extrabold tracking-tight text-slate-950">{messages.gallery.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{messages.gallery.intro}</p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {messages.gallery.items.map((item, index) => (
              <figure key={item.title} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <div className="relative aspect-[4/3]">
                  <Image src={images[index]} alt={item.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                </div>
                <figcaption className="p-5 font-heading font-extrabold text-slate-950">{item.title}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <CTA locale={locale} messages={messages} />
    </>
  )
}
