import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { blogPosts, getBlogPost, getService } from '@/data/demo-content'
import { JsonLd } from '@/components/i18n/seo'
import { Breadcrumbs, CTA } from '@/components/i18n/ui'
import { getMessages } from '@/lib/i18n'
import { localizedMetadata } from '@/lib/metadata'
import type { Locale } from '@/lib/site-config'

export function generateStaticParams() {
  return blogPosts.flatMap((post) => [
    { locale: 'sq', slug: post.slug },
    { locale: 'en', slug: post.slug },
  ])
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}
  const messages = await getMessages(locale)
  const copy = messages.blog.posts[post.key]
  return localizedMetadata({ locale, path: `/blog/${post.slug}`, title: copy.title, description: copy.description })
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()
  const messages = await getMessages(locale)
  const copy = messages.blog.posts[post.key]
  const service = getService(post.serviceSlug)

  return (
    <>
      <article className="section">
        <div className="container-page max-w-4xl">
          <Breadcrumbs locale={locale} messages={messages} items={[{ label: messages.nav.blog, href: `/${locale}/blog` }, { label: copy.title }]} />
          <time className="eyebrow">{post.date}</time>
          <h1 className="mt-4 font-heading text-5xl font-extrabold tracking-tight text-slate-950">{copy.title}</h1>
          <p className="mt-6 text-xl leading-9 text-slate-600">{copy.description}</p>
          <div className="mt-12 space-y-7">
            {copy.body.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-8 text-slate-700">{paragraph}</p>
            ))}
          </div>
          {service && (
            <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="font-heading text-2xl font-extrabold text-slate-950">{messages.common.relatedServices}</h2>
              <Link href={`/${locale}/services/${service.slug}`} className="mt-4 inline-flex font-bold text-[var(--accent)]">
                {messages.services[service.key].name}
              </Link>
            </div>
          )}
        </div>
      </article>
      <JsonLd data={{ type: 'article', locale, slug: post.slug, messages }} />
      <JsonLd data={{ type: 'breadcrumb', items: [{ name: messages.common.home, url: `/${locale}` }, { name: messages.nav.blog, url: `/${locale}/blog` }, { name: copy.title, url: `/${locale}/blog/${post.slug}` }] }} />
      <CTA locale={locale} messages={messages} />
    </>
  )
}
