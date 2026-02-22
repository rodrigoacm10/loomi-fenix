import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  const publicPages = ['/login', '/register', '/forgot-password']

  const pathname = request.nextUrl.pathname

  const isPublicPage = publicPages.some(
    (page) =>
      pathname === page ||
      pathname.startsWith(`/pt${page}`) ||
      pathname.startsWith(`/en${page}`),
  )

  const isRoot = pathname === '/' || pathname === '/pt' || pathname === '/en'

  const token = request.cookies.get('token')?.value

  if (!token && !isPublicPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (token && (isPublicPage || isRoot)) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/', '/(pt|en)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
}
