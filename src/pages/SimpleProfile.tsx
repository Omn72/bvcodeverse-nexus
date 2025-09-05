import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Layout from '@/components/Layout'
import { useAuth } from '../contexts/AuthContext'
import { supabase, getProfileUrl } from '../lib/supabase'
import { 
  User, 
  Mail, 
  Calendar, 
  MapPin, 
  Phone, 
  Github, 
  Linkedin, 
  Edit3,
  Save,
  X,
  Loader2,
  AlertCircle
} from 'lucide-react'

const SimpleProfile = () => {
  const { user, loading } = useAuth()
    const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [profileData, setProfileData] = useState({
    username: '',
    fullName: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    github: '',
    linkedin: '',
    college: 'Bharati Vidyapeeth College of Engineering',
    year: '3rd Year',
    branch: 'Computer Science Engineering',
    skills: [] as string[],
    joinedDate: ''
  })

  // Initialize profile data when user loads
  useEffect(() => {
    if (user) {
      console.log('User loaded:', user)
      setProfileData({
        username: user.user_metadata?.username || user.email?.split('@')[0] || '',
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
      })
    }
  }, [user])

  // Handle saving profile changes
  const handleSaveProfile = async () => {
    if (!user) return
    
    setIsSaving(true)
    try {
      // Update user profile in Supabase
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          id: user.id,
          username: profileData.username.trim(),
          full_name: profileData.fullName.trim(),
          email: profileData.email.trim(),
          phone: profileData.phone.trim() || null,
          location: profileData.location.trim() || null,
          bio: profileData.bio.trim() || null,
          github: profileData.github.trim() || null,
          linkedin: profileData.linkedin.trim() || null,
          college: profileData.college.trim(),
          year: profileData.year.trim(),
          branch: profileData.branch.trim(),
          skills: profileData.skills.filter(skill => skill.trim() !== ''),
          updated_at: new Date().toISOString()
        })

      if (error) {
        console.error('Error saving profile:', error)
        alert('Failed to save profile. Please try again.')
        return
      }

      console.log('Profile saved successfully!')
      setIsEditing(false)
    } catch (error) {
      console.error('Error saving profile:', error)
      alert('Failed to save profile. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const getUserInitials = (name: string) => {
    if (!name) return 'U'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  // Show loading state
  if (loading) {
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
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
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
          {/* Header */}
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Your <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Profile</span> 👤
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto mb-2">
              Welcome to your personalized dashboard. Manage your information and showcase your skills.
            </p>
            {profileData.username && (
              <p className="text-cyan-400 text-sm">
                Your public profile: <span className="font-mono">{window.location.origin}{getProfileUrl(profileData.username)}</span>
              </p>
            )}
          </motion.div>

          {/* Main Profile Section */}
          <motion.div
            className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 mb-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Profile Information</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                {isEditing ? <X className="w-4 h-4 mr-2" /> : <Edit3 className="w-4 h-4 mr-2" />}
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            <div className="flex items-center space-x-6 mb-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center text-black font-bold text-3xl">
                  {getUserInitials(profileData.fullName)}
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-gray-900 flex items-center justify-center">
                  <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {profileData.fullName || 'Your Name'}
                </h3>
                <p className="text-cyan-400 font-medium">New Member</p>
                <div className="flex items-center text-gray-400 text-sm mt-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  Joined {profileData.joinedDate}
                </div>
              </div>
            </div>

            {/* Profile Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Username */}
              <div className="flex items-center space-x-4">
                <User className="w-5 h-5 text-cyan-400" />
                <div className="flex-1">
                  <label className="block text-sm text-gray-400 mb-1">Username</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.username}
                      onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                      className="w-full bg-gray-800 rounded px-3 py-2 text-white"
                      placeholder="Enter your username"
                    />
                  ) : (
                    <p className="text-white">{profileData.username || 'Not set'}</p>
                  )}
                </div>
              </div>

              {/* Full Name */}
              <div className="flex items-center space-x-4">
                <User className="w-5 h-5 text-cyan-400" />
                <div className="flex-1">
                  <label className="block text-sm text-gray-400 mb-1">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.fullName}
                      onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                      className="w-full bg-gray-800 rounded px-3 py-2 text-white"
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <p className="text-white">{profileData.fullName || 'Not set'}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-4">
                <Mail className="w-5 h-5 text-purple-400" />
                <div className="flex-1">
                  <label className="block text-sm text-gray-400 mb-1">Email</label>
                  <p className="text-white">{profileData.email}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-4">
                <Phone className="w-5 h-5 text-green-400" />
                <div className="flex-1">
                  <label className="block text-sm text-gray-400 mb-1">Phone</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className="w-full bg-gray-800 rounded px-3 py-2 text-white"
                      placeholder="Enter your phone number"
                    />
                  ) : (
                    <p className="text-white">{profileData.phone || 'Not set'}</p>
                  )}
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center space-x-4">
                <MapPin className="w-5 h-5 text-red-400" />
                <div className="flex-1">
                  <label className="block text-sm text-gray-400 mb-1">Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                      className="w-full bg-gray-800 rounded px-3 py-2 text-white"
                      placeholder="Enter your location"
                    />
                  ) : (
                    <p className="text-white">{profileData.location || 'Not set'}</p>
                  )}
                </div>
              </div>

              {/* GitHub */}
              <div className="flex items-center space-x-4">
                <Github className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <label className="block text-sm text-gray-400 mb-1">GitHub</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.github}
                      onChange={(e) => setProfileData({...profileData, github: e.target.value})}
                      className="w-full bg-gray-800 rounded px-3 py-2 text-white"
                      placeholder="https://github.com/username"
                    />
                  ) : (
                    <p className="text-white">{profileData.github || 'Not set'}</p>
                  )}
                </div>
              </div>

              {/* LinkedIn */}
              <div className="flex items-center space-x-4">
                <Linkedin className="w-5 h-5 text-blue-400" />
                <div className="flex-1">
                  <label className="block text-sm text-gray-400 mb-1">LinkedIn</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.linkedin}
                      onChange={(e) => setProfileData({...profileData, linkedin: e.target.value})}
                      className="w-full bg-gray-800 rounded px-3 py-2 text-white"
                      placeholder="https://linkedin.com/in/username"
                    />
                  ) : (
                    <p className="text-white">{profileData.linkedin || 'Not set'}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="mt-6">
              <label className="block text-sm text-gray-400 mb-2">Bio</label>
              {isEditing ? (
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  className="w-full bg-gray-800 rounded px-3 py-2 text-white h-24 resize-none"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-white">{profileData.bio || 'No bio added yet.'}</p>
              )}
            </div>

            {/* Save Button */}
            {isEditing && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className="flex items-center px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
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
              </div>
            )}
          </motion.div>

          {/* Debug Info */}
          <div className="fixed bottom-4 right-4 bg-gray-900 border border-gray-700 rounded-lg p-3 text-xs">
            <p className="text-white font-bold mb-1">Debug Info</p>
            <p className="text-gray-400">User ID: {user?.id}</p>
            <p className="text-gray-400">Email: {user?.email}</p>
            <p className="text-green-400">✅ Profile Loading: Success</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default SimpleProfile
