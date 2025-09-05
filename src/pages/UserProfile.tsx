import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from '@/components/Layout'
import { 
  getUserProfile, 
  getUserStats,
  type UserProfile,
  type UserStats
} from '../lib/supabase'
import { 
  User, 
  Mail, 
  Calendar, 
  MapPin, 
  Github, 
  Linkedin, 
  Trophy, 
  Award, 
  Star, 
  Target,
  Shield,
  Code2,
  BookOpen,
  Users,
  Loader2,
  AlertCircle,
  ArrowLeft
} from 'lucide-react'

const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>()
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadUserData = async () => {
      if (!userId) return

      setLoading(true)
      setError(null)

      try {
        const [profileResponse, statsResponse] = await Promise.all([
          getUserProfile(userId),
          getUserStats(userId)
        ])

        if (profileResponse.error && profileResponse.error.code !== 'PGRST116') {
          throw profileResponse.error
        }

        if (statsResponse.error && statsResponse.error.code !== 'PGRST116') {
          throw statsResponse.error
        }

        setUserProfile(profileResponse.data)
        setUserStats(statsResponse.data)

      } catch (err: any) {
        console.error('Error loading user data:', err)
        setError(err.message || 'Failed to load user profile')
      } finally {
        setLoading(false)
      }
    }

    loadUserData()
  }, [userId])

  const stats = userStats || {
    total_points: 0,
    rank: null,
    level: 'New Member',
    projects_completed: 0,
    contests_won: 0,
    badges_earned: 0,
    streak_days: 0,
    next_level_points: 100
  }

  const badges = [
    { id: 1, name: 'First Login', icon: Code2, earned: true, color: 'text-blue-400' },
    { id: 2, name: 'Profile Complete', icon: Users, earned: !!(userProfile?.full_name && userProfile?.bio), color: 'text-green-400' },
    { id: 3, name: 'Social Connected', icon: BookOpen, earned: !!(userProfile?.github || userProfile?.linkedin), color: 'text-purple-400' },
    { id: 4, name: 'Active Member', icon: Target, earned: stats.total_points > 100, color: 'text-orange-400' },
    { id: 5, name: 'High Achiever', icon: Shield, earned: stats.total_points > 1000, color: 'text-yellow-400' },
    { id: 6, name: 'Top Performer', icon: Star, earned: stats.rank ? stats.rank <= 10 : false, color: 'text-red-400' },
  ]

  const getUserInitials = (name?: string) => {
    if (!name) return 'U'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading user profile...</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">User Not Found</h2>
            <p className="text-gray-400 mb-8">The user profile you're looking for doesn't exist.</p>
            <button 
              onClick={() => window.history.back()}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-semibold rounded-lg hover:shadow-lg transition-all"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </button>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="min-h-screen bg-black">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 text-cyan-400/5 text-6xl font-mono rotate-12">👤</div>
          <div className="absolute top-40 right-20 text-purple-400/5 text-6xl font-mono -rotate-12">⚡</div>
          <div className="absolute bottom-40 left-20 text-cyan-400/5 text-6xl font-mono rotate-45">🎯</div>
          <div className="absolute bottom-20 right-10 text-purple-400/5 text-6xl font-mono -rotate-45">🏆</div>
          
          <div className="absolute top-1/4 -left-32 w-64 h-64 bg-gradient-to-r from-cyan-400/10 to-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-cyan-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Back Button */}
          <motion.button
            onClick={() => window.history.back()}
            className="mb-8 flex items-center text-gray-400 hover:text-white transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </motion.button>

          {/* Header */}
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              User <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Profile</span> 👨‍💻
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Profile Section */}
            <div className="lg:col-span-2">
              {/* Profile Card */}
              <motion.div
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 mb-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center space-x-6 mb-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center text-black font-bold text-3xl">
                      {getUserInitials(userProfile?.full_name)}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-gray-900 flex items-center justify-center">
                      <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {userProfile?.full_name || 'Anonymous User'}
                    </h2>
                    <p className="text-cyan-400 font-medium">{stats.level}</p>
                    <div className="flex items-center text-gray-400 text-sm mt-1">
                      <Trophy className="w-4 h-4 mr-1" />
                      Rank #{stats.rank || 'N/A'} • {stats.total_points} points
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userProfile?.location && (
                    <div className="flex items-center text-gray-300">
                      <MapPin className="w-5 h-5 mr-3 text-cyan-400" />
                      <span>{userProfile.location}</span>
                    </div>
                  )}
                  {userProfile?.college && (
                    <div className="flex items-center text-gray-300">
                      <BookOpen className="w-5 h-5 mr-3 text-purple-400" />
                      <span>{userProfile.college}</span>
                    </div>
                  )}
                  {userProfile?.year && (
                    <div className="flex items-center text-gray-300">
                      <Calendar className="w-5 h-5 mr-3 text-green-400" />
                      <span>{userProfile.year} • {userProfile.branch}</span>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Bio Section */}
              {userProfile?.bio && (
                <motion.div
                  className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 mb-8"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2 text-green-400" />
                    About
                  </h3>
                  <p className="text-gray-300">{userProfile.bio}</p>
                </motion.div>
              )}

              {/* Skills */}
              {userProfile?.skills && userProfile.skills.length > 0 && (
                <motion.div
                  className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Code2 className="w-5 h-5 mr-2 text-yellow-400" />
                    Skills & Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 text-cyan-400 rounded-full text-sm border border-cyan-400/30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Column - Achievements */}
            <div className="space-y-8">
              {/* Achievements */}
              <motion.div
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-purple-400" />
                  Achievements
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {badges.map((badge, i) => (
                    <motion.div
                      key={badge.id}
                      className={`p-3 rounded-lg text-center transition-all ${
                        badge.earned 
                          ? 'bg-gradient-to-br from-cyan-400/20 to-purple-500/20 border border-cyan-400/30' 
                          : 'bg-gray-800/50 border border-gray-600 opacity-50'
                      }`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                      whileHover={{ scale: badge.earned ? 1.05 : 1 }}
                    >
                      <badge.icon className={`w-6 h-6 mx-auto mb-2 ${badge.color}`} />
                      <p className={`text-xs font-medium ${
                        badge.earned ? 'text-white' : 'text-gray-500'
                      }`}>
                        {badge.name}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Social Links */}
              {(userProfile?.github || userProfile?.linkedin) && (
                <motion.div
                  className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <h3 className="text-xl font-bold text-white mb-4">Connect</h3>
                  <div className="space-y-3">
                    {userProfile.github && (
                      <div className="flex items-center text-gray-300">
                        <Github className="w-5 h-5 mr-3 text-gray-400" />
                        <a 
                          href={userProfile.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-cyan-400 transition-colors text-sm"
                        >
                          {userProfile.github}
                        </a>
                      </div>
                    )}
                    {userProfile.linkedin && (
                      <div className="flex items-center text-gray-300">
                        <Linkedin className="w-5 h-5 mr-3 text-blue-400" />
                        <a 
                          href={userProfile.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-cyan-400 transition-colors text-sm"
                        >
                          {userProfile.linkedin}
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default UserProfile
