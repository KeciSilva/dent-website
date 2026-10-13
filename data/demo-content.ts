// Treatment catalogue used across service cards, metadata and related links.
export const services = [
  {
    slug: 'general-dentistry',
    key: 'generalDentistry',
    durationKey: 'short',
    priceFrom: '2,500 ALL',
    image: '/images/dentist-patient-consultation.jpg',
    related: ['teeth-whitening', 'pediatric-dentistry', 'emergency-dental-care'],
  },
  {
    slug: 'teeth-whitening',
    key: 'teethWhitening',
    durationKey: 'whitening',
    priceFrom: '12,000 ALL',
    image: '/images/teeth-whitening-after.png',
    related: ['cosmetic-dentistry-veneers', 'general-dentistry', 'orthodontics-braces-aligners'],
  },
  {
    slug: 'dental-implants',
    key: 'dentalImplants',
    durationKey: 'caseBased',
    priceFrom: '55,000 ALL',
    image: '/images/digital-dental-scan.jpg',
    related: ['cosmetic-dentistry-veneers', 'general-dentistry', 'emergency-dental-care'],
  },
  {
    slug: 'orthodontics-braces-aligners',
    key: 'orthodontics',
    durationKey: 'caseBased',
    priceFrom: '85,000 ALL',
    image: '/images/modern-dental-treatment-room.jpg',
    related: ['teeth-whitening', 'pediatric-dentistry', 'general-dentistry'],
  },
  {
    slug: 'pediatric-dentistry',
    key: 'pediatricDentistry',
    durationKey: 'short',
    priceFrom: '2,000 ALL',
    image: '/images/pediatric-dentistry.png',
    related: ['general-dentistry', 'emergency-dental-care', 'orthodontics-braces-aligners'],
  },
  {
    slug: 'emergency-dental-care',
    key: 'emergencyCare',
    durationKey: 'sameDay',
    priceFrom: '3,000 ALL',
    image: '/images/urgent-dental-care.png',
    related: ['general-dentistry', 'dental-implants', 'pediatric-dentistry'],
  },
  {
    slug: 'cosmetic-dentistry-veneers',
    key: 'cosmeticVeneers',
    durationKey: 'visits',
    priceFrom: '28,000 ALL',
    image: '/images/smile-consultation.jpg',
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
