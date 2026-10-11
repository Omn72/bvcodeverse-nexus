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

// Contest Types
export interface Contest {
  id: string
  title: string
  description: string
  category: string
  prize_pool: string
  duration: string
  max_team_size: number
  deadline: string
  status: 'Draft' | 'Open' | 'Closed'
  created_at?: string
  updated_at?: string
  created_by?: string
}

export interface ContestApplication {
  id: string
  contest_id: string
  user_id: string
  applicant_name: string
  applicant_email: string
  project_name: string
  project_description: string
  tech_stack: string
  github_link?: string
  demo_link?: string
  team_members?: string
  status: 'Pending' | 'Approved' | 'Rejected'
  created_at?: string
  updated_at?: string
}

// Supabase URL and anon key
// Uses Vite env if present, otherwise falls back to the dev values in test-db.js for convenience
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ghtrbnqzsphmqkormffw.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdodHJibnF6c3BobXFrb3JtZmZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwNjUyOTUsImV4cCI6MjA3MjY0MTI5NX0.V_Il6kJ_zpyw_ZcE5mJQCoer1Gv0ypr8FDvRm7Q-2CU'

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('[Supabase] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY missing. Using fallback dev credentials. Set env vars for production.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Minimal debug info (safe to show in UI). Does NOT expose keys.
export const getSupabaseInfo = () => ({
  url: supabaseUrl,
  isFallback:
    !import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY,
})

// Public REST params (anon key is public in clients)
export const getSupabaseRestParams = () => ({
  url: supabaseUrl,
  anonKey: supabaseAnonKey,
})

// Low-level REST fetch with timeout
async function restFetch(path: string, init: RequestInit & { timeoutMs?: number } = {}) {
  const { url, anonKey } = getSupabaseRestParams()
  const controller = new AbortController()
  const timeoutMs = init.timeoutMs ?? 7000
  const t = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const resp = await fetch(`${url}${path}`, {
      ...init,
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
        'Content-Type': 'application/json',
        ...(init.headers || {}),
      },
      signal: controller.signal,
    })
    const text = await resp.text()
    let json: any = null
    try { json = text ? JSON.parse(text) : null } catch {}
    if (!resp.ok) {
      const msg = json?.message || `REST ${resp.status}`
      return { ok: false, status: resp.status, body: json, error: { message: msg } }
    }
    return { ok: true, status: resp.status, body: json }
  } catch (e: any) {
    if (e?.name === 'AbortError') return { ok: false, status: 0, body: null, error: { message: 'REST timeout' } }
    return { ok: false, status: 0, body: null, error: { message: e?.message || 'REST failed' } }
  } finally {
    clearTimeout(t)
  }
}

// REST fallbacks
async function getAllContestsRest() {
  const q = await restFetch(`/rest/v1/contests?select=*&order=created_at.desc`, { timeoutMs: 7000 })
  if (!q.ok) return { data: null, error: q.error }
  return { data: q.body as any[], error: null }
}

async function getAllApplicationsRest() {
  const q = await restFetch(`/rest/v1/contest_applications?select=*&order=created_at.desc`, { timeoutMs: 7000 })
  if (!q.ok) return { data: null, error: q.error }
  return { data: q.body as any[], error: null }
}

