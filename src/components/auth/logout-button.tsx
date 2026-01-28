'use client'

import { useAuth } from '@/context/auth-context'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const { signOut } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm font-medium text-gray-700 hover:text-gray-900"
    >
      Logout
    </button>
  )
}