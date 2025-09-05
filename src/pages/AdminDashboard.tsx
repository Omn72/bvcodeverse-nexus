import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Trophy, 
  Users, 
  Eye, 
  Calendar, 
  Clock, 
  ExternalLink, 
  LogOut,
  Edit,
  Trash2,
  User,
  FileText,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  createContest, 
  getAllContests, 
  getAllApplications, 
  getContestStats,
  adminSignIn,
  type Contest,
  type ContestApplication 
} from '@/lib/supabase';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'contests' | 'applications'>('overview');
  const [contests, setContests] = useState<Contest[]>([]);
  const [applications, setApplications] = useState<ContestApplication[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [selectedContest, setSelectedContest] = useState<Contest | null>(null);
  const [showAddContest, setShowAddContest] = useState(false);
  const [showApplications, setShowApplications] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load data from database
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        console.log('Loading dashboard data...');
        
        // Load contests
        const { data: contestsData, error: contestsError } = await getAllContests();
        if (contestsError) {
          console.error('Error loading contests:', contestsError);
          // Check if it's a table doesn't exist error
          if (contestsError.message?.includes('relation "contests" does not exist') || 
              contestsError.message?.includes('table') || 
              contestsError.message?.includes('relation')) {
            alert('Database tables not found. Please run the database-setup.sql file in your Supabase SQL editor first.');
          }
        } else {
          console.log('Contests loaded:', contestsData?.length || 0);
          setContests(contestsData || []);
        }
        
        // Load applications
        const { data: applicationsData, error: applicationsError } = await getAllApplications();
        if (applicationsError) {
          console.error('Error loading applications:', applicationsError);
        } else {
          console.log('Applications loaded:', applicationsData?.length || 0);
          setApplications(applicationsData || []);
        }
        
        // Load stats
        const { data: statsData, error: statsError } = await getContestStats();
        if (statsError) {
          console.error('Error loading stats:', statsError);
        } else {
          console.log('Stats loaded:', statsData);
          setStats(statsData);
        }
        
      } catch (error) {
        console.error('Unexpected error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Check admin authentication
  useEffect(() => {
    const isAdminAuth = localStorage.getItem('adminAuth');
    if (!isAdminAuth) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const testDatabaseConnection = async () => {
    try {
      console.log('Testing database connection...');
      const { data, error } = await getAllContests();
      
      if (error) {
        console.error('Database connection test failed:', error);
        if (error.message?.includes('relation "contests" does not exist')) {
          alert('❌ Database Test Failed!\n\nThe "contests" table does not exist.\n\nPlease:\n1. Go to your Supabase dashboard\n2. Open SQL Editor\n3. Copy and paste the contents of database-setup.sql\n4. Click Run\n5. Try again');
        } else {
          alert(`❌ Database Error: ${error.message}`);
        }
        return;
      }
      
      alert(`✅ Database Connection Successful!\n\nFound ${data?.length || 0} contests in the database.`);
      console.log('Database test successful:', data);
      
    } catch (err: any) {
      console.error('Unexpected database error:', err);
      alert(`❌ Connection Failed: ${err.message}`);
    }
  };

  const totalApplications = applications.length;
  const activeContests = contests.filter(contest => contest.status === 'Open').length;

  const AddContestForm = () => {
    const [formData, setFormData] = useState<{
      title: string;
      description: string;
      category: string;
      prizePool: string;
      duration: string;
      maxTeamSize: number;
      deadline: string;
      status: 'Draft' | 'Open' | 'Closed';
    }>({
      title: '',
      description: '',
      category: 'Web Development',
      prizePool: '',
      duration: '48 hours',
      maxTeamSize: 4,
      deadline: '',
      status: 'Draft'
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      console.log('Form submitted with data:', formData);
      
      // Validate required fields
      if (!formData.title) {
        alert('Please enter a contest title');
        return;
      }
      if (!formData.description) {
        alert('Please enter a contest description');
        return;
      }
      if (!formData.prizePool) {
        alert('Please enter a prize pool amount');
        return;
      }
      if (!formData.deadline) {
        alert('Please select a deadline');
        return;
      }
      
      const newContest: Omit<Contest, 'id' | 'created_at' | 'updated_at'> = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        prize_pool: formData.prizePool,
        duration: formData.duration,
        max_team_size: formData.maxTeamSize,
        deadline: formData.deadline,
        status: formData.status,
        created_by: 'AdminOm' // Set a default admin user
      };
      
      console.log('Submitting contest to database:', newContest);
      
      createContest(newContest).then(({ data, error }) => {
        if (error) {
          console.error('Database error creating contest:', error);
          if (error.message?.includes('relation "contests" does not exist')) {
            alert('⚠️ Database tables not found!\n\nPlease:\n1. Go to your Supabase dashboard\n2. Open SQL Editor\n3. Run the database-setup.sql file\n4. Try again');
          } else {
            alert(`Error creating contest: ${error.message}`);
          }
        } else {
          console.log('Contest created successfully:', data);
          alert('✅ Contest created successfully!');
          // Reload contests
          getAllContests().then(({ data: contestsData }) => {
            if (contestsData) {
              setContests(contestsData);
            }
          });
          setShowAddContest(false);
          // Reset form
          setFormData({
            title: '',
            description: '',
            category: 'Web Development',
            prizePool: '',
            duration: '48 hours',
            maxTeamSize: 4,
            deadline: '',
            status: 'Draft'
          });
        }
      }).catch((err) => {
        console.error('Unexpected error:', err);
        alert(`Unexpected error: ${err.message}`);
      });
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={() => setShowAddContest(false)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Add New Contest</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="AI/Machine Learning">AI/Machine Learning</option>
                  <option value="Blockchain">Blockchain</option>
                  <option value="Game Development">Game Development</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
                rows={3}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Prize Pool</label>
                <input
                  type="text"
                  value={formData.prizePool}
                  onChange={(e) => setFormData({...formData, prizePool: e.target.value})}
                  placeholder="$1,000"
                  required
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Duration</label>
                <select
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="24 hours">24 hours</option>
                  <option value="48 hours">48 hours</option>
                  <option value="72 hours">72 hours</option>
                  <option value="1 week">1 week</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Max Team Size</label>
                <input
                  type="number"
                  value={formData.maxTeamSize}
                  onChange={(e) => setFormData({...formData, maxTeamSize: parseInt(e.target.value)})}
                  min="1"
                  max="10"
                  required
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Deadline</label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                  required
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value as 'Draft' | 'Open' | 'Closed'})}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="Draft">Draft</option>
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddContest(false)}
                className="px-4 py-2"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
              >
                Add Contest
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    );
  };

  const ApplicationsModal = ({ contest }: { contest: Contest }) => {
    const contestApplications = applications.filter(app => app.contest_id === contest.id);
    
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={() => setShowApplications(false)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Applications for {contest.title}</h2>
            <button
              onClick={() => setShowApplications(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          {contestApplications.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No applications yet</p>
          ) : (
            <div className="space-y-4">
              {contestApplications.map((app) => (
                <div key={app.id} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{app.project_name}</h3>
                      <p className="text-gray-400">by {app.applicant_name} ({app.applicant_email})</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">
                        {new Date(app.created_at || '').toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-3">{app.project_description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <span className="text-sm text-gray-400">Tech Stack:</span>
                      <p className="text-white">{app.tech_stack}</p>
                    </div>
                    {app.team_members && (
                      <div>
                        <span className="text-sm text-gray-400">Team:</span>
                        <p className="text-white">{app.team_members}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-3">
                    {app.github_link && (
                      <a
                        href={app.github_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded transition-colors"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        GitHub
                      </a>
                    )}
                    {app.demo_link && (
                      <a
                        href={app.demo_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center mr-3">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-400">Welcome, {localStorage.getItem('adminUser')}</span>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="flex items-center space-x-2 text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-900/50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { key: 'overview', label: 'Overview', icon: Trophy },
              { key: 'contests', label: 'Contests', icon: FileText },
              { key: 'applications', label: 'Applications', icon: Users }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                  activeTab === key
                    ? 'border-red-500 text-red-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex items-center">
                  <Trophy className="w-8 h-8 text-yellow-500 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-white">{contests.length}</p>
                    <p className="text-gray-400 text-sm">Total Contests</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex items-center">
                  <Calendar className="w-8 h-8 text-green-500 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-white">{activeContests}</p>
                    <p className="text-gray-400 text-sm">Active Contests</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex items-center">
                  <Users className="w-8 h-8 text-blue-500 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-white">{totalApplications}</p>
                    <p className="text-gray-400 text-sm">Total Applications</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex items-center">
                  <Clock className="w-8 h-8 text-purple-500 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-white">
                      ${stats?.totalPrizePool?.toLocaleString() || '0'}
                    </p>
                    <p className="text-gray-400 text-sm">Total Prize Pool</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Applications */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Recent Applications</h2>
              <div className="space-y-3">
                {applications.slice(0, 5).map(app => (
                  <div key={app.id} className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-white font-medium">{app.applicant_name}</p>
                        <p className="text-gray-400 text-sm">{app.project_name} • {contests.find(c => c.id === app.contest_id)?.title}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-sm">
                        {new Date(app.created_at || '').toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'contests' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Manage Contests</h2>
              <div className="flex space-x-3">
                <Button
                  onClick={testDatabaseConnection}
                  variant="outline"
                  className="border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white flex items-center space-x-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Test Database</span>
                </Button>
                <Button
                  onClick={() => setShowAddContest(true)}
                  className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Contest</span>
                </Button>
              </div>
            </div>

            <div className="grid gap-6">
              {contests.map(contest => (
                <div key={contest.id} className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-white">{contest.title}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          contest.status === 'Open' ? 'bg-green-500/20 text-green-400' :
                          contest.status === 'Closed' ? 'bg-red-500/20 text-red-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {contest.status}
                        </span>
                      </div>
                      <p className="text-gray-400 mb-3">{contest.description}</p>
                      <div className="grid md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Category:</span>
                          <p className="text-white">{contest.category}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Prize Pool:</span>
                          <p className="text-white">{contest.prize_pool}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Duration:</span>
                          <p className="text-white">{contest.duration}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Deadline:</span>
                          <p className="text-white">{contest.deadline}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-400">
                          {applications.filter(app => app.contest_id === contest.id).length}
                        </p>
                        <p className="text-xs text-gray-400">Applications</p>
                      </div>
                      <Button
                        onClick={() => {
                          setSelectedContest(contest);
                          setShowApplications(true);
                        }}
                        variant="outline"
                        size="sm"
                        className="flex items-center space-x-1"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'applications' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-white">All Applications</h2>
            <div className="space-y-4">
              {applications.map(app => (
                <div key={app.id} className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{app.project_name}</h3>
                      <p className="text-gray-400">for {contests.find(c => c.id === app.contest_id)?.title} by {app.applicant_name}</p>
                    </div>
                    <div className="flex space-x-2">
                      {app.github_link && (
                        <a
                          href={app.github_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded transition-colors"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          GitHub
                        </a>
                      )}
                      {app.demo_link && (
                        <a
                          href={app.demo_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-300 mb-3">{app.project_description}</p>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Tech Stack:</span>
                      <p className="text-white">{app.tech_stack}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Contact:</span>
                      <p className="text-white">{app.applicant_email}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Submitted:</span>
                      <p className="text-white">{new Date(app.created_at || '').toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Modals */}
      {showAddContest && <AddContestForm />}
      {showApplications && selectedContest && <ApplicationsModal contest={selectedContest} />}
    </div>
  );
};

export default AdminDashboard;