async function createContestRest(contestData: Omit<Contest, 'id' | 'created_at' | 'updated_at'>) {
  const payload = {
    ...contestData,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
  const q = await restFetch(`/rest/v1/contests`, {
    method: 'POST',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify(payload),
    timeoutMs: 8000,
  })
  if (!q.ok) return { data: null, error: q.error }
  const arr = Array.isArray(q.body) ? q.body : [q.body]
  return { data: arr[0], error: null }
}

async function deleteContestRest(contestId: string) {
  const q = await restFetch(`/rest/v1/contests?id=eq.${encodeURIComponent(contestId)}`, {
    method: 'DELETE',
    headers: { Prefer: 'return=representation' },
    timeoutMs: 8000,
  })
  if (!q.ok) return { data: null, error: q.error }
  return { data: q.body, error: null }
}

async function getActiveContestsRest() {
  const q = await restFetch(`/rest/v1/contests?status=eq.Open&select=*&order=created_at.desc`, { timeoutMs: 7000 })
  if (!q.ok) return { data: null, error: q.error }
  return { data: q.body as any[], error: null }
}

async function submitApplicationRest(applicationData: Omit<ContestApplication, 'id' | 'created_at' | 'updated_at' | 'status'>) {
  const payload = {
    ...applicationData,
  status: 'Approved',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
  const q = await restFetch(`/rest/v1/contest_applications`, {
    method: 'POST',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify(payload),
    timeoutMs: 8000,
  })
  if (!q.ok) return { data: null, error: q.error }
  const arr = Array.isArray(q.body) ? q.body : [q.body]
  return { data: arr[0], error: null }
}

// REST: get applications by user with basic contest join
async function getApplicationsByUserRest(userId: string) {
  const path = `/rest/v1/contest_applications?user_id=eq.${encodeURIComponent(
    userId
  )}&select=*,contests(title,category,status,deadline)&order=created_at.desc`
  // Use a shorter timeout to avoid blocking the UI too long; UI will show cached results meanwhile
  const q = await restFetch(path, { timeoutMs: 4000 })
  if (!q.ok) return { data: null, error: q.error }
  return { data: (q.body as any[]) || [], error: null }
}

// REST: update application for the current user (limited fields)
async function updateMyApplicationRest(
  applicationId: string,
  userId: string,
  updates: Partial<Pick<ContestApplication, 'github_link' | 'team_members' | 'tech_stack' | 'project_description'>>
) {
  const payload = {
    ...updates,
    updated_at: new Date().toISOString(),
  }
  const path = `/rest/v1/contest_applications?id=eq.${encodeURIComponent(
    applicationId
  )}&user_id=eq.${encodeURIComponent(userId)}`
  const q = await restFetch(path, {
    method: 'PATCH',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify(payload),
    timeoutMs: 8000,
  })
  if (!q.ok) return { data: null, error: q.error }
  const arr = Array.isArray(q.body) ? q.body : [q.body]
  return { data: arr[0], error: null }
}

// Utility: enforce a max time for any async call
async function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  let timeoutId: any
  const timeout = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      const err = new Error(`${label} timeout after ${ms}ms`)
      ;(err as any).code = 'ETIMEOUT'
      reject(err)
    }, ms)
  })
  try {
    const result = await Promise.race([promise, timeout]) as T
    return result
  } finally {
    clearTimeout(timeoutId)
  }
}

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

export const getUserProfileById = async (id: string) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', id)
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

// Get user profile by username for public profiles
export const getUserByUsername = async (username: string) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('username', username.toLowerCase())
    .single()

  if (error || !data) {
    return { data: null, error }
  }

  // Get stats for the user
  const { data: stats } = await supabase
    .from('user_stats')
    .select('total_points, rank, level')
    .eq('user_id', data.user_id || data.id)
    .single()

  return {
    data: {
      ...data,
      user_stats: stats || { total_points: 0, rank: 0, level: 1 }
    },
    error: null
  }
}

// Search Functions
export const searchUsers = async (query: string, limit: number = 10) => {
  try {
    console.log('Searching with query:', query, 'limit:', limit)
    
    let queryBuilder = supabase
      .from('user_profiles')
      .select('*')
      .not('full_name', 'is', null)
      .limit(limit)

    if (query && query.trim()) {
      queryBuilder = queryBuilder.or(
        `username.ilike.%${query}%,full_name.ilike.%${query}%,college.ilike.%${query}%,bio.ilike.%${query}%`
      )
    }

    queryBuilder = queryBuilder.order('updated_at', { ascending: false })
    
    const { data: profilesData, error } = await queryBuilder
    
    if (error) {
      console.error('Search error:', error)
      return { data: [], error }
    }

    const profilesWithStats = await Promise.all(
      (profilesData || []).map(async (profile) => {
        const { data: stats } = await supabase
          .from('user_stats')
          .select('total_points, rank, level')
          .eq('user_id', profile.id)
          .single()
        
        return {
          ...profile,
          user_stats: stats || { total_points: 0, rank: 0, level: 1 }
        }
      })
    )
    
    console.log('Search results:', { data: profilesWithStats, error: null })
    return { data: profilesWithStats, error: null }
  } catch (err) {
    console.error('Search error:', err)
    return { data: [], error: err }
  }
}

