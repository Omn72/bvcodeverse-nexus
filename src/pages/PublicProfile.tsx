import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from '@/components/Layout'
import { getUserByUsername } from '../lib/supabase'
import { 
  User, 
  Mail, 
  Calendar, 
  MapPin, 
  Phone, 
  Github, 
  Linkedin,
  Award,
  Trophy,
  Star,
  Code,
  BookOpen,
  Loader2,
  AlertCircle,
  ArrowLeft
} from 'lucide-react'

interface UserProfile {
  id: string
  username: string
  full_name: string | null
  email: string
  phone: string | null
  location: string | null
  bio: string | null
  github: string | null
  linkedin: string | null
  college: string
  year: string
  branch: string
  skills: string[]
  created_at: string
  updated_at: string
  user_stats?: {
    total_points: number
    rank: number
    level: number
  }
}

const PublicProfile: React.FC = () => {
  const { username } = useParams<{ username: string }>()
  const navigate = useNavigate()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (username) {
      loadUserProfile(username)
    }
  }, [username])

  const loadUserProfile = async (username: string) => {
    try {
      setIsLoading(true)
      setError(null)
      
      console.log('Loading profile for username:', username)
      
      const { data, error } = await getUserByUsername(username)

      if (error) {
        console.error('Error loading profile:', error)
        setError('Profile not found')
        return
      }

      if (!data) {
        setError('Profile not found')
        return
      }

      setProfile(data)
      console.log('Loaded profile:', data)
    } catch (err) {
      console.error('Error loading profile:', err)
      setError('Failed to load profile')
    } finally {
      setIsLoading(false)
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading profile...</p>
          </div>
        </div>
      </Layout>
    )
  }

  // Error state
  if (error || !profile) {
    return (
      <Layout>
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Profile Not Found</h2>
            <p className="text-gray-400 mb-8">
              {error || "The user profile you're looking for doesn't exist."}
            </p>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center px-6 py-3 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-all"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Home
            </button>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 text-cyan-400/5 text-8xl font-mono rotate-12">@</div>
          <div className="absolute top-60 left-10 text-purple-400/5 text-6xl font-mono -rotate-12">👤</div>
          <div className="absolute bottom-40 right-20 text-cyan-400/5 text-6xl font-mono rotate-45">🎯</div>
          <div className="absolute bottom-20 left-10 text-purple-400/5 text-6xl font-mono -rotate-45">🏆</div>
          
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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {profile.full_name || profile.username}
            </h1>
            <p className="text-xl text-cyan-400 mb-2">@{profile.username}</p>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {profile.bio || `${profile.year} student at ${profile.college}`}
            </p>
          </motion.div>

          {/* Stats Cards */}
          {profile.user_stats && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-gradient-to-r from-cyan-500/20 to-cyan-400/20 backdrop-blur-sm rounded-2xl p-6 border border-cyan-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyan-400 text-sm font-medium">Total Points</p>
                    <p className="text-white text-2xl font-bold">{profile.user_stats.total_points}</p>
                  </div>
                  <Star className="w-8 h-8 text-cyan-400" />
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-500/20 to-purple-400/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-400 text-sm font-medium">Rank</p>
                    <p className="text-white text-2xl font-bold">#{profile.user_stats.rank}</p>
                  </div>
                  <Trophy className="w-8 h-8 text-purple-400" />
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-500/20 to-green-400/20 backdrop-blur-sm rounded-2xl p-6 border border-green-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-400 text-sm font-medium">Level</p>
                    <p className="text-white text-2xl font-bold">{profile.user_stats.level}</p>
                  </div>
                  <Award className="w-8 h-8 text-green-400" />
                </div>
              </div>
            </motion.div>
          )}

          {/* Main Profile Section */}
          <motion.div
            className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 mb-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <User className="w-6 h-6 mr-3 text-cyan-400" />
              Profile Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="flex items-center space-x-4">
                <User className="w-5 h-5 text-cyan-400" />
                <div className="flex-1">
                  <label className="block text-sm text-gray-400 mb-1">Full Name</label>
                  <p className="text-white">{profile.full_name || 'Not provided'}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-4">
                <Mail className="w-5 h-5 text-purple-400" />
                <div className="flex-1">
                  <label className="block text-sm text-gray-400 mb-1">Email</label>
                  <p className="text-white">{profile.email}</p>
                </div>
              </div>

              {/* Phone */}
              {profile.phone && (
                <div className="flex items-center space-x-4">
                  <Phone className="w-5 h-5 text-green-400" />
                  <div className="flex-1">
                    <label className="block text-sm text-gray-400 mb-1">Phone</label>
                    <p className="text-white">{profile.phone}</p>
                  </div>
                </div>
              )}

              {/* Location */}
              {profile.location && (
                <div className="flex items-center space-x-4">
                  <MapPin className="w-5 h-5 text-red-400" />
                  <div className="flex-1">
                    <label className="block text-sm text-gray-400 mb-1">Location</label>
                    <p className="text-white">{profile.location}</p>
                  </div>
                </div>
              )}

              {/* College */}
              <div className="flex items-center space-x-4">
                <BookOpen className="w-5 h-5 text-blue-400" />
                <div className="flex-1">
                  <label className="block text-sm text-gray-400 mb-1">College</label>
                  <p className="text-white">{profile.college}</p>
                </div>
              </div>

              {/* Branch & Year */}
              <div className="flex items-center space-x-4">
                <Code className="w-5 h-5 text-orange-400" />
                <div className="flex-1">
                  <label className="block text-sm text-gray-400 mb-1">Branch & Year</label>
                  <p className="text-white">{profile.branch} - {profile.year}</p>
                </div>
              </div>

              {/* Member Since */}
              <div className="flex items-center space-x-4">
                <Calendar className="w-5 h-5 text-pink-400" />
                <div className="flex-1">
                  <label className="block text-sm text-gray-400 mb-1">Member Since</label>
                  <p className="text-white">
                    {new Date(profile.created_at).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long' 
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="mt-6">
              <label className="block text-sm text-gray-400 mb-2">Bio</label>
              <p className="text-white">
                {profile.bio || 'This user hasn\'t added a bio yet.'}
              </p>
            </div>

            {/* Skills */}
            {profile.skills && profile.skills.length > 0 && (
              <div className="mt-6">
                <label className="block text-sm text-gray-400 mb-2">Skills</label>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-cyan-500/20 text-cyan-300 text-sm rounded-full border border-cyan-400/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Social Links */}
            <div className="mt-8 flex flex-wrap gap-4">
              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </a>
              )}
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </a>
              )}
            </div>
          </motion.div>

          {/* Back Button */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-all"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </button>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}

export default PublicProfile
