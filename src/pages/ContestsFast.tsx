import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy, Clock, Users, Calendar, Code, RefreshCw } from 'lucide-react';
import Layout from '@/components/Layout';
import { getContestsLocal, initializeLocalData } from '@/lib/localDb';
import type { Contest } from '@/lib/supabase';

const ContestsFast = () => {
  const [contests, setContests] = useState<Contest[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const loadContests = () => {
    // Initialize with sample data if needed, then load from local storage
    initializeLocalData();
    const localContests = getContestsLocal();
    
    // Merge with any additional sample contests if needed
    const additionalSample = localContests.length === 0 ? [
      {
        id: 'sample-1',
        title: 'Web Development Challenge',
        category: 'Web Development',
        description: 'Build an innovative web application using modern technologies. Show your creativity and problem-solving skills!',
        prize_pool: '$1,000',
        duration: '48 hours',
        max_team_size: 4,
        deadline: '2025-09-20T23:59:59',
        status: 'Open' as const,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: 'System'
      },
      {
        id: 'sample-2',
        title: 'AI/ML Innovation Contest',
        category: 'AI/Machine Learning', 
        description: 'Create an AI solution that solves real-world problems. Push the boundaries of machine learning!',
        prize_pool: '$1,500',
        duration: '72 hours',
        max_team_size: 3,
        deadline: '2025-09-25T23:59:59',
        status: 'Open' as const,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: 'System'
      }
    ] : [];
    
    setContests([...localContests, ...additionalSample]);
  };
  
  useEffect(() => {
    loadContests();
  }, []);
  
  const refreshContests = async () => {
    setIsRefreshing(true);
    setTimeout(() => {
      loadContests();
      setIsRefreshing(false);
    }, 500); // Small delay for visual feedback
  };
  
  const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const activeContests = contests.filter(c => c.status === 'Open');
  const totalPrizePool = contests.reduce((total, contest) => {
    const prize = contest.prize_pool.replace(/[^\d]/g, ''); // Extract numbers
    return total + (parseInt(prize) || 0);
  }, 0);
  
  const contestStats = [
    { label: "Total Prize Pool", value: `$${totalPrizePool.toLocaleString()}+`, icon: Trophy },
    { label: "Active Contests", value: activeContests.length.toString(), icon: Code },
    { label: "Total Applications", value: "15+", icon: Users },
    { label: "This Month", value: new Date().toLocaleDateString('en-US', { month: 'short' }), icon: Clock }
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
            <div className="flex justify-between items-center mb-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
                <Trophy className="h-5 w-5 text-cyan-400 mr-2" />
                <span className="text-sm font-medium text-cyan-400">Monthly Contests - {currentMonth}</span>
              </div>
              
              {/* Refresh Button */}
              <button
                onClick={refreshContests}
                disabled={isRefreshing}
                className="flex items-center px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-600 transition-colors disabled:opacity-50"
                title="Refresh contests from admin dashboard"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span className="text-sm">
                  {isRefreshing ? 'Refreshing...' : 'Refresh'}
                </span>
              </button>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8">
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
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">{contest.title}</h3>
                      <p className="text-cyan-400 text-sm font-semibold mb-1">
                        {contest.category} • {contest.prize_pool} Prize Pool
                      </p>
                    </div>
                    <div className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                      contest.status === 'Open' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : contest.status === 'Draft'
                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                    }`}>
                      {contest.status}
                    </div>
                  </div>

                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {contest.description}
                  </p>

                  {/* Contest Details */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-cyan-400" />
                      {contest.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-cyan-400" />
                      Max {contest.max_team_size} members
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-cyan-400" />
                      Due {new Date(contest.deadline).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Apply Button */}
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      Apply now to secure your spot
                    </div>
                    {contest.status === 'Open' && (
                      <Link
                        to={`/apply-contest?contestId=${contest.id}`}
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white rounded-lg font-semibold transition-all group-hover:scale-105"
                      >
                        Apply Now
                      </Link>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-12 text-center mb-16"
          >
            <h3 className="text-3xl font-bold mb-4">Ready to Code?</h3>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Join our community of developers and participate in exciting coding challenges. 
              Every contest is an opportunity to learn, grow, and win amazing prizes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/apply-contest"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white rounded-lg font-semibold text-lg transition-all"
              >
                Apply for Contest
              </Link>
              <Link
                to="/team"
                className="inline-flex items-center px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold text-lg transition-all border border-gray-600"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default ContestsFast;
