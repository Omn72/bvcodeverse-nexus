import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { searchUsers, getRecentUsers } from '../lib/supabase'
import { Search, User, Users, ExternalLink } from 'lucide-react'
import Layout from '../components/Layout'

const SearchTest: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [recentUsers, setRecentUsers] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    setError(null)
    
    try {
      const { data, error } = await searchUsers(searchQuery.trim())
      if (error) {
        setError(error.message || 'Search failed')
        setSearchResults([])
        return
      }
      setSearchResults(data || [])
      console.log('Search results:', data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed')
      console.error('Search error:', err)
    } finally {
      setIsSearching(false)
    }
  }

  const loadRecentUsers = async () => {
    try {
      const { data, error } = await getRecentUsers()
      if (error) {
        setError(error.message || 'Failed to load recent users')
        setRecentUsers([])
        return
      }
      setRecentUsers(data || [])
      console.log('Recent users:', data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load recent users')
      console.error('Recent users error:', err)
    }
  }

  return (
    <Layout>
      <div className="min-h-screen bg-black pt-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">
            Search Test <span className="text-cyan-400">🔍</span>
          </h1>

          {/* Search Section */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 mb-8">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <Search className="w-6 h-6 mr-3 text-cyan-400" />
              User Search
            </h2>
            
            <div className="flex gap-4 mb-6">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users by name or username..."
                className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-cyan-400 focus:outline-none"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                onClick={handleSearch}
                disabled={isSearching || !searchQuery.trim()}
                className="px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSearching ? 'Searching...' : 'Search'}
              </button>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6">
                Error: {error}
              </div>
            )}

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  Search Results ({searchResults.length})
                </h3>
                <div className="space-y-3">
                  {searchResults.map((user) => (
                    <div key={user.id} className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <User className="w-8 h-8 text-gray-400" />
                          <div>
                            <p className="text-white font-semibold">
                              {user.full_name || 'No name'}
                            </p>
                            <p className="text-cyan-400 text-sm">@{user.username}</p>
                            <p className="text-gray-400 text-sm">{user.email}</p>
                            {user.bio && <p className="text-gray-300 text-sm mt-1">{user.bio}</p>}
                          </div>
                        </div>
                        <Link
                          to={`/${user.username}`}
                          className="flex items-center px-3 py-1 bg-cyan-500 text-white text-sm rounded-lg hover:bg-cyan-600 transition-colors"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          View Profile
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Recent Users Section */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white flex items-center">
                <Users className="w-6 h-6 mr-3 text-purple-400" />
                Recent Users
              </h2>
              <button
                onClick={loadRecentUsers}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Load Recent Users
              </button>
            </div>

            {recentUsers.length > 0 && (
              <div className="space-y-3">
                {recentUsers.map((user) => (
                  <div key={user.id} className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <User className="w-8 h-8 text-gray-400" />
                        <div>
                          <p className="text-white font-semibold">
                            {user.full_name || 'No name'}
                          </p>
                          <p className="text-purple-400 text-sm">@{user.username}</p>
                          <p className="text-gray-400 text-sm">{user.email}</p>
                          {user.bio && <p className="text-gray-300 text-sm mt-1">{user.bio}</p>}
                        </div>
                      </div>
                      <Link
                        to={`/${user.username}`}
                        className="flex items-center px-3 py-1 bg-purple-500 text-white text-sm rounded-lg hover:bg-purple-600 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        View Profile
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default SearchTest
