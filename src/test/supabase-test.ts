// Simple test to verify Supabase client initialization
import { supabase } from '../lib/supabase/client'

console.log('Testing Supabase client initialization...')

// Check if supabaseUrl is properly configured
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('Supabase URL:', supabaseUrl ? '✓ Configured' : '✗ Missing')
console.log('Supabase Anon Key:', supabaseAnonKey ? '✓ Configured' : '✗ Missing')

if (supabaseUrl && supabaseAnonKey) {
  console.log('Supabase client initialized successfully!')
  console.log('Client object exists:', !!supabase)
} else {
  console.error('Supabase client initialization failed!')
  console.error('Missing environment variables:')
  if (!supabaseUrl) console.error('- VITE_SUPABASE_URL')
  if (!supabaseAnonKey) console.error('- VITE_SUPABASE_ANON_KEY')
}