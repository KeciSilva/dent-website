// Clinic configuration. Keep contact and business details centralized here.
export const siteConfig = {
  name: 'Auro Dent',
  city: 'Tirana',
  country: 'Albania',
  address: 'Rruga Sami Frashëri 12, Tiranë 1001',
  phone: '+355 69 123 4567',
  email: 'info@aurodent.al',
  url: 'https://www.aurodent.al',
  logo: '/favicons/icon-512.png',
  ogImage: '/og/og-cover-1200x630.jpg',
  mapEmbed:
    'https://www.google.com/maps?q=Rruga%20Sami%20Frash%C3%ABri%2012%20Tirana&output=embed',
  social: {
    instagram: 'https://instagram.com/aurodent',
    facebook: 'https://facebook.com/aurodent',
    linkedin: 'https://linkedin.com/company/aurodent',
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
      credential: 'Dentist and cosmetic care',
      image: '/images/smile-face.jpg',
    },
    {
      id: 'arbri-hoxha',
      name: 'Dr. Arbri Hoxha',
      specialty: 'Implant and oral surgery planning',
      credential: 'Implant and oral surgery care',
      image: '/images/img2.png',
    },
    {
      id: 'mira-lika',
      name: 'Dr. Mira Lika',
      specialty: 'Orthodontics and aligners',
      credential: 'Orthodontic care',
      image: '/images/img3.png',
    },
    {
      id: 'dea-prifti',
      name: 'Dr. Dea Prifti',
      specialty: 'Pediatric dentistry',
      credential: 'Pediatric dental care',
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
