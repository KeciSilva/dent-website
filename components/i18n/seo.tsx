import { blogPosts, getService, services } from '@/data/demo-content'
import { siteConfig, type Locale } from '@/lib/site-config'
import type { Messages } from '@/lib/i18n'

type JsonLdProps =
  | { data: { type: 'base'; locale: Locale; messages: Messages } }
  | { data: { type: 'breadcrumb'; items: { name: string; url: string }[] } }
  | { data: { type: 'faq'; faqs: { q: string; a: string }[] } }
  | { data: { type: 'service'; locale: Locale; slug: string; messages: Messages } }
  | { data: { type: 'article'; locale: Locale; slug: string; messages: Messages } }

export function JsonLd({ data }: JsonLdProps) {
  const payload = buildPayload(data)
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload).replace(/</g, '\\u003c') }}
    />
  )
}

function buildPayload(data: JsonLdProps['data']) {
  if (data.type === 'base') {
    const url = `${siteConfig.url}/${data.locale}`
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${siteConfig.url}/#organization`,
          name: siteConfig.name,
          url: siteConfig.url,
          logo: `${siteConfig.url}${siteConfig.logo}`,
          sameAs: Object.values(siteConfig.social),
        },
        {
          '@type': 'WebSite',
          '@id': `${siteConfig.url}/#website`,
          url: siteConfig.url,
          name: siteConfig.name,
          inLanguage: data.locale,
          publisher: { '@id': `${siteConfig.url}/#organization` },
        },
        {
          '@type': 'Dentist',
          '@id': `${siteConfig.url}/#dentist`,
          name: siteConfig.name,
          url,
          image: `${siteConfig.url}${siteConfig.ogImage}`,
          logo: `${siteConfig.url}${siteConfig.logo}`,
          telephone: siteConfig.phone,
          email: siteConfig.email,
          address: {
            '@type': 'PostalAddress',
            streetAddress: siteConfig.address,
            addressLocality: siteConfig.city,
            addressCountry: 'AL',
          },
          openingHoursSpecification: siteConfig.hours.map((hours) => ({
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: hours.days,
            opens: hours.opens,
            closes: hours.closes,
          })),
          areaServed: [{ '@type': 'City', name: 'Tirana' }, { '@type': 'Country', name: 'Albania' }],
          availableLanguage: ['sq', 'en'],
          ...(Object.values(siteConfig.social).length ? { sameAs: Object.values(siteConfig.social) } : {}),
        },
      ],
    }
  }

  if (data.type === 'breadcrumb') {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: data.items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: `${siteConfig.url}${item.url}`,
      })),
    }
  }

  if (data.type === 'faq') {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: data.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    }
  }

  if (data.type === 'service') {
    const service = getService(data.slug)
    if (!service) return {}
    const copy = data.messages.services[service.key]
    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: copy.name,
      description: copy.short,
      provider: { '@id': `${siteConfig.url}/#dentist` },
      areaServed: { '@type': 'City', name: 'Tirana' },
      url: `${siteConfig.url}/${data.locale}/services/${service.slug}`,
    }
  }

  const post = blogPosts.find((item) => item.slug === data.slug)
  if (!post) return {}
  const copy = data.messages.blog.posts[post.key]
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: copy.title,
    description: copy.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: data.locale,
    author: { '@type': 'Organization', name: siteConfig.name },
    publisher: { '@id': `${siteConfig.url}/#organization` },
    mainEntityOfPage: `${siteConfig.url}/${data.locale}/blog/${post.slug}`,
  }
}

export function hreflang(path: string) {
  return {
    sq: `/sq${path}`,
    en: `/en${path}`,
    'x-default': `/sq${path}`,
  }
}

export function allIndexablePaths() {
  const base = ['', '/about', '/services', '/team', '/gallery', '/blog', '/faq', '/contact', '/privacy']
  return [
    ...base,
    ...services.map((service) => `/services/${service.slug}`),
    ...blogPosts.map((post) => `/blog/${post.slug}`),
  ]
}
