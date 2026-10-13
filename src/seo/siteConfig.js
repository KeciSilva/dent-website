/* ==================================================================== */
/*  SEO SINGLE SOURCE OF TRUTH                                          */
/*                                                                      */
/*  Every SEO surface reads from this file so values never drift:       */
/*    - src/seo/StructuredData.jsx  (JSON-LD @graph)                    */
/*    - scripts/generate-sitemap.mjs (sitemap.xml)                      */
/*    - public/site.webmanifest      (mirrored by hand)                 */
/*    - index.html <head>            (mirrored by hand — HTML cannot    */
/*                                     import JS at runtime)             */
/*                                                                      */
/*  IMPORTANT: if you change brand/description/url/themeColor here,     */
/*  mirror the same values in index.html and public/site.webmanifest.   */
/*                                                                      */
/*  TODO(launch): replace every value marked `TODO` with real data.     */
/* ==================================================================== */

export const siteConfig = {
  // TODO(launch): real production domain (no trailing slash).
  siteUrl: 'https://www.valoisoralwellness.com',

  brand: 'AURO DENT',
  shortName: 'AURO',
  tagline: 'Healthy Smiles, Made Simple',

  // ≤ 155 chars — used for <meta name="description">, OG and Twitter.
  description:
    'Modern dental care for checkups, emergencies, implants, clear aligners and smile design in a calm, technology-led clinic. Tirana · Albania.',

  locale: 'en_US',
  themeColor: '#14343B', // espresso (deep ink)
  backgroundColor: '#F7FBFB', // cream (porcelain white)

  // TODO(launch): export a real 1200×630 social cover image to this path.
  ogImage: '/og/og-cover-1200x630.jpg',
  ogImageAlt: 'AURO DENT — Healthy Smiles, Made Simple',

  logo: '/favicons/icon-512.png',
  priceRange: '$$$$',

  // TODO(launch): real handle, or remove twitter:site from index.html.
  twitterHandle: '@valoiswellness',

  // Primary headquarters. Cities below are served from here / by branches.
  // TODO(launch): replace ALL of the following with real clinic data.
  business: {
    name: 'AURO DENT',
    telephone: '+41 22 000 00 00', // TODO
    email: 'hello@valoisoralwellness.com', // TODO
    streetAddress: 'Rruga e Demos 12', // TODO
    addressLocality: 'Tirana', // TODO
    postalCode: '1204', // TODO
    addressRegion: 'Tirana', // TODO
    addressCountry: 'CH', // TODO
    geo: { lat: 46.2044, lng: 6.1432 }, // TODO
    // schema.org openingHoursSpecification shorthand → expanded in buildJsonLd
    openingHours: [
      { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' },
      { days: ['Saturday'], opens: '10:00', closes: '14:00' },
    ],
  },

  // Single-HQ model: the three markets are listed as areas served.
  areaServed: ['Tirana', 'Albania'],

  // TODO(launch): real social profile URLs (or trim the list).
  sameAs: [
    'https://www.instagram.com/valoisoralwellness',
    'https://www.linkedin.com/company/valoisoralwellness',
    'https://www.facebook.com/valoisoralwellness',
  ],

  // Booking destination for the CTA buttons. TODO(launch): real URL/mailto.
  bookingUrl: 'mailto:hello@valoisoralwellness.com',

  // Web3Forms access key — booking form submissions are emailed to the address
  // registered for this key. Get a free key at https://web3forms.com (enter the
  // clinic inbox; the key is safe to ship in client code by design).
  // TODO(launch): replace with your real access key to start receiving emails.
  web3formsAccessKey: 'YOUR-WEB3FORMS-ACCESS-KEY',

  // Reused verbatim from App.jsx SERVICES (the on-page service copy).
  services: [
    {
      name: 'General Dentistry',
      description:
        'Exams, cleanings, fillings and gum care focused on prevention and long-term comfort.',
    },
    {
      name: 'Cosmetic Smile Design',
      description:
        'Whitening, bonding and porcelain veneers planned around your facial proportions.',
    },
    {
      name: 'Dental Implants',
      description:
        'Guided implant placement and restoration for a natural-looking replacement tooth.',
    },
    {
      name: 'Clear Aligners',
      description:
        'Discreet orthodontics with digital scans, progress checks and predictable staging.',
    },
    {
      name: 'Root Canal Therapy',
      description:
        'Microscope-assisted treatment designed to save infected teeth with less stress.',
    },
    {
      name: 'Emergency Dentistry',
      description:
        'Fast help for toothache, broken teeth, swelling, lost fillings and dental trauma.',
    },
  ],
}

/* Absolute URL helper. */
export const abs = (path = '/') =>
  `${siteConfig.siteUrl}${path.startsWith('/') ? path : `/${path}`}`

/**
 * Build the full JSON-LD @graph (Organization, WebSite, Dentist/LocalBusiness,
 * OfferCatalog, BreadcrumbList). Pure — safe to call at build time or runtime.
 */
export function buildJsonLd() {
  const c = siteConfig
  const orgId = abs('/#organization')
  const siteId = abs('/#website')
  const bizId = abs('/#business')

  const openingHoursSpecification = c.business.openingHours.map((b) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: b.days,
    opens: b.opens,
    closes: b.closes,
  }))

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': orgId,
        name: c.brand,
        url: abs('/'),
        logo: abs(c.logo),
        image: abs(c.ogImage),
        description: c.description,
        slogan: c.tagline,
        sameAs: c.sameAs,
      },
      {
        '@type': 'WebSite',
        '@id': siteId,
        url: abs('/'),
        name: c.brand,
        inLanguage: c.locale.replace('_', '-'),
        publisher: { '@id': orgId },
      },
      {
        '@type': 'Dentist',
        '@id': bizId,
        name: c.business.name,
        url: abs('/'),
        image: abs(c.ogImage),
        logo: abs(c.logo),
        description: c.description,
        priceRange: c.priceRange,
        telephone: c.business.telephone,
        email: c.business.email,
        parentOrganization: { '@id': orgId },
        address: {
          '@type': 'PostalAddress',
          streetAddress: c.business.streetAddress,
          addressLocality: c.business.addressLocality,
          postalCode: c.business.postalCode,
          addressRegion: c.business.addressRegion,
          addressCountry: c.business.addressCountry,
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: c.business.geo.lat,
          longitude: c.business.geo.lng,
        },
        openingHoursSpecification,
        areaServed: c.areaServed.map((name) => ({ '@type': 'City', name })),
        sameAs: c.sameAs,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Dental Services',
          itemListElement: c.services.map((s) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: s.name,
              description: s.description,
              provider: { '@id': bizId },
            },
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': abs('/#breadcrumb'),
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: abs('/'),
          },
        ],
      },
    ],
  }
}
