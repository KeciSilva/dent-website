import type { Metadata } from 'next'
import Link from 'next/link'
import { blogPosts } from '@/data/demo-content'
import { CTA } from '@/components/i18n/ui'
import { getMessages } from '@/lib/i18n'
import { localizedMetadata } from '@/lib/metadata'
import type { Locale } from '@/lib/site-config'

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  const messages = await getMessages(locale)
  return localizedMetadata({ locale, path: '/blog', title: messages.metadata.blog.title, description: messages.metadata.blog.description })
}

export default async function BlogPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const messages = await getMessages(locale)
  return (
    <>
      <section className="section">
        <div className="container-page">
          <p className="eyebrow">{messages.blog.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl font-heading text-5xl font-extrabold tracking-tight text-slate-950">{messages.blog.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{messages.blog.intro}</p>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {blogPosts.map((post) => {
              const copy = messages.blog.posts[post.key]
              return (
                <article key={post.slug} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <time className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent)]">{post.date}</time>
                  <h2 className="mt-3 font-heading text-2xl font-extrabold text-slate-950">
                    <Link href={`/${locale}/blog/${post.slug}`} className="hover:text-[var(--accent)]">{copy.title}</Link>
                  </h2>
                  <p className="mt-3 leading-7 text-slate-600">{copy.description}</p>
                  <Link href={`/${locale}/blog/${post.slug}`} className="mt-6 inline-flex font-bold text-[var(--accent)]">{messages.common.readArticle}</Link>
                </article>
              )
            })}
          </div>
        </div>
      </section>
      <CTA locale={locale} messages={messages} />
    </>
  )
}
