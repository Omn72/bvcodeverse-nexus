import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase, initializeUserAccount } from '@/lib/supabase'

interface AuthContextType {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial user quickly from cached session (no network)
    const initAuth = async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession()
        const cachedUser = sessionData.session?.user ?? null
        setUser(cachedUser)
      } catch (e) {
        console.warn('getSession failed, continuing without cached user')
      } finally {
        setLoading(false)
      }

      // Refresh user in the background (non-blocking) with a short timeout
      const controller = new AbortController()
      const t = setTimeout(() => controller.abort(), 3000)
  supabase.auth.getUser()
        .then(({ data: { user } }) => {
          setUser(user ?? null)
        })
        .catch(() => { /* ignore background refresh errors */ })
        .finally(() => clearTimeout(t))
    }

    initAuth()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state change:', event, session?.user)
      const newUser = session?.user ?? null
  setUser(newUser)
  setLoading(false)
      
      // Initialize user account if they just signed up or signed in for the first time
      if (newUser) {
        console.log('Initializing user account for:', newUser.email)
        await initializeUserAccount(newUser.id, newUser.email || '')
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    try {
      // Best-effort cache clear for current user
      const current = user
      if (current?.id) {
        try { localStorage.removeItem(`bv_apps_${current.id}`) } catch {}
      }
      await supabase.auth.signOut()
    } finally {
      // Immediately reflect logout in UI; onAuthStateChange will also fire
      setUser(null)
      setLoading(false)
    }
  }

  const value = {
    user,
    loading,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
