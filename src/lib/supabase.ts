import { createClient } from '@supabase/supabase-js'

// Database Types
export interface UserProfile {
  id: string
  user_id: string
  username?: string
  full_name?: string
  phone?: string
  location?: string
  bio?: string
  github?: string
  linkedin?: string
  college?: string
  year?: string
  branch?: string
  skills?: string[]
  created_at?: string
  updated_at?: string
}

export interface UserStats {
  id: string
  user_id: string
  total_points: number
  rank: number
  level: string
  projects_completed: number
  contests_won: number
  badges_earned: number
  streak_days: number
  next_level_points: number
  created_at?: string
  updated_at?: string
}

// Replace these with your actual Supabase URL and anon key
// You can find these in your Supabase project settings
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper functions for authentication
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  return { data, error }
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export const resendConfirmation = async (email: string) => {
  const { data, error } = await supabase.auth.resend({
    type: 'signup',
    email: email,
  })
  return { data, error }
}

// Profile Management Functions
export const createUserProfile = async (userId: string, profileData: Partial<UserProfile>) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .insert({
      user_id: userId,
      ...profileData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select()
    .single()
  
  return { data, error }
}

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single()
  
  return { data, error }
}

export const updateUserProfile = async (userId: string, profileData: Partial<UserProfile>) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .update({
      ...profileData,
      updated_at: new Date().toISOString()
    })
    .eq('user_id', userId)
    .select()
    .single()
  
  return { data, error }
}

export const upsertUserProfile = async (userId: string, profileData: Partial<UserProfile>) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .upsert({
      user_id: userId,
      ...profileData,
      updated_at: new Date().toISOString()
    })
    .select()
    .single()
  
  return { data, error }
}

// User Stats Management Functions
export const createUserStats = async (userId: string, statsData: Partial<UserStats>) => {
  const { data, error } = await supabase
    .from('user_stats')
    .insert({
      user_id: userId,
      ...statsData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select()
    .single()
  
  return { data, error }
}

export const getUserStats = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_stats')
    .select('*')
    .eq('user_id', userId)
    .single()
  
  return { data, error }
}

export const updateUserStats = async (userId: string, statsData: Partial<UserStats>) => {
  const { data, error } = await supabase
    .from('user_stats')
    .update({
      ...statsData,
      updated_at: new Date().toISOString()
    })
    .eq('user_id', userId)
    .select()
    .single()
  
  return { data, error }
}

export const upsertUserStats = async (userId: string, statsData: Partial<UserStats>) => {
  const { data, error } = await supabase
    .from('user_stats')
    .upsert({
      user_id: userId,
      ...statsData,
      updated_at: new Date().toISOString()
    })
    .select()
    .single()
  
  return { data, error }
}

export const getAllUserStats = async () => {
  const { data, error } = await supabase
    .from('user_stats')
    .select(`
      *,
      user_profiles (
        full_name,
        college,
        year,
        branch
      )
    `)
    .order('total_points', { ascending: false })
  
  return { data, error }
}

// Search Functions
export const searchUsers = async (query: string, limit: number = 10) => {
  try {
    console.log('Searching with query:', query, 'limit:', limit)
    
    let queryBuilder = supabase
      .from('user_profiles')
      .select(`
        *,
        user_stats (
          total_points,
          rank,
          level
        )
      `)
      .not('full_name', 'is', null)
      .limit(limit)

    if (query && query.trim()) {
      // Search by username, full name, college, bio, and skills
      queryBuilder = queryBuilder.or(
        `username.ilike.%${query}%,full_name.ilike.%${query}%,college.ilike.%${query}%,bio.ilike.%${query}%`
      )
    }

    queryBuilder = queryBuilder.order('updated_at', { ascending: false })
    
    const { data, error } = await queryBuilder
    
    console.log('Search results:', { data, error })
    return { data, error }
  } catch (err) {
    console.error('Search error:', err)
    return { data: null, error: err }
  }
}

export const getRecentUsers = async (limit: number = 6) => {
  try {
    console.log('Getting recent users, limit:', limit)
    
    const { data, error } = await supabase
      .from('user_profiles')
      .select(`
        *,
        user_stats (
          total_points,
          rank,
          level
        )
      `)
      .not('username', 'is', null)
      .limit(limit)
      .order('updated_at', { ascending: false })
    
    console.log('Recent users result:', { data, error })
    return { data, error }
  } catch (err) {
    console.error('Get recent users error:', err)
    return { data: null, error: err }
  }
}

// Helper function to generate unique username
const generateUniqueUsername = async (email: string, userId: string) => {
  // Start with email prefix
  let baseUsername = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '')
  
  // Fallback to user ID prefix if email username is too short
  if (baseUsername.length < 3) {
    baseUsername = `user${userId.substring(0, 8)}`
  }
  
  let username = baseUsername
  let counter = 1
  
  // Check if username exists and increment until unique
  while (counter < 100) { // Prevent infinite loop
    const { data: existing } = await supabase
      .from('user_profiles')
      .select('username')
      .eq('username', username)
      .single()
    
    if (!existing) {
      return username
    }
    
    username = `${baseUsername}${counter}`
    counter++
  }
  
  // Final fallback with timestamp
  return `${baseUsername}${Date.now().toString().slice(-4)}`
}

// Initialize user profile and stats when they first sign up
export const initializeUserAccount = async (userId: string, email: string) => {
  try {
    console.log('Initializing user account for:', userId, email)
    
    // Generate unique username
    const username = await generateUniqueUsername(email, userId)
    console.log('Generated username:', username)
    
    // Create default profile
    const profileData = {
      user_id: userId,
      username: username,
      full_name: null,
      phone: null,
      location: null,
      bio: null,
      github: null,
      linkedin: null,
      college: null,
      year: null,
      branch: null,
      skills: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    const { data: profileResult, error: profileError } = await supabase
      .from('user_profiles')
      .upsert(profileData, { onConflict: 'user_id' })
      .select()

    if (profileError) {
      console.error('Error creating profile:', profileError)
      // Don't fail completely, just log the error
    } else {
      console.log('Profile created/updated:', profileResult)
    }

    // Create default stats
    const statsData = {
      user_id: userId,
      total_points: 0,
      rank: null,
      level: 'New Member',
      projects_completed: 0,
      contests_won: 0,
      badges_earned: 1, // First login badge
      streak_days: 0,
      next_level_points: 100,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    const { data: statsResult, error: statsError } = await supabase
      .from('user_stats')
      .upsert(statsData, { onConflict: 'user_id' })
      .select()

    if (statsError) {
      console.error('Error creating stats:', statsError)
      // Don't fail completely, just log the error
    } else {
      console.log('Stats created/updated:', statsResult)
    }

    return { success: true, username }
  } catch (error) {
    console.error('Error initializing user account:', error)
    return { success: false, error }
  }
}

// Get user profile by username for public profiles
export const getUserByUsername = async (username: string) => {
  try {
    console.log('Getting user by username:', username)
    
    const { data, error } = await supabase
      .from('user_profiles')
      .select(`
        *,
        user_stats (
          total_points,
          rank,
          level
        )
      `)
      .eq('username', username)
      .single()
    
    console.log('User profile result:', { data, error })
    return { data, error }
  } catch (err) {
    console.error('Error getting user by username:', err)
    return { data: null, error: err }
  }
}

// Generate profile URL for a user
export const getProfileUrl = (username: string) => {
  return `/${username}`
}
