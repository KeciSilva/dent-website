import { services, site } from '@/lib/site-data'

export function StructuredData() {
  const graph = [
    {
      '@type': 'Organization',
      '@id': `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      logo: `${site.url}${site.assets.logo}`,
      description: site.description,
      sameAs: site.social,
    },
    {
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      url: site.url,
      name: site.name,
      inLanguage: 'en-US',
      publisher: { '@id': `${site.url}/#organization` },
    },
    {
      '@type': 'Dentist',
      '@id': `${site.url}/#dentist`,
      name: site.name,
      url: site.url,
      image: `${site.url}${site.assets.og}`,
      logo: `${site.url}${site.assets.logo}`,
      description: site.description,
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.contact.address,
        addressLocality: site.city,
        addressCountry: 'AL',
      },
      areaServed: [{ '@type': 'City', name: 'Tirana' }, { '@type': 'Country', name: 'Albania' }],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Dental Services',
        itemListElement: services.map((service) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service.shortTitle,
            description: service.summary,
            provider: { '@id': `${site.url}/#dentist` },
          },
        })),
      },
    },
  ]

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }),
      }}
    />
  )
}
