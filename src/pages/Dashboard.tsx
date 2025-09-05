import React from 'react'
import { motion } from 'framer-motion'
import Layout from '@/components/Layout'
import { Trophy, Award, Star, Crown, Medal, TrendingUp, Users, Code2, Target } from 'lucide-react'

const Dashboard = () => {
  // Mock leaderboard data - in a real app, this would come from your database
  const topStudents = [
    { 
      rank: 1, 
      name: "Om Narkhede", 
      points: 2450, 
      badge: "Coding Champion", 
      avatar: "AS",
      weeklyGain: 150,
      achievements: 12
    },
    { 
      rank: 2, 
      name: "Swayam Polakhare", 
      points: 2280, 
      badge: "Algorithm Master", 
      avatar: "PP",
      weeklyGain: 120,
      achievements: 10
    },
    { 
      rank: 3, 
      name: "Swaraj Singh", 
      points: 2150, 
      badge: "Web Wizard", 
      avatar: "RK",
      weeklyGain: 95,
      achievements: 9
    },
    { 
      rank: 4, 
      name: "Mayank Tiwari", 
      points: 1980, 
      badge: "Data Scientist", 
      avatar: "SR",
      weeklyGain: 80,
      achievements: 8
    },
    { 
      rank: 5, 
      name: "Harshal Patil", 
      points: 1850, 
      badge: "Full Stack Pro", 
      avatar: "AS",
      weeklyGain: 75,
      achievements: 7
    },
    { 
      rank: 6, 
      name: "Ayush Jaju", 
      points: 1720, 
      badge: "Mobile Dev", 
      avatar: "KN",
      weeklyGain: 65,
      achievements: 6
    },
    { 
      rank: 7, 
      name: "Shivam Murkute", 
      points: 1650, 
      badge: "AI Enthusiast", 
      avatar: "VJ",
      weeklyGain: 60,
      achievements: 5
    },
    { 
      rank: 8, 
      name: "Karan Sathe", 
      points: 1580, 
      badge: "UI/UX Expert", 
      avatar: "RG",
      weeklyGain: 55,
      achievements: 5
    }
  ]

  const clubStats = {
    totalMembers: 5,
    activeContests: 3,
    totalProjects: 0,
    thisWeekSubmissions: 0
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-400" />
      case 2: return <Medal className="w-6 h-6 text-gray-300" />
      case 3: return <Award className="w-6 h-6 text-amber-600" />
      default: return <Trophy className="w-5 h-5 text-cyan-400" />
    }
  }

  const getRankColors = (rank: number) => {
    switch (rank) {
      case 1: return "from-yellow-400/20 to-orange-500/20 border-yellow-400/30"
      case 2: return "from-gray-300/20 to-gray-400/20 border-gray-300/30"
      case 3: return "from-amber-500/20 to-orange-600/20 border-amber-500/30"
      default: return "from-cyan-400/10 to-purple-500/10 border-cyan-400/20"
    }
  }

  return (
    <Layout>
      <div className="min-h-screen bg-black">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 text-cyan-400/5 text-6xl font-mono rotate-12">🏆</div>
          <div className="absolute top-40 right-20 text-purple-400/5 text-6xl font-mono -rotate-12">⭐</div>
          <div className="absolute bottom-40 left-20 text-cyan-400/5 text-6xl font-mono rotate-45">🎯</div>
          <div className="absolute bottom-20 right-10 text-purple-400/5 text-6xl font-mono -rotate-45">👑</div>
          
          <div className="absolute top-1/4 -left-32 w-64 h-64 bg-gradient-to-r from-cyan-400/10 to-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-cyan-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-500/20 border border-cyan-400/30 mb-6">
              <Trophy className="h-5 w-5 text-cyan-400 mr-2" />
              <span className="text-sm font-medium text-cyan-400">BVCodeVerse Leaderboard</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Contest <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Champions</span> 🏆
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Celebrating our top performers and coding champions. See who's leading the BVCodeVerse community!
            </p>
          </motion.div>

          {/* Club Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { icon: Users, title: 'Total Members', value: clubStats.totalMembers, color: 'from-blue-400 to-cyan-500' },
              { icon: Target, title: 'Active Contests', value: clubStats.activeContests, color: 'from-green-400 to-emerald-500' },
              { icon: Code2, title: 'Projects', value: clubStats.totalProjects, color: 'from-purple-400 to-pink-500' },
              { icon: TrendingUp, title: 'Weekly Submissions', value: clubStats.thisWeekSubmissions, color: 'from-yellow-400 to-orange-500' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className={`inline-flex p-3 bg-gradient-to-r ${stat.color} bg-opacity-20 rounded-xl mb-3`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.title}</p>
              </motion.div>
            ))}
          </div>

          {/* Top 3 Podium */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-white text-center mb-8 flex items-center justify-center">
              <Crown className="w-6 h-6 text-yellow-400 mr-2" />
              Top 3 Champions
            </h2>
            
            <div className="flex flex-col md:flex-row items-end justify-center gap-6 mb-8">
              {/* 2nd Place */}
              <motion.div
                className={`bg-gradient-to-br ${getRankColors(2)} backdrop-blur-sm rounded-2xl p-6 border md:order-1`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    {getRankIcon(2)}
                    <span className="ml-2 text-lg font-bold text-gray-300">#2</span>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-black font-bold text-xl mb-3 mx-auto">
                    {topStudents[1].avatar}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{topStudents[1].name}</h3>
                  <p className="text-gray-300 text-sm mb-2">{topStudents[1].badge}</p>
                  <p className="text-2xl font-bold text-gray-300">{topStudents[1].points.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">points</p>
                </div>
              </motion.div>

              {/* 1st Place */}
              <motion.div
                className={`bg-gradient-to-br ${getRankColors(1)} backdrop-blur-sm rounded-2xl p-8 border md:order-2 transform md:scale-110`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    {getRankIcon(1)}
                    <span className="ml-2 text-xl font-bold text-yellow-400">#1</span>
                  </div>
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-black font-bold text-2xl mb-4 mx-auto">
                    {topStudents[0].avatar}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{topStudents[0].name}</h3>
                  <p className="text-yellow-400 text-sm mb-3">{topStudents[0].badge}</p>
                  <p className="text-3xl font-bold text-yellow-400">{topStudents[0].points.toLocaleString()}</p>
                  <p className="text-sm text-gray-300">points</p>
                  <div className="mt-4 flex items-center justify-center text-xs text-gray-300">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +{topStudents[0].weeklyGain} this week
                  </div>
                </div>
              </motion.div>

              {/* 3rd Place */}
              <motion.div
                className={`bg-gradient-to-br ${getRankColors(3)} backdrop-blur-sm rounded-2xl p-6 border md:order-3`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    {getRankIcon(3)}
                    <span className="ml-2 text-lg font-bold text-amber-500">#3</span>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-black font-bold text-xl mb-3 mx-auto">
                    {topStudents[2].avatar}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{topStudents[2].name}</h3>
                  <p className="text-amber-500 text-sm mb-2">{topStudents[2].badge}</p>
                  <p className="text-2xl font-bold text-amber-500">{topStudents[2].points.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">points</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Full Leaderboard */}
          <motion.div
            className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <Star className="w-6 h-6 text-purple-400 mr-2" />
                Complete Leaderboard
              </h2>
              <p className="text-gray-400 mt-1">Top performers in BVCodeVerse coding contests</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Rank</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Points</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Weekly Gain</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Achievements</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {topStudents.map((student, i) => (
                    <motion.tr
                      key={student.rank}
                      className="hover:bg-gray-800/50 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.9 + i * 0.1 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getRankIcon(student.rank)}
                          <span className="ml-2 text-sm font-medium text-white">#{student.rank}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mr-3 ${
                            student.rank <= 3 
                              ? student.rank === 1 
                                ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-black'
                                : student.rank === 2 
                                  ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-black'
                                  : 'bg-gradient-to-br from-amber-500 to-orange-600 text-black'
                              : 'bg-gradient-to-br from-cyan-400 to-purple-500 text-black'
                          }`}>
                            {student.avatar}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">{student.name}</div>
                            <div className="text-sm text-gray-400">{student.badge}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-white">{student.points.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-green-400">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          <span className="text-sm font-medium">+{student.weeklyGain}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100/10 text-purple-400">
                          {student.achievements} badges
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-12 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <p className="text-gray-400 mb-6">
              Want to see your name on the leaderboard? Join BVCodeVerse and start your coding journey!
            </p>
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-semibold rounded-full hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join the Competition
            </motion.button>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard;