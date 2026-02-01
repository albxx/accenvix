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

// User mapping with their Supabase auth IDs
const userMapping = [
  { 
    email: 'admin@accenvix.com', 
    authId: '1e260d87-dc1a-4ea8-8e1d-3ff32676773c',
    name: 'Admin User',
    role: 'admin'
  },
  { 
    email: 'pm@accenvix.com', 
    authId: '9ae94a7e-e67b-4c59-a95a-ced829db684e',
    name: 'Project Manager',
    role: 'manager'
  },
  { 
    email: 'dev@accenvix.com', 
    authId: '073c4cdb-7d3c-44e0-9570-85a0638487fa',
    name: 'Developer',
    role: 'member'
  },
  { 
    email: 'design@accenvix.com', 
    authId: 'd01434d5-663d-4cb0-877e-0d1f5a3da13d',
    name: 'Designer',
    role: 'member'
  }
]

async function updateTeamMembers() {
  console.log('Updating team members with auth IDs...')
  
  for (const user of userMapping) {
    try {
      // Update the team_members table to set the ID to match the auth ID
      const { data, error } = await supabase
        .from('team_members')
        .update({ id: user.authId })
        .eq('email', user.email)
      
      if (error) {
        console.error(`Error updating user ${user.email}:`, error.message)
      } else {
        console.log(`Successfully updated user: ${user.email} with auth ID: ${user.authId}`)
      }
    } catch (err) {
      console.error(`Failed to update user ${user.email}:`, err)
    }
  }
  
  console.log('Team members update process completed.')
}

updateTeamMembers()