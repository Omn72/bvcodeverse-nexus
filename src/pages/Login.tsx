import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import Layout from '@/components/Layout'
import { signIn, resendConfirmation } from '@/lib/supabase'
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [needsConfirmation, setNeedsConfirmation] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [resendMessage, setResendMessage] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setNeedsConfirmation(false)

    try {
      const { data, error } = await signIn(email, password)
      
      if (error) {
        // Handle specific error cases
        if (error.message.includes('Email not confirmed')) {
          setError('Please check your email and click the confirmation link before signing in.')
          setNeedsConfirmation(true)
        } else if (error.message.includes('Invalid login credentials')) {
          setError('Invalid email or password. Please check your credentials.')
        } else {
          setError(error.message)
        }
      } else if (data.user) {
        navigate('/dashboard')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleResendConfirmation = async () => {
    setResendLoading(true)
    setResendMessage('')

    try {
      const { error } = await resendConfirmation(email)
      
      if (error) {
        setResendMessage('Failed to resend confirmation email. Please try again.')
      } else {
        setResendMessage('Confirmation email sent! Please check your inbox.')
      }
    } catch (err) {
      setResendMessage('An error occurred. Please try again.')
    } finally {
      setResendLoading(false)
    }
  }

  return (
    <Layout>
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 text-cyan-400/10 text-4xl font-mono">{'< />'}</div>
          <div className="absolute top-40 right-20 text-purple-400/10 text-4xl font-mono">{'{ }'}</div>
          <div className="absolute bottom-40 left-20 text-cyan-400/10 text-4xl font-mono">{'[ ]'}</div>
          <div className="absolute bottom-20 right-10 text-purple-400/10 text-4xl font-mono">{'( )'}</div>
          
          <div className="absolute top-1/4 -left-32 w-64 h-64 bg-gradient-to-r from-cyan-400/5 to-purple-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-gradient-to-r from-purple-500/5 to-cyan-400/5 rounded-full blur-3xl"></div>
        </div>

        <motion.div
          className="relative w-full max-w-md"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Glassmorphism Card */}
          <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl">
            {/* Header */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <LogIn className="w-12 h-12 mx-auto mb-4 text-cyan-400" />
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-400">
                Sign in to access your BVCodeVerse account
              </p>
            </motion.div>

            {/* Form */}
            <motion.form
              onSubmit={handleLogin}
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Email Field */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-12 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400 text-sm"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  {error}
                </motion.div>
              )}

              {/* Resend Confirmation Section */}
              {needsConfirmation && email && (
                <motion.div
                  className="p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg text-yellow-400 text-sm"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <p className="mb-2">Need a new confirmation email?</p>
                  <button
                    onClick={handleResendConfirmation}
                    disabled={resendLoading}
                    className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/50 rounded text-xs hover:bg-yellow-500/30 transition-colors disabled:opacity-50"
                  >
                    {resendLoading ? 'Sending...' : 'Resend Confirmation'}
                  </button>
                  {resendMessage && (
                    <p className="mt-2 text-xs">{resendMessage}</p>
                  )}
                </motion.div>
              )}

              {/* Info Message */}
              <motion.div
                className="p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg text-blue-400 text-sm"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                📧 <strong>First time signing in?</strong> Check your email for a confirmation link after registration.
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </motion.button>
            </motion.form>

            {/* Footer Links */}
            <motion.div
              className="mt-6 text-center space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <p className="text-gray-400">
                Don't have an account?{' '}
                <Link 
                  to="/signup" 
                  className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                >
                  Sign up here
                </Link>
              </p>
              <Link 
                to="/" 
                className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
              >
                Back to Home
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Layout>
  )
}

export default Login
