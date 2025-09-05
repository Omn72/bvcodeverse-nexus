import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ghtrbnqzsphmqkormffw.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdodHJibnF6c3BobXFrb3JtZmZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwNjUyOTUsImV4cCI6MjA3MjY0MTI5NX0.V_Il6kJ_zpyw_ZcE5mJQCoer1Gv0ypr8FDvRm7Q-2CU'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
  console.log('🔍 Testing Supabase Connection...')
  console.log('URL:', supabaseUrl)
  console.log('Key:', supabaseAnonKey.substring(0, 50) + '...')
  
  try {
    // Test 1: Basic connection
    console.log('\n1️⃣ Testing basic connection...')
    const { data, error } = await supabase.from('contests').select('count')
    
    if (error) {
      console.error('❌ Connection failed:', error.message)
      
      if (error.message.includes('relation "contests" does not exist')) {
        console.log('\n🚨 TABLES NOT CREATED!')
        console.log('Run the database-setup.sql in your Supabase dashboard')
      } else {
        console.log('Error code:', error.code)
        console.log('Error details:', error.details)
      }
      return
    }
    
    console.log('✅ Connection successful!')
    
    // Test 2: Try to get contests
    console.log('\n2️⃣ Testing contests query...')
    const { data: contests, error: contestsError } = await supabase
      .from('contests')
      .select('*')
    
    if (contestsError) {
      console.error('❌ Query failed:', contestsError.message)
    } else {
      console.log(`✅ Found ${contests?.length || 0} contests`)
      if (contests && contests.length > 0) {
        console.log('Contest titles:', contests.map(c => c.title))
      }
    }
    
  } catch (err) {
    console.error('❌ Unexpected error:', err.message)
  }
}

testConnection()
