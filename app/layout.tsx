import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { headers } from 'next/headers'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { siteConfig } from '@/lib/site-config'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-inter', display: 'swap' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin', 'latin-ext'], variable: '--font-heading', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Auro Dent',
    template: '%s | Auro Dent',
  },
  applicationName: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/favicons/apple-touch-icon.png',
  },
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const headerList = await headers()
  const locale = headerList.get('x-auro-locale') || 'sq'

  return (
    <html lang={locale} className={`${inter.variable} ${jakarta.variable}`}>
      <body>
        {children}
      </body>
    </html>
  )
}
