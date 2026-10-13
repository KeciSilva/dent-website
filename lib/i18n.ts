import { notFound } from 'next/navigation'
import en from '@/messages/en.json'
import sq from '@/messages/sq.json'
import { defaultLocale, isLocale, type Locale } from '@/lib/site-config'

const dictionaries = { en, sq }

export type Messages = typeof en

export async function getMessages(locale: string): Promise<Messages> {
  if (!isLocale(locale)) notFound()
  return dictionaries[locale] as Messages
}

export function localizedPath(locale: Locale, path = '') {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `/${locale}${normalized === '/' ? '' : normalized}`
}

export function stripLocale(pathname: string) {
  const parts = pathname.split('/').filter(Boolean)
  if (parts[0] && isLocale(parts[0])) {
    return `/${parts.slice(1).join('/')}`
  }
  return pathname || '/'
}

export function withDefaultLocale(path = '/') {
  return localizedPath(defaultLocale, path)
}
