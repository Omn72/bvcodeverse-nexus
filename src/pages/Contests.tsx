import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy, Clock, Users, Calendar, ArrowRight, Gift, Code, Zap } from 'lucide-react';
import Layout from '@/components/Layout';
import { getActiveContests, getContestStats, type Contest } from '@/lib/supabase';

const Contests = () => {
  const [contests, setContests] = useState<Contest[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Load active contests
        const { data: contestsData, error: contestsError } = await getActiveContests();
        if (contestsError) throw contestsError;
        
        // Load stats
        const { data: statsData, error: statsError } = await getContestStats();
        if (statsError) throw statsError;
        
        setContests(contestsData || []);
        setStats(statsData);
        
      } catch (error) {
        console.error('Error loading contests:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const contestStats = stats ? [
    { label: "Total Prize Pool", value: `$${stats.totalPrizePool.toLocaleString()}`, icon: Trophy },
    { label: "Active Contests", value: stats.activeContests.toString(), icon: Code },
    { label: "Total Applications", value: stats.totalApplications.toString(), icon: Users },
    { label: "Total Contests", value: stats.totalContests.toString(), icon: Clock }
  ] : [
    { label: "Total Prize Pool", value: "$0", icon: Trophy },
    { label: "Active Contests", value: "0", icon: Code },
    { label: "Total Applications", value: "0", icon: Users },
    { label: "Total Contests", value: "0", icon: Clock }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-black text-white pt-20">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 mb-6">
              <Trophy className="h-5 w-5 text-cyan-400 mr-2" />
              <span className="text-sm font-medium text-cyan-400">Monthly Contests - {currentMonth}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Coding <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Contests</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Compete with the best developers, showcase your skills, and win exciting prizes. 
              Two contests every month, endless opportunities to grow.
            </p>
          </motion.div>

          {/* Contest Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {contestStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-900 border border-gray-800 rounded-lg p-6 text-center hover:border-cyan-500/50 transition-all duration-300"
                >
                  <Icon className="h-8 w-8 text-cyan-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>

          {/* Monthly Contests */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">This Month's Contests</h2>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="text-gray-400">Loading contests...</div>
              </div>
            ) : contests.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400">No active contests available at the moment.</div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
              {contests.map((contest, index) => (
                <motion.div
                  key={contest.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-gray-900 border border-gray-800 rounded-xl p-8 hover:border-cyan-500/50 transition-all duration-300 group"
                >
                  {/* Contest Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white mb-3`}>
                        {contest.category}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{contest.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {contest.duration}
                        </span>
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          Max {contest.max_team_size} members
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-cyan-400">${contest.prize_pool}</div>
                      <div className="text-xs text-gray-400">Prize Pool</div>
                    </div>
                  </div>

                  {/* Contest Description */}
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {contest.description}
                  </p>

                  {/* Technologies - placeholder since not in database */}
                  <div className="mb-6">
                    <div className="text-sm font-medium text-gray-400 mb-2">Category:</div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs text-gray-300">
                        {contest.category}
                      </span>
                    </div>
                  </div>

                  {/* Contest Info */}
                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div className="flex items-center text-gray-400">
                      <Calendar className="h-4 w-4 mr-2" />
                      Deadline: {new Date(contest.deadline).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Users className="h-4 w-4 mr-2" />
                      Team Size: Up to {contest.max_team_size}
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Zap className="h-4 w-4 mr-2" />
                      Duration: {contest.duration}
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-green-400 text-sm font-medium">{contest.status}</span>
                    </div>
                  </div>

                  {/* Apply Button */}
                  <Link 
                    to="/apply-contest"
                    className="block w-full"
                  >
                    <button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-cyan-500/25">
                      Apply Now
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </Link>
                </motion.div>
              ))}
              </div>
            )}
          </div>

          {/* How It Works */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-900 border border-gray-800 rounded-xl p-8 mb-16"
          >
            <h2 className="text-2xl font-bold text-center mb-8">How Contest Works</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">1</span>
                </div>
                <h3 className="font-semibold text-white mb-2">Apply</h3>
                <p className="text-gray-400 text-sm">Submit your application with project details</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className="font-semibold text-white mb-2">Code</h3>
                <p className="text-gray-400 text-sm">Build your solution within the time limit</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">3</span>
                </div>
                <h3 className="font-semibold text-white mb-2">Submit</h3>
                <p className="text-gray-400 text-sm">Present your project before deadline</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">4</span>
                </div>
                <h3 className="font-semibold text-white mb-2">Win</h3>
                <p className="text-gray-400 text-sm">Get recognized and win prizes</p>
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-xl p-12"
          >
            <Trophy className="h-16 w-16 text-cyan-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Compete?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Join hundreds of developers in our monthly coding contests. Show your skills, 
              learn from others, and win amazing prizes.
            </p>
            <Link to="/apply-contest">
              <button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 flex items-center mx-auto">
                Apply for Contest
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Contests;
