import './globals.css'
import type { Metadata } from 'next'
import { AuthProvider } from '@/context/auth-context'
import Header from '@/components/header'

export const metadata: Metadata = {
  title: 'Accenvix Solutions',
  description: 'Professional Company Portal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />
          <main>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}