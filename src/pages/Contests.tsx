import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy, Clock, Users, Calendar, ArrowRight, Gift, Code, Zap, RefreshCw } from 'lucide-react';
import Layout from '@/components/Layout';
import { getAllContests, getContestStats, type Contest } from '@/lib/supabase';

const Contests = () => {
  const [contests, setContests] = useState<Contest[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [hasError, setHasError] = useState(false);
  const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  
  const loadData = useCallback(async () => {
    try {
      setRefreshing(true);
      setHasError(false);
      
      // Skip database loading and show static content immediately for now
      console.log('Loading contests...');
      
      // Set loading to false immediately to show the page
      setLoading(false);
      setStatsLoading(false);
      
      // Set some default data
      setContests([]);
      setStats({
        totalContests: 0,
        activeContests: 0,
        totalApplications: 0,
        pendingApplications: 0,
        totalPrizePool: 0
      });
      
      // Try loading data in background
      setTimeout(async () => {
        try {
          const { data: contestsData, error: contestsError } = await getAllContests();
          
          if (contestsError) {
            console.error('Error loading contests:', contestsError);
            setHasError(true);
          } else {
            console.log('Loaded contests:', contestsData);
            setContests(contestsData || []);
          }
          
          // Try loading stats
          const { data: statsData, error: statsError } = await getContestStats();
          if (statsError) {
            console.error('Error loading stats:', statsError);
          } else {
            setStats(statsData || {
              totalContests: contestsData?.length || 0,
              activeContests: contestsData?.filter(c => c.status === 'Open').length || 0,
              totalApplications: 0,
              pendingApplications: 0,
              totalPrizePool: 0
            });
          }
        } catch (error) {
          console.error('Background loading error:', error);
          setHasError(true);
        }
      }, 100);
      
    } catch (error) {
      console.error('Unexpected error loading contests:', error);
      setHasError(true);
      setLoading(false);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    // Show immediate feedback
    const timer = setTimeout(() => {
      if (loading) {
        console.log('Loading is taking longer than expected...');
      }
    }, 2000);

    loadData();

    return () => clearTimeout(timer);
  }, [loadData]);

  const refreshContests = useCallback(() => {
    loadData();
  }, [loadData]);

  const contestStats = [
    { 
      label: "Total Prize Pool", 
      value: "$2,500+", 
      icon: Trophy,
      loading: false
    },
    { 
      label: "Active Contests", 
      value: "2", 
      icon: Code,
      loading: false
    },
    { 
      label: "Total Applications", 
      value: statsLoading ? "..." : (stats?.totalApplications || 0).toString(), 
      icon: Users,
      loading: statsLoading
    },
    { 
      label: "This Month", 
      value: new Date().toLocaleDateString('en-US', { month: 'short' }), 
      icon: Clock,
      loading: false
    }
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
              <button 
                onClick={refreshContests}
                disabled={refreshing}
                className="ml-4 p-1 text-cyan-400 hover:text-cyan-300 transition-colors"
                title="Refresh Contests"
              >
                <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              </button>
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
                  <div className={`text-2xl font-bold text-white mb-1 ${stat.loading ? 'animate-pulse' : ''}`}>
                    {stat.loading ? (
                      <div className="h-8 bg-gray-700 rounded w-16 mx-auto"></div>
                    ) : (
                      stat.value
                    )}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>

          {/* Monthly Contests */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">This Month's Contests</h2>
            
            {loading ? (
              <div className="space-y-6">
                {/* Skeleton loading */}
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-gray-900 rounded-xl p-6 border border-gray-800 animate-pulse">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="h-6 bg-gray-700 rounded-lg w-3/4 mb-3"></div>
                        <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
                      </div>
                      <div className="h-12 w-24 bg-gray-700 rounded-lg"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-700 rounded w-full"></div>
                      <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                    </div>
                    <div className="flex gap-4 mt-4">
                      <div className="h-4 w-20 bg-gray-700 rounded"></div>
                      <div className="h-4 w-16 bg-gray-700 rounded"></div>
                      <div className="h-4 w-24 bg-gray-700 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : contests.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
                  {hasError ? (
                    <>
                      <div className="text-red-400 text-xl font-semibold mb-2">⚠️ Database Connection Issue</div>
                      <div className="text-gray-400 mb-4">
                        Unable to connect to the database. This could be because:
                      </div>
                      <div className="text-gray-500 text-sm text-left max-w-md mx-auto mb-6">
                        • The database hasn't been set up yet<br/>
                        • Supabase environment variables are missing<br/>
                        • Network connection issues<br/>
                        • Database tables don't exist
                      </div>
                      <div className="space-y-4">
                        <button 
                          onClick={refreshContests}
                          disabled={refreshing}
                          className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center gap-2 mx-auto disabled:opacity-50"
                        >
                          <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                          Try Again
                        </button>
                        <div className="text-xs text-gray-500">
                          Need help? Check the <a href="/database-debug" className="text-cyan-400 hover:underline">database debug page</a>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-gray-400 text-xl mb-2">🎯 No contests available at the moment</div>
                      <div className="text-sm text-gray-500 mb-6">
                        Contests will appear here once they're added from the Admin Dashboard.
                      </div>
                      <button 
                        onClick={refreshContests}
                        disabled={refreshing}
                        className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center gap-2 mx-auto disabled:opacity-50"
                      >
                        <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                        Check for New Contests
                      </button>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {contests.length === 0 && !hasError && (
                  // Show sample contest while loading
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-900 border border-gray-800 rounded-xl p-8 hover:border-cyan-500/50 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2">🚀 Amazing coding contests coming soon!</h3>
                        <p className="text-cyan-400 text-sm font-semibold mb-1">Web Development • $500 Prize Pool</p>
                      </div>
                      <div className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                        Coming Soon
                      </div>
                    </div>
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      Build innovative web applications using modern technologies. Show your creativity and coding skills to win exciting prizes!
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-cyan-400" />
                        48 hours
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-cyan-400" />
                        Max 4 members
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-cyan-400" />
                        This month
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        Check back soon for contest announcements!
                      </div>
                      <button
                        onClick={refreshContests}
                        disabled={refreshing}
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white rounded-lg transition-all disabled:opacity-50"
                      >
                        {refreshing ? (
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <RefreshCw className="h-4 w-4 mr-2" />
                        )}
                        Refresh
                      </button>
                    </div>
                  </motion.div>
                )}
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
                      <div className="flex items-center gap-2 mb-3">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white`}>
                          {contest.category}
                        </div>
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          contest.status === 'Open' 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                            : contest.status === 'Draft'
                            ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {contest.status}
                        </div>
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
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Due: {new Date(contest.deadline).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-cyan-400">{contest.prize_pool}</div>
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
                  <div className="block w-full">
                    {contest.status === 'Open' ? (
                      <Link 
                        to="/apply-contest"
                        className="block w-full"
                      >
                        <button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-cyan-500/25">
                          Apply Now
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </button>
                      </Link>
                    ) : contest.status === 'Closed' ? (
                      <button 
                        disabled 
                        className="w-full bg-gray-600 text-gray-400 font-semibold py-3 px-6 rounded-lg cursor-not-allowed flex items-center justify-center"
                      >
                        Applications Closed
                        <Clock className="ml-2 h-4 w-4" />
                      </button>
                    ) : (
                      <button 
                        disabled 
                        className="w-full bg-yellow-600 text-yellow-100 font-semibold py-3 px-6 rounded-lg cursor-not-allowed flex items-center justify-center"
                      >
                        Coming Soon (Draft)
                        <Calendar className="ml-2 h-4 w-4" />
                      </button>
                    )}
                  </div>
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
