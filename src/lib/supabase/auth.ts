// Supabase authentication utilities
import { supabase } from './client'
import { User } from '@supabase/supabase-js'

// Sign up a new user
export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  return { data, error }
}

// Sign in an existing user
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  return { data, error }
}

// Sign out the current user
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

// Get the current user
export async function getCurrentUser(): Promise<User | null> {
  const { data, error } = await supabase.auth.getUser()

  if (error) {
    console.error('Error getting current user:', error)
    return null
  }

  return data.user || null
}

// Get user session
export async function getSession() {
  const { data, error } = await supabase.auth.getSession()

  if (error) {
    console.error('Error getting session:', error)
    return null
  }

  return data.session
}

// Listen for auth state changes
export function onAuthStateChange(callback: (event: string, session: any) => void) {
  const { data: listener } = supabase.auth.onAuthStateChange(callback)
  return listener
}