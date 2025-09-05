import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Layout from '@/components/Layout'
import DatabaseTest from '@/components/DatabaseTest'
import { useAuth } from '@/contexts/AuthContext'
import { 
  getUserProfile, 
  updateUserProfile, 
  upsertUserProfile, 
  getUserStats,
  type UserProfile,
  type UserStats
} from '@/lib/supabase'
import { 
  User, 
  Mail, 
  Calendar, 
  MapPin, 
  Phone, 
  Github, 
  Linkedin, 
  Trophy, 
  Award, 
  Star, 
  Target,
  Edit3,
  Save,
  X,
  Shield,
  Code2,
  BookOpen,
  Users,
  TrendingUp,
  Loader2,
  AlertCircle
} from 'lucide-react'

const Profile = () => {
  const { user, loading } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [profileLoading, setProfileLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dbProfile, setDbProfile] = useState<UserProfile | null>(null)
  const [dbStats, setDbStats] = useState<UserStats | null>(null)
  
  // Initialize profile data
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    github: '',
    linkedin: '',
    college: '',
    year: '',
    branch: '',
    skills: [] as string[],
    joinedDate: ''
  })

  // Load user profile and stats from database
  useEffect(() => {
    const loadUserData = async () => {
      if (!user) return

      console.log('Loading user data for:', user.id, user.email)
      setProfileLoading(true)
      setError(null)

      try {
        // Load profile
        console.log('Fetching user profile...')
        const { data: profile, error: profileError } = await getUserProfile(user.id)
        console.log('Profile result:', { profile, profileError })
        
        if (profileError && profileError.code !== 'PGRST116') { // PGRST116 means no rows returned
          throw profileError
        }

        // Load stats
        console.log('Fetching user stats...')
        const { data: stats, error: statsError } = await getUserStats(user.id)
        console.log('Stats result:', { stats, statsError })
        
        if (statsError && statsError.code !== 'PGRST116') {
          throw statsError
        }

        setDbProfile(profile)
        setDbStats(stats)

        // Set form data
        const formData = {
          fullName: profile?.full_name || user.user_metadata?.full_name || user.user_metadata?.name || '',
          email: user.email || '',
          phone: profile?.phone || '',
          location: profile?.location || '',
          bio: profile?.bio || '',
          github: profile?.github || '',
          linkedin: profile?.linkedin || '',
          college: profile?.college || 'Bharati Vidyapeeth College of Engineering',
          year: profile?.year || '3rd Year',
          branch: profile?.branch || 'Computer Science Engineering',
          skills: profile?.skills || [],
          joinedDate: new Date(user.created_at).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long' 
          })
        }
        
        console.log('Setting profile data:', formData)
        setProfileData(formData)
        
      } catch (err: any) {
        console.error('Error loading user data:', err)
        setError(err.message || 'Failed to load profile data')
        
        // Set default profile data even if database fails
        const defaultData = {
          fullName: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || '',
          email: user.email || '',
          phone: '',
          location: '',
          bio: '',
          github: '',
          linkedin: '',
          college: 'Bharati Vidyapeeth College of Engineering',
          year: '3rd Year',
          branch: 'Computer Science Engineering',
          skills: [],
          joinedDate: new Date(user.created_at).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long' 
          })
        }
        console.log('Using default profile data:', defaultData)
        setProfileData(defaultData)
        
      } finally {
        setProfileLoading(false)
      }
    }

    if (user) {
      console.log('User found, loading data...')
      loadUserData()
    } else {
      console.log('No user found')
    }
  }, [user])

  const userStats = dbStats || {
    total_points: 50,
    rank: 0,
    level: 'New Member',
    projects_completed: 0,
    contests_won: 0,
    badges_earned: 0,
    streak_days: 0,
    next_level_points: 100
  }

  const badges = [
    { id: 1, name: 'First Login', icon: Code2, earned: true, color: 'text-blue-400' },
    { id: 2, name: 'Profile Complete', icon: Users, earned: profileData.fullName && profileData.bio, color: 'text-green-400' },
    { id: 3, name: 'Social Connected', icon: BookOpen, earned: profileData.github || profileData.linkedin, color: 'text-purple-400' },
    { id: 4, name: 'Active Member', icon: Target, earned: userStats.total_points > 100, color: 'text-orange-400' },
    { id: 5, name: 'High Achiever', icon: Shield, earned: userStats.total_points > 1000, color: 'text-yellow-400' },
    { id: 6, name: 'Top Performer', icon: Star, earned: userStats.rank <= 10, color: 'text-red-400' },
  ]

  const handleSave = async () => {
    if (!user) return

    setSaving(true)
    setError(null)

    try {
      // Prepare profile data for database
      const profileUpdateData: Partial<UserProfile> = {
        full_name: profileData.fullName,
        phone: profileData.phone,
        location: profileData.location,
        bio: profileData.bio,
        github: profileData.github,
        linkedin: profileData.linkedin,
        college: profileData.college,
        year: profileData.year,
        branch: profileData.branch,
        skills: profileData.skills
      }

      // Save to database
      const { data, error } = await upsertUserProfile(user.id, profileUpdateData)
      
      if (error) {
        throw error
      }

      setDbProfile(data)
      setIsEditing(false)
      
      // Show success message (you could add a toast here)
      console.log('Profile updated successfully!')
      
    } catch (err: any) {
      console.error('Error saving profile:', err)
      setError(err.message || 'Failed to save profile')
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    // Reset changes to original database data
    if (user && dbProfile) {
      setProfileData({
        fullName: dbProfile.full_name || user.user_metadata?.full_name || user.user_metadata?.name || '',
        email: user.email || '',
        phone: dbProfile.phone || '',
        location: dbProfile.location || '',
        bio: dbProfile.bio || '',
        github: dbProfile.github || '',
        linkedin: dbProfile.linkedin || '',
        college: dbProfile.college || 'Bharati Vidyapeeth College of Engineering',
        year: dbProfile.year || '3rd Year',
        branch: dbProfile.branch || 'Computer Science Engineering',
        skills: dbProfile.skills || [],
        joinedDate: new Date(user.created_at).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long' 
        })
      })
    }
    setIsEditing(false)
    setError(null)
  }

  // Show loading state while user data is being fetched
  if (loading || profileLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading your profile...</p>
          </div>
        </div>
      </Layout>
    )
  }

  // Redirect to login if no user
  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Please Sign In</h2>
            <p className="text-gray-400 mb-8">You need to be logged in to view your profile.</p>
            <a 
              href="/login" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-semibold rounded-lg hover:shadow-lg transition-all"
            >
              Sign In to Continue
            </a>
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
          {/* Error Display */}
          {error && (
            <motion.div
              className="mb-8 p-4 bg-red-900/50 border border-red-500/50 rounded-lg flex items-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" />
              <div>
                <p className="text-red-400 font-medium">Error loading profile</p>
                <p className="text-red-300 text-sm">{error}</p>
              </div>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-red-400 hover:text-red-300"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* Header */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  My <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Profile</span> 🚀
                </h1>
                <p className="text-gray-400 text-lg">
                  Manage your coding journey and track your progress
                </p>
              </div>
              <motion.button
                onClick={() => setIsEditing(!isEditing)}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  isEditing 
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                    : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isEditing ? <X className="w-4 h-4 mr-2" /> : <Edit3 className="w-4 h-4 mr-2" />}
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </motion.button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Profile Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Profile Card */}
              <motion.div
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center space-x-6 mb-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center text-black font-bold text-3xl">
                      {profileData.fullName ? profileData.fullName.split(' ').map(n => n[0]).join('') : 'U'}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-gray-900 flex items-center justify-center">
                      <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex-1">
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.fullName}
                        onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                        className="text-2xl font-bold text-white bg-gray-800 rounded px-3 py-1 w-full mb-2"
                      />
                    ) : (
                      <h2 className="text-2xl font-bold text-white mb-2">
                        {profileData.fullName || 'Your Name'}
                      </h2>
                    )}
                    <p className="text-cyan-400 font-medium">{userStats.level}</p>
                    <div className="flex items-center text-gray-400 text-sm mt-1">
                      <Trophy className="w-4 h-4 mr-1" />
                      Rank #{userStats.rank || 'N/A'} • {userStats.total_points} points
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center text-gray-300">
                    <Mail className="w-5 h-5 mr-3 text-cyan-400" />
                    <span>{profileData.email}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Phone className="w-5 h-5 mr-3 text-cyan-400" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        className="bg-gray-800 rounded px-2 py-1 flex-1"
                      />
                    ) : (
                      <span>{profileData.phone}</span>
                    )}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <MapPin className="w-5 h-5 mr-3 text-cyan-400" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.location}
                        onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                        className="bg-gray-800 rounded px-2 py-1 flex-1"
                      />
                    ) : (
                      <span>{profileData.location}</span>
                    )}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Calendar className="w-5 h-5 mr-3 text-cyan-400" />
                    <span>Joined {profileData.joinedDate}</span>
                  </div>
                </div>
              </motion.div>

              {/* Academic Info */}
              <motion.div
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-purple-400" />
                  Academic Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">College</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.college}
                        onChange={(e) => setProfileData({...profileData, college: e.target.value})}
                        className="w-full bg-gray-800 rounded px-3 py-2 text-white"
                      />
                    ) : (
                      <p className="text-white font-medium">{profileData.college}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Year</label>
                    {isEditing ? (
                      <select
                        value={profileData.year}
                        onChange={(e) => setProfileData({...profileData, year: e.target.value})}
                        className="w-full bg-gray-800 rounded px-3 py-2 text-white"
                      >
                        <option>1st Year</option>
                        <option>2nd Year</option>
                        <option>3rd Year</option>
                        <option>4th Year</option>
                      </select>
                    ) : (
                      <p className="text-white font-medium">{profileData.year}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Branch</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.branch}
                        onChange={(e) => setProfileData({...profileData, branch: e.target.value})}
                        className="w-full bg-gray-800 rounded px-3 py-2 text-white"
                      />
                    ) : (
                      <p className="text-white font-medium">{profileData.branch}</p>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Bio Section */}
              <motion.div
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-green-400" />
                  About Me
                </h3>
                {isEditing ? (
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    rows={4}
                    className="w-full bg-gray-800 rounded px-3 py-2 text-white resize-none"
                  />
                ) : (
                  <p className="text-gray-300">{profileData.bio}</p>
                )}
              </motion.div>

              {/* Skills */}
              <motion.div
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Code2 className="w-5 h-5 mr-2 text-yellow-400" />
                  Skills & Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 text-cyan-400 rounded-full text-sm border border-cyan-400/30"
                    >
                      {skill}
                    </span>
                  ))}
                  {isEditing && (
                    <button 
                      onClick={() => {
                        const newSkill = prompt('Enter a new skill:')
                        if (newSkill && newSkill.trim()) {
                          setProfileData({
                            ...profileData,
                            skills: [...profileData.skills, newSkill.trim()]
                          })
                        }
                      }}
                      className="px-3 py-1 border-2 border-dashed border-gray-600 text-gray-400 rounded-full text-sm hover:border-cyan-400 hover:text-cyan-400 transition-colors"
                    >
                      + Add Skill
                    </button>
                  )}
                </div>
              </motion.div>

              {/* Save/Cancel Buttons */}
              {isEditing && (
                <motion.div
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center px-6 py-3 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </motion.div>
              )}
            </div>

            {/* Right Column - Stats & Activity */}
            <div className="space-y-8">
              {/* Badges */}
              <motion.div
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
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
                      transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
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
              <motion.div
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h3 className="text-xl font-bold text-white mb-4">Connect</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-300">
                    <Github className="w-5 h-5 mr-3 text-gray-400" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.github}
                        onChange={(e) => setProfileData({...profileData, github: e.target.value})}
                        className="flex-1 bg-gray-800 rounded px-2 py-1 text-sm"
                      />
                    ) : (
                      <a href={profileData.github} className="hover:text-cyan-400 transition-colors text-sm">
                        {profileData.github}
                      </a>
                    )}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Linkedin className="w-5 h-5 mr-3 text-blue-400" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.linkedin}
                        onChange={(e) => setProfileData({...profileData, linkedin: e.target.value})}
                        className="flex-1 bg-gray-800 rounded px-2 py-1 text-sm"
                      />
                    ) : (
                      <a href={profileData.linkedin} className="hover:text-cyan-400 transition-colors text-sm">
                        {profileData.linkedin}
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Database Test Component */}
      <DatabaseTest />
    </Layout>
  )
}

export default Profile
