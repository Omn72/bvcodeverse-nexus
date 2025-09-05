import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { getUserProfile } from '@/lib/supabase'

const RedirectToProfile: React.FC = () => {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const go = async () => {
      if (!user && !loading) {
        navigate('/login', { replace: true })
        return
      }

      if (user) {
        try {
          const { data } = await getUserProfile(user.id)
          const username = data?.username || null
          if (username) {
            navigate(`/${username}`, { replace: true })
          } else {
            // fallback to internal id-based profile view
            navigate(`/user/id/${user.id}`, { replace: true })
          }
        } catch (e) {
          navigate(`/user/id/${user.id}`, { replace: true })
        }
      }
    }
    go()
  }, [user, loading, navigate])

  return null
}

export default RedirectToProfile
