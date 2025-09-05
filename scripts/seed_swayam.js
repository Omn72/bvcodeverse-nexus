import { createClient } from '@supabase/supabase-js'
import { randomUUID } from 'crypto'

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY || process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_KEY environment variables.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function seed() {
  const userId = '00000000-0000-4000-8000-000000000001'
  const profileId = userId
  const statsId = '10000000-0000-4000-8000-000000000001'

  const profile = {
    id: profileId,
    user_id: userId,
    username: 'swayampolakhare123',
    full_name: 'Swayam Polakhare',
    email: 'swayam+test@example.com',
    college: 'Bharati Vidyapeeth College of Engineering',
    year: '3rd Year',
    branch: 'Computer Science Engineering',
    skills: ['React','TypeScript','Node'],
    bio: 'Test profile for Swayam. Created for public profile testing.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }

  const stats = {
    id: statsId,
    user_id: userId,
    total_points: 250,
    rank: 45,
    level: 'Intermediate',
    projects_completed: 3,
    contests_won: 1,
    badges_earned: 2,
    streak_days: 5,
    next_level_points: 500,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }

  console.log('Upserting profile...')
  const { data: pData, error: pErr } = await supabase.from('user_profiles').upsert(profile, { onConflict: 'user_id' }).select().single()
  if (pErr) {
    console.error('Profile upsert error:', pErr)
  } else {
    console.log('Profile upserted:', pData)
  }

  console.log('Upserting stats...')
  const { data: sData, error: sErr } = await supabase.from('user_stats').upsert(stats, { onConflict: 'user_id' }).select().single()
  if (sErr) {
    console.error('Stats upsert error:', sErr)
  } else {
    console.log('Stats upserted:', sData)
  }

  console.log('Done. Public profile should be available at /user/swayampolakhare123')
}

seed().catch((err) => {
  console.error('Seeding failed:', err)
  process.exit(1)
})
