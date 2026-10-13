// Treatment catalogue used across service cards, metadata and related links.
export const services = [
  {
    slug: 'general-dentistry',
    key: 'generalDentistry',
    duration: '30-45 min',
    priceFrom: 'from 2,500 ALL',
    image: '/images/consult.jpg',
    related: ['teeth-whitening', 'pediatric-dentistry', 'emergency-dental-care'],
  },
  {
    slug: 'teeth-whitening',
    key: 'teethWhitening',
    duration: '60-90 min',
    priceFrom: 'from 12,000 ALL',
    image: '/images/after.png',
    related: ['cosmetic-dentistry-veneers', 'general-dentistry', 'orthodontics-braces-aligners'],
  },
  {
    slug: 'dental-implants',
    key: 'dentalImplants',
    duration: 'case based',
    priceFrom: 'from 55,000 ALL',
    image: '/images/scan.jpg',
    related: ['cosmetic-dentistry-veneers', 'general-dentistry', 'emergency-dental-care'],
  },
  {
    slug: 'orthodontics-braces-aligners',
    key: 'orthodontics',
    duration: 'case based',
    priceFrom: 'from 85,000 ALL',
    image: '/images/suite.jpg',
    related: ['teeth-whitening', 'pediatric-dentistry', 'general-dentistry'],
  },
  {
    slug: 'pediatric-dentistry',
    key: 'pediatricDentistry',
    duration: '30-45 min',
    priceFrom: 'from 2,000 ALL',
    image: '/images/img4.png',
    related: ['general-dentistry', 'emergency-dental-care', 'orthodontics-braces-aligners'],
  },
  {
    slug: 'emergency-dental-care',
    key: 'emergencyCare',
    duration: 'same day when available',
    priceFrom: 'from 3,000 ALL',
    image: '/images/img1.png',
    related: ['general-dentistry', 'dental-implants', 'pediatric-dentistry'],
  },
  {
    slug: 'cosmetic-dentistry-veneers',
    key: 'cosmeticVeneers',
    duration: '2-3 visits',
    priceFrom: 'from 28,000 ALL',
    image: '/images/smile-face.jpg',
    related: ['teeth-whitening', 'orthodontics-braces-aligners', 'dental-implants'],
  },
] as const

export const blogPosts = [
  {
    slug: 'how-often-visit-dentist',
    key: 'visitDentist',
    date: '2026-09-12',
    serviceSlug: 'general-dentistry',
  },
  {
    slug: 'teeth-whitening-what-to-expect',
    key: 'whiteningExpect',
    date: '2026-09-20',
    serviceSlug: 'teeth-whitening',
  },
  {
    slug: 'caring-for-childrens-teeth',
    key: 'childrensTeeth',
    date: '2026-10-02',
    serviceSlug: 'pediatric-dentistry',
  },
  {
    slug: 'dental-implants-aftercare',
    key: 'implantAftercare',
    date: '2026-10-08',
    serviceSlug: 'dental-implants',
  },
] as const

export type ServiceSlug = (typeof services)[number]['slug']
export type BlogSlug = (typeof blogPosts)[number]['slug']

export function getService(slug: string) {
  return services.find((service) => service.slug === slug)
}

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}
