import { createClient } from '@supabase/supabase-js'

// Supabase credentials
const supabaseUrl = 'https://falwqgxcjicucvjencrx.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhbHdxZ3hjamljdWN2amVuY3J4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTU4NjMwOSwiZXhwIjoyMDg1MTYyMzA5fQ.QypjkQtF-AsrRuUgj37SKpFYWm7a27HNr-BOmqN3hOU'

// Create Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Users to create
const users = [
  { email: 'admin@accenvix.com', password: 'admin123', role: 'admin' },
  { email: 'pm@accenvix.com', password: 'manager123', role: 'manager' },
  { email: 'dev@accenvix.com', password: 'dev123', role: 'member' },
  { email: 'design@accenvix.com', password: 'design123', role: 'member' }
]

async function createUsers() {
  console.log('Creating authentication users...')
  
  for (const user of users) {
    try {
      // Create auth user
      const { data, error } = await supabase.auth.admin.createUser({
        email: user.email,
        password: user.password,
        email_confirm: true
      })
      
      if (error) {
        console.error(`Error creating user ${user.email}:`, error.message)
      } else {
        console.log(`Successfully created user: ${user.email}`)
        
        // Get the user ID and update the team_members table
        if (data.user) {
          console.log(`User ID: ${data.user.id}`)
        }
      }
    } catch (err) {
      console.error(`Failed to create user ${user.email}:`, err)
    }
  }
  
  console.log('User creation process completed.')
}

createUsers()