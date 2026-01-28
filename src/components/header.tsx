'use client'

import { useAuth } from '@/context/auth-context'
import Link from 'next/link'
import LogoutButton from '@/components/auth/logout-button'

export default function Header() {
  const { user, isAdmin } = useAuth()

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-blue-600">
                Accenvix Solutions
              </Link>
            </div>
            <nav className="ml-6 flex space-x-8">
              <Link href="/" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Home
              </Link>
              <Link href="/about" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                About
              </Link>
              <Link href="/services" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Services
              </Link>
              <Link href="/portfolio" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Portfolio
              </Link>
              <Link href="/contact" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex items-center">
            {user ? (
              <>
                {isAdmin && (
                  <Link href="/admin" className="mr-4 text-sm font-medium text-gray-700 hover:text-gray-900">
                    Admin
                  </Link>
                )}
                <span className="mr-4 text-sm text-gray-500 hidden md:inline">
                  Welcome, {user.email}
                </span>
                <LogoutButton />
              </>
            ) : (
              <div className="flex space-x-4">
                <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                  Login
                </Link>
                <Link href="/register" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}