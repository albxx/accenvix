import { createClient } from '@supabase/supabase-js'

// Supabase credentials
const supabaseUrl = 'https://falwqgxcjicucvjencrx.supabase.co'
const supabaseAnonKey = 'sb_publishable_kHYA_wuYfGGgGQmeAaBfHQ_U46fniFK'

// Create Supabase client with anon key (same as the frontend)
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Test users
const testUsers = [
  { email: 'admin@accenvix.com', password: 'admin123', role: 'admin' },
  { email: 'pm@accenvix.com', password: 'manager123', role: 'manager' },
  { email: 'dev@accenvix.com', password: 'dev123', role: 'member' },
  { email: 'design@accenvix.com', password: 'design123', role: 'member' }
]

async function testAllLogins() {
  console.log('Testing all login credentials...\n')
  
  let successCount = 0
  
  for (const user of testUsers) {
    try {
      console.log(`Testing ${user.email} (${user.role})...`)
      
      // Test login
      const { data, error } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: user.password,
      })
      
      if (error) {
        console.error(`❌ Login failed for ${user.email}:`, error.message)
      } else {
        console.log(`✅ Login successful for ${user.email}`)
        successCount++
        
        // Sign out to clean up
        await supabase.auth.signOut()
      }
      console.log('') // Empty line for readability
    } catch (err) {
      console.error(`❌ Login test failed for ${user.email}:`, err)
    }
  }
  
  console.log(`\nSummary: ${successCount}/${testUsers.length} logins successful`)
  
  if (successCount === testUsers.length) {
    console.log('🎉 All login credentials are working correctly!')
  } else {
    console.log('⚠️  Some login credentials may need attention.')
  }
}

testAllLogins()