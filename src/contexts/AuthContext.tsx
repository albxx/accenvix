import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabase, signIn, signOut, getCurrentUser } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null
  signIn: (email: string, password: string) => Promise<any>
  signOut: () => Promise<any>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check active session
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          // Handle invalid/expired session gracefully
          console.log('Session check:', error.message)
          setUser(null)
        } else if (session) {
          // Only set user if we have a valid session
          const { data: { user } } = await supabase.auth.getUser()
          setUser(user)
        } else {
          // No session - this is normal for unauthenticated users
          setUser(null)
        }
      } catch (error) {
        console.error('Error checking session:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const handleSignIn = async (email: string, password: string) => {
    return await signIn(email, password)
  }

  const handleSignOut = async () => {
    return await signOut()
  }

  const value = {
    user,
    signIn: handleSignIn,
    signOut: handleSignOut,
    loading
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}