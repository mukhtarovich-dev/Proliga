import { auth as middleware } from 'app/api/auth/[...nextauth]/route'
import { NextResponse } from 'next/server'

import { i18nRouter } from 'next-i18n-router'
import i18nConfig from './lib/i18n.config'

const protectedRoutes = ['/settings', '/play']
const apiAuthPrefix = '/api/auth'

export const DEFAULT_LOGIN_REDIRECT = '/auth'

export default middleware((req) => {
  const i18nResponse = i18nRouter(req, i18nConfig)

  if (i18nResponse instanceof NextResponse) {
    return i18nResponse
  }

  const { nextUrl } = req
  const session = req.auth
  const isAuthorized = !!session
  const user = session?.user
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)

  const isListedProtectedRoute = protectedRoutes.some((route) =>
    nextUrl.pathname.includes(route)
  )

  if (isApiAuthRoute) {
    return undefined
  }

  if (!isAuthorized && isListedProtectedRoute) {
    return NextResponse.redirect(new URL(`/auth`, nextUrl))
  }

  if (isAuthorized && isListedProtectedRoute) {
    if (!user) {
      console.error(
        'Middleware: User object missing in session despite being authorized.'
      )
      return NextResponse.redirect(
        new URL(`${DEFAULT_LOGIN_REDIRECT}?error=session_error`, nextUrl)
      )
    }
  }

  return undefined
})

export const config = {
  matcher: '/((?!api|static|.*\\..*|_next|offline|offline.html|~offline).*)',
}
