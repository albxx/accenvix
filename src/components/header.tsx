'use client'

import { useAuth } from '@/context/auth-context'
import Link from 'next/link'
import LogoutButton from '@/components/auth/logout-button'
import { Button } from '@/components/ui/button'
import ThemeToggle from '@/components/theme-toggle'

export default function Header() {
  const { user, isAdmin } = useAuth()

  return (
    <header className="bg-white shadow dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
                Accenvix Solutions
              </Link>
            </div>
            <nav className="ml-6 flex space-x-8">
              <Link href="/" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium dark:text-gray-300 dark:hover:text-gray-100">
                Home
              </Link>
              <Link href="/about" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium dark:text-gray-300 dark:hover:text-gray-100">
                About
              </Link>
              <Link href="/services" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium dark:text-gray-300 dark:hover:text-gray-100">
                Services
              </Link>
              <Link href="/portfolio" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium dark:text-gray-300 dark:hover:text-gray-100">
                Portfolio
              </Link>
              <Link href="/contact" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium dark:text-gray-300 dark:hover:text-gray-100">
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            {user ? (
              <>
                {isAdmin && (
                  <Link href="/admin">
                    <Button variant="secondary" size="sm" className="mr-2">
                      Admin
                    </Button>
                  </Link>
                )}
                <span className="mr-2 text-sm text-gray-500 hidden md:inline dark:text-gray-400">
                  Welcome, {user.email}
                </span>
                <LogoutButton />
              </>
            ) : (
              <div className="flex space-x-2">
                <Link href="/login">
                  <Button variant="secondary" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
