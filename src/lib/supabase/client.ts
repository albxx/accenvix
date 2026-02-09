import { createClient } from '@supabase/supabase-js'

// Define types for our project management system
export interface Project {
  id: string
  name: string
  description: string
  status: 'planning' | 'in-progress' | 'review' | 'completed'
  priority: 'low' | 'medium' | 'high'
  start_date: string
  end_date: string
  created_at: string
  updated_at: string
  owner_id: string
}

export interface Task {
  id: string
  project_id: string
  name: string
  description: string
  status: 'todo' | 'in-progress' | 'review' | 'completed'
  priority: 'low' | 'medium' | 'high'
  assignee_id: string
  start_date: string
  due_date: string
  estimated_hours: number
  actual_hours: number
  created_at: string
  updated_at: string
}

export interface TeamMember {
  id: string
  name: string
  email: string
  role: 'admin' | 'manager' | 'member'
  skills: string[]
  avatar_url: string
  created_at: string
}

export interface Resource {
  id: string
  name: string
  type: 'human' | 'equipment' | 'software'
  availability: string[] // Array of available time slots
  skills: string[]
  hourly_rate: number
  created_at: string
}

// Get Supabase credentials from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY

// Create Supabase client with functions support
export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
)

// Authentication helper functions
export const signIn = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  })
}

export const signOut = async () => {
  return await supabase.auth.signOut()
}

export const signUp = async (email: string, password: string) => {
  return await supabase.auth.signUp({
    email,
    password,
  })
}

export const getCurrentUser = async () => {
  return await supabase.auth.getUser()
}