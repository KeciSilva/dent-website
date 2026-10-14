import { NextResponse, type NextRequest } from 'next/server'
import { defaultLocale, isLocale } from '@/lib/site-config'

const PUBLIC_FILE = /\.(.*)$/

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico' ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next()
  }

  const first = pathname.split('/').filter(Boolean)[0]

  if (!first) {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url))
  }

  if (!isLocale(first)) {
    const legacyPath =
      ['/about', '/services', '/team', '/dentist', '/gallery', '/before-after', '/blog', '/faq', '/contact', '/privacy', '/international-patients'].includes(pathname) ||
      pathname.startsWith('/services/') || pathname.startsWith('/blog/')

    if (legacyPath) return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url))
    return NextResponse.next()
  }

  const response = NextResponse.next()
  response.headers.set('x-auro-locale', first)
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images|favicons|og).*)'],
}
