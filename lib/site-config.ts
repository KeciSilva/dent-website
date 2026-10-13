// DEMO DATA: replace with real clinic information before production.
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://auro-dent.netlify.app'
export const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING !== 'false'

export const siteConfig = {
  name: 'Auro Dent',
  city: 'Tirana',
  country: 'Albania',
  address: 'Rruga Sami Frashëri 12, Tiranë 1001',
  phone: '+355 69 000 0000',
  email: 'info@aurodent.example',
  url: siteUrl,
  logo: '/favicons/icon-512.png',
  ogImage: '/og/og-cover-1200x630.jpg',
  mapEmbed:
    'https://www.google.com/maps?q=Rruga%20Sami%20Frash%C3%ABri%2012%20Tirana&output=embed',
  social: {},
  hours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '19:00' },
    { days: ['Saturday'], opens: '09:00', closes: '14:00' },
  ],
  team: [
    {
      id: 'elira-kodra',
      name: 'Dr. Elira Kodra',
      specialtyKey: 'generalCosmetic',
      credentialKey: 'demoProfile',
      image: '/images/smile-consultation.jpg',
    },
    {
      id: 'arbri-hoxha',
      name: 'Dr. Arbri Hoxha',
      specialtyKey: 'implantSurgery',
      credentialKey: 'demoProfile',
      image: '/images/implant-planning.png',
    },
    {
      id: 'mira-lika',
      name: 'Dr. Mira Lika',
      specialtyKey: 'orthodontics',
      credentialKey: 'demoProfile',
      image: '/images/orthodontic-aligners.png',
    },
    {
      id: 'dea-prifti',
      name: 'Dr. Dea Prifti',
      specialtyKey: 'pediatric',
      credentialKey: 'demoProfile',
      image: '/images/dentist-patient-consultation.jpg',
    },
  ],
  testimonials: [
    { name: 'Arta', service: 'Dental implants', textKey: 'arta' },
    { name: 'Besnik', service: 'Emergency dental care', textKey: 'besnik' },
    { name: 'Megi', service: 'Teeth whitening', textKey: 'megi' },
  ],
} as const

export type Locale = 'sq' | 'en'

export const locales: Locale[] = ['sq', 'en']
export const defaultLocale: Locale = 'sq'

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}
