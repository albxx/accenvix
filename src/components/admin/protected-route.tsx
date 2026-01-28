'use client'

import { useAuth } from '@/context/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isAdmin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // If not loading and no user, redirect to login
    if (!isLoading && !user) {
      router.push('/login')
    }

    // If user is not admin, redirect to home
    if (!isLoading && user && !isAdmin) {
      router.push('/')
    }
  }, [user, isLoading, isAdmin, router])

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  // If user is authenticated and is admin, show children
  if (user && isAdmin) {
    return <>{children}</>
  }

  // Otherwise show nothing (redirect will happen)
  return null
}