import { createClient } from '@supabase/supabase-js'

// Supabase credentials
const supabaseUrl = 'https://falwqgxcjicucvjencrx.supabase.co'
const supabaseAnonKey = 'sb_publishable_kHYA_wuYfGGgGQmeAaBfHQ_U46fniFK'

// Create Supabase client with anon key (same as the frontend)
const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testLogin() {
  console.log('Testing login with admin credentials...')
  
  try {
    // Test login with admin credentials
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'admin@accenvix.com',
      password: 'admin123',
    })
    
    if (error) {
      console.error('Login failed:', error.message)
      return false
    } else {
      console.log('Login successful!')
      console.log('User ID:', data.user.id)
      console.log('User email:', data.user.email)
      
      // Sign out to clean up
      await supabase.auth.signOut()
      console.log('Signed out successfully')
      return true
    }
  } catch (err) {
    console.error('Login test failed:', err)
    return false
  }
}

testLogin()