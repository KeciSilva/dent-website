// DEMO DATA - replace with real clinic information before production.
export const siteConfig = {
  name: 'Auro Dent',
  city: 'Tirana',
  country: 'Albania',
  address: 'Rruga e Demos 12, Tiranë 1001',
  phone: '+355 69 000 0000',
  email: 'info@aurodent.example',
  url: 'https://www.aurodent.example',
  logo: '/favicons/icon-512.png',
  ogImage: '/og/og-cover-1200x630.jpg',
  mapEmbed:
    'https://www.google.com/maps?q=Rruga%20e%20Demos%2012%20Tirana&output=embed',
  social: {
    instagram: 'https://instagram.com/aurodent_demo',
    facebook: 'https://facebook.com/aurodent-demo',
    linkedin: 'https://linkedin.com/company/aurodent-demo',
  },
  hours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '19:00' },
    { days: ['Saturday'], opens: '09:00', closes: '14:00' },
  ],
  team: [
    {
      id: 'elira-kodra',
      name: 'Dr. Elira Kodra',
      specialty: 'General and cosmetic dentistry',
      credential: 'Demo dentist profile',
      image: '/images/smile-face.jpg',
    },
    {
      id: 'arbri-hoxha',
      name: 'Dr. Arbri Hoxha',
      specialty: 'Implant and oral surgery planning',
      credential: 'Demo dentist profile',
      image: '/images/img2.png',
    },
    {
      id: 'mira-lika',
      name: 'Dr. Mira Lika',
      specialty: 'Orthodontics and aligners',
      credential: 'Demo dentist profile',
      image: '/images/img3.png',
    },
    {
      id: 'dea-prifti',
      name: 'Dr. Dea Prifti',
      specialty: 'Pediatric dentistry',
      credential: 'Demo dentist profile',
      image: '/images/consult.jpg',
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
