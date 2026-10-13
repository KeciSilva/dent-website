import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { headers } from 'next/headers'
import { allowIndexing, siteConfig } from '@/lib/site-config'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Auro Dent',
    template: '%s | Auro Dent',
  },
  applicationName: siteConfig.name,
  robots: {
    index: allowIndexing,
    follow: allowIndexing,
    googleBot: {
      index: allowIndexing,
      follow: allowIndexing,
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
    <html lang={locale}>
      <body>
        {children}
      </body>
    </html>
  )
}