export const getRecentUsers = async (limit: number = 6) => {
  try {
    console.log('Getting recent users, limit:', limit)
    
    const { data: profilesData, error } = await supabase
      .from('user_profiles')
      .select('*')
      .not('full_name', 'is', null)
      .order('created_at', { ascending: false })
      .limit(limit)
    
    if (error) {
      console.error('Error fetching recent users:', error)
      return { data: [], error }
    }

    const profilesWithStats = await Promise.all(
      (profilesData || []).map(async (profile) => {
        const { data: stats } = await supabase
          .from('user_stats')
          .select('total_points, rank, level')
          .eq('user_id', profile.id)
          .single()
        
        return {
          ...profile,
          user_stats: stats || { total_points: 0, rank: 0, level: 1 }
        }
      })
    )
    
    console.log('Recent users result:', { data: profilesWithStats, error: null })
    return { data: profilesWithStats, error: null }
  } catch (err) {
    console.error('Error getting recent users:', err)
    return { data: [], error: err }
  }
}

// Helper function to generate unique username
const generateUniqueUsername = async (email: string, userId: string) => {
  let baseUsername = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '')
  
  if (baseUsername.length < 3) {
    baseUsername = `user${userId.substring(0, 8)}`
  }
  
  let username = baseUsername
  let counter = 1
  
  while (counter < 100) {
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
  
  return `${baseUsername}${Date.now().toString().slice(-4)}`
}

// Initialize user profile and stats when they first sign up
export const initializeUserAccount = async (userId: string, email: string) => {
  try {
    console.log('Initializing user account for:', userId, email)
    
    const username = await generateUniqueUsername(email, userId)
    console.log('Generated username:', username)
    
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
    } else {
      console.log('Profile created/updated:', profileResult)
    }

    const statsData = {
      user_id: userId,
      total_points: 0,
      rank: null,
      level: 'New Member',
      projects_completed: 0,
      contests_won: 0,
      badges_earned: 1,
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
    } else {
      console.log('Stats created/updated:', statsResult)
    }

    return { success: true, username }
  } catch (error) {
    console.error('Error initializing user account:', error)
    return { success: false, error }
  }
}

// Contest Management Functions
// Database connection warmup function
export const warmupDatabase = async () => {
  try {
    console.log('Warming up database connection...')
    const { data, error } = await supabase
      .from('contests')
      .select('id')
      .limit(1)
    
    if (error) {
      const msg = (error && (error.message || (error as any).code)) || String(error)

      // Common case: SQL not run yet
      if (msg.includes('relation "contests" does not exist')) {
        console.warn('Database tables not found. Please run the SQL setup: DATABASE_SETUP_REQUIRED.md -> database-setup.sql')
        return {
          success: false,
          error: { message: 'Database not initialized: run database-setup.sql in your Supabase project (see DATABASE_SETUP_REQUIRED.md)' },
        }
      }

      // Network / fetch errors when the Supabase host cannot be reached
      if (msg.toLowerCase().includes('fetch failed') || msg.toLowerCase().includes('network') || msg.toLowerCase().includes('failed to fetch')) {
        console.error('Network error while contacting Supabase:', error)
        return {
          success: false,
          error: { message: 'Network error: unable to reach Supabase. Check internet connection, firewall, or proxy settings.' },
        }
      }

      console.error('Database warmup failed:', error)
      return { success: false, error }
    }

    console.log('Database connection warmed up successfully')
    return { success: true, error: null }
  } catch (err: any) {
    console.error('Database warmup error:', err)
    return { success: false, error: err }
  }
}

