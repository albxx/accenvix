import { createMiddlewareClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Check if the request is for an admin route
  if (req.nextUrl.pathname.startsWith('/admin')) {
    // If no session, redirect to login
    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    // Check if user is admin (this would require a DB query)
    // For now, we'll allow authenticated users to access admin routes
    // The client-side protection will handle actual admin checks
  }

  return res
}

export const config = {
  matcher: ['/admin/:path*'],
}