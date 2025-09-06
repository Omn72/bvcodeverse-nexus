// Quick database test
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'missing'
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'missing'

console.log('Testing Supabase connection...')
console.log('URL:', supabaseUrl.substring(0, 20) + '...')
console.log('Key:', supabaseAnonKey.substring(0, 20) + '...')

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false
  },
  realtime: {
    timeout: 5000
  }
})

// Test connection with timeout
const testWithTimeout = async () => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout
  
  try {
    console.log('Testing database connection...')
    
    const { data, error } = await supabase
      .from('contests')
      .select('count(*)')
      .limit(1)
      .abortSignal(controller.signal)
    
    clearTimeout(timeoutId)
    
    if (error) {
      console.error('Database error:', error)
      return false
    }
    
    console.log('Database connection successful!')
    console.log('Data:', data)
    return true
    
  } catch (err) {
    clearTimeout(timeoutId)
    if (err.name === 'AbortError') {
      console.error('Database connection timed out after 5 seconds')
    } else {
      console.error('Connection error:', err)
    }
    return false
  }
}

testWithTimeout().then(success => {
  if (success) {
    console.log('✅ Database is working')
  } else {
    console.log('❌ Database connection failed')
  }
  process.exit(0)
})