export const createContest = async (contestData: Omit<Contest, 'id' | 'created_at' | 'updated_at'>): Promise<any> => {
  // Prefer REST first to avoid SDK timeouts in some browsers
  const rest = await createContestRest(contestData)
  if (rest.data || !rest.error) return rest
  // If REST fails for some reason, try SDK as a secondary option
  try {
    const builder = supabase
      .from('contests')
      .insert({
        ...contestData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single()
    const { data, error } = await withTimeout<any>(
      Promise.resolve(builder as any),
      6000,
      'createContest'
    )
    return { data, error }
  } catch (error: any) {
    return { data: null, error }
  }
}

export const getAllContests = async () => {
  try {
    // Prefer REST first to avoid SDK timeouts in some environments
    const rest = await getAllContestsRest()
    if (rest.data) return rest

    // If REST fails, try SDK as a secondary option
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

    const builder = supabase
      .from('contests')
      .select('*')
      .order('created_at', { ascending: false })
      .abortSignal(controller.signal)

    const { data, error } = await withTimeout<any>(
      Promise.resolve(builder as any),
      6000,
      'getAllContests'
    )

    clearTimeout(timeoutId)
    if (error) return { data, error }
    return { data, error: null }
  } catch (error) {
    if ((error as any).name === 'AbortError' || (error as any).code === 'ETIMEOUT') {
      // Final fallback to REST
      const rest = await getAllContestsRest()
      if (rest.data) return rest
      return { data: null, error: { message: 'Database connection timeout' } };
    }
    console.error('Error in getAllContests:', error);
    return { data: null, error };
  }
}

export const getActiveContests = async () => {
  // Prefer REST first
  const rest = await getActiveContestsRest()
  if (rest.data) return rest
  const { data, error } = await supabase
    .from('contests')
    .select('*')
    .eq('status', 'Open')
    .order('created_at', { ascending: false })
  return { data, error }
}

export const updateContest = async (contestId: string, updates: Partial<Contest>) => {
  const { data, error } = await supabase
    .from('contests')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', contestId)
    .select()
    .single()
  
  return { data, error }
}

export const deleteContest = async (contestId: string) => {
  // Prefer REST first to avoid SDK timeouts in some browsers
  const rest = await deleteContestRest(contestId)
  if (rest.data || !rest.error) return rest
  try {
    const builder = supabase
      .from('contests')
      .delete()
      .eq('id', contestId)
    const { data, error } = await withTimeout<any>(
      Promise.resolve(builder as any),
      6000,
      'deleteContest'
    )
    return { data, error }
  } catch (err: any) {
    return { data: null, error: { message: err.message || 'Unexpected error' } }
  }
}

// Contest Application Functions  
export const submitContestApplication = async (applicationData: Omit<ContestApplication, 'id' | 'created_at' | 'updated_at' | 'status'>): Promise<any> => {
  // Prefer REST first to avoid SDK timeouts
  const rest = await submitApplicationRest(applicationData)
  if (rest.data || !rest.error) return rest
  const { data, error } = await supabase
    .from('contest_applications')
    .insert({
      ...applicationData,
      status: 'Approved',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select()
    .single()
  return { data, error }
}

// Bulk approve: set all Pending applications to Approved (REST-first)
async function approveAllPendingApplicationsRest() {
  const q = await restFetch(`/rest/v1/contest_applications?status=eq.Pending`, {
    method: 'PATCH',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify({ status: 'Approved', updated_at: new Date().toISOString() }),
    timeoutMs: 10000,
  })
  if (!q.ok) return { data: null, error: q.error }
  return { data: q.body as any[], error: null }
}

export const getAllApplications = async () => {
  // Prefer REST first (no joins to reduce permissions issues)
  const rest = await getAllApplicationsRest()
  if (rest.data || !rest.error) return rest
  // Fallback to SDK with join for richer data
  const { data, error } = await supabase
    .from('contest_applications')
    .select(`
      *,
      contests (
        title,
        category,
        prize_pool
      )
    `)
    .order('created_at', { ascending: false })
  return { data, error }
}

export const getApplicationsByContest = async (contestId: string) => {
  const { data, error } = await supabase
    .from('contest_applications')
    .select('*')
    .eq('contest_id', contestId)
    .order('created_at', { ascending: false })
  
  return { data, error }
}

export const getApplicationsByUser = async (userId: string) => {
  // Prefer REST first for reliability
  const rest = await getApplicationsByUserRest(userId)
  if (rest.data || !rest.error) return rest
  // Fallback to SDK if REST fails
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)
    const builder = supabase
      .from('contest_applications')
      .select(`
        *,
        contests (
          title,
          category,
          status,
          deadline
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .abortSignal(controller.signal)

    const { data, error } = await withTimeout<any>(
      Promise.resolve(builder as any),
      6000,
      'getApplicationsByUser'
    )
    clearTimeout(timeoutId)
    return { data, error }
  } catch (error: any) {
    return { data: null, error }
  }
}

export const updateApplicationStatus = async (applicationId: string, status: ContestApplication['status']) => {
  const { data, error } = await supabase
    .from('contest_applications')
    .update({
      status,
      updated_at: new Date().toISOString()
    })
    .eq('id', applicationId)
    .select()
    .single()
  
  return { data, error }
}

export const approveAllPendingApplications = async () => {
  const rest = await approveAllPendingApplicationsRest()
  if (rest.data || !rest.error) return rest
  const { data, error } = await supabase
    .from('contest_applications')
    .update({ status: 'Approved', updated_at: new Date().toISOString() })
    .eq('status', 'Pending')
    .select()
  return { data, error }
}

// Update application fields for the current user
export const updateMyApplication = async (
  applicationId: string,
  userId: string,
  updates: Partial<Pick<ContestApplication, 'github_link' | 'team_members' | 'tech_stack' | 'project_description'>>
) => {
  // Prefer REST first
  const rest = await updateMyApplicationRest(applicationId, userId, updates)
  if (rest.data || !rest.error) return rest
  // Fallback to SDK
  const { data, error } = await supabase
    .from('contest_applications')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', applicationId)
    .eq('user_id', userId)
    .select()
    .single()
  return { data, error }
}

// Admin Authentication (for demo purposes - in production, use proper admin roles)
export const adminSignIn = async (username: string, password: string) => {
  // In production, this should be handled with proper admin roles and policies
  if (username === 'AdminOm' && password === 'BVCodeVerse@strong') {
    return { data: { user: { username: 'AdminOm', role: 'admin' } }, error: null }
  }
  return { data: null, error: { message: 'Invalid admin credentials' } }
}

// Contest Statistics
export const getContestStats = async () => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 second timeout for stats
    
    // Use Promise.all to run queries in parallel with reduced data
    const [contestsResult, applicationsResult] = await Promise.all([
      supabase
        .from('contests')
        .select('status, prize_pool')
        .abortSignal(controller.signal),
      supabase
        .from('contest_applications')
        .select('status')
        .abortSignal(controller.signal)
    ]);

    clearTimeout(timeoutId);

    const { data: contests, error: contestError } = contestsResult;
    const { data: applications, error: appError } = applicationsResult;

    if (contestError) return { data: null, error: contestError };
    if (appError) return { data: null, error: appError };

    // Calculate stats more efficiently with early returns
    const stats = {
      totalContests: contests?.length || 0,
      activeContests: contests?.filter(c => c.status === 'Open').length || 0,
      totalApplications: applications?.length || 0,
      pendingApplications: applications?.filter(a => a.status === 'Pending').length || 0,
      totalPrizePool: contests?.reduce((sum, contest) => {
        const prizeStr = contest.prize_pool?.toString() || '0';
        const prizeNum = parseInt(prizeStr.replace(/[^0-9]/g, '') || '0');
        return sum + prizeNum;
      }, 0) || 0
    };

    return { data: stats, error: null };
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Stats query timed out after 2 seconds');
      return { data: null, error: { message: 'Stats loading timeout' } };
    }
    console.error('Error in getContestStats:', error);
    return { data: null, error };
  }
}

// Database connection test
export const testDatabaseConnection = async () => {
  try {
    console.log('Testing database connection...')

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000) // 5s

    // Prefer table query; RPC may be disabled
    const tablePromise = supabase
      .from('contests')
      .select('id')
      .limit(1)
      .abortSignal(controller.signal)

    const { data: tableCheck, error: tableError } = await Promise.resolve(tablePromise as any)

    clearTimeout(timeout)

    if (tableError) {
      console.error('Table query failed:', tableError)
      return {
        success: false,
        error: `Database error: ${tableError.message}`,
        suggestion: tableError.message.includes('relation "contests" does not exist')
          ? 'Run the simple-db-setup.sql script in your Supabase dashboard'
          : 'Check your Supabase configuration and network connection'
      }
    }

    console.log('Database connection successful!')
    return { success: true, error: null, suggestion: 'Database is working correctly!' }
    
  } catch (error: any) {
    if (error?.name === 'AbortError' || error?.code === 'ETIMEOUT') {
      return { success: false, error: 'Database test timeout', suggestion: 'Network slow or blocked. Retry or check VPN/firewall.' }
    }
    console.error('Unexpected database error:', error)
    return { 
      success: false, 
      error: error.message || 'Unknown connection error',
      suggestion: 'Check your internet connection and Supabase URL/Key in .env file'
    }
  }
}
