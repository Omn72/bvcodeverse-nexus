import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Send, Trophy, Clock, Users, Star } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useSearchParams } from 'react-router-dom';
import { submitContestApplication, getActiveContests, type Contest } from '@/lib/supabase';
import { submitApplicationLocal, getActiveContestsLocal, checkExistingApplication } from '@/lib/localDb';
import Layout from '@/components/Layout';

const ContestApplication: React.FC = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const contestId = searchParams.get('contestId');
  
  const [contests, setContests] = useState<Contest[]>([]);
  const [selectedContestId, setSelectedContestId] = useState<string>('');
  const [formData, setFormData] = useState({
    projectName: '',
    projectDescription: '',
    techStack: '',
    githubLink: '',
    demoLink: '',
    teamMembers: '',
    category: 'web-development'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [existingApplication, setExistingApplication] = useState<any | null>(null);
  const [instantMode, setInstantMode] = useState(true); // INSTANT MODE for applications

  useEffect(() => {
    if (!user) {
      // Redirect to login if not authenticated
      window.location.href = '/login';
    } else {
      loadActiveContests();
    }
  }, [user]);

  // Check for existing application when contest selection changes
  useEffect(() => {
    if (user && selectedContestId) {
      const existingApp = checkExistingApplication(user.id, selectedContestId);
      setExistingApplication(existingApp);
    }
  }, [user, selectedContestId]);

  const loadActiveContests = async () => {
    try {
      if (instantMode) {
        // INSTANT MODE: Load from local storage
        const localContests = getActiveContestsLocal();
        setContests(localContests);
        if (contestId) {
          // Pre-select contest from URL parameter
          setSelectedContestId(contestId);
        } else if (localContests.length > 0) {
          setSelectedContestId(localContests[0].id);
        }
        return;
      }
      
      // Original database mode
      const { data, error } = await getActiveContests();
      if (error) {
        console.error('Error loading contests:', error);
        setError('Failed to load contests');
      } else if (data) {
        setContests(data);
        if (data.length > 0) {
          setSelectedContestId(data[0].id); // Select first contest by default
        }
      }
    } catch (err) {
      console.error('Error loading contests:', err);
      setError('Failed to load contests');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!selectedContestId) {
      setError('Please select a contest');
      setIsSubmitting(false);
      return;
    }

    // Double-check for existing application
    if (existingApplication) {
      setError('You have already submitted an application for this contest');
      setIsSubmitting(false);
      return;
    }

    try {
      // Create application object
      const applicationData = {
        contest_id: selectedContestId,
        user_id: user!.id,
        applicant_name: user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Anonymous',
        applicant_email: user?.email || '',
        project_name: formData.projectName,
        project_description: formData.projectDescription,
        tech_stack: formData.techStack,
        github_link: formData.githubLink || undefined,
        demo_link: formData.demoLink || undefined,
        team_members: formData.teamMembers || undefined,
      };

      if (instantMode) {
        // INSTANT MODE: Save to local storage - NO DELAYS!
        const { data, error } = submitApplicationLocal(applicationData);
        
        if (error) {
          if (error.code === 'DUPLICATE_APPLICATION') {
            setExistingApplication(error.existingApplication);
            setError('You have already submitted an application for this contest');
          } else {
            throw error;
          }
          setIsSubmitting(false);
          return;
        }

        console.log('✅ INSTANT: Application submitted!', data);
        setSubmitted(true);
      } else {
        // Original database mode
        const { data, error } = await submitContestApplication(applicationData);

        if (error) {
          throw error;
        }

        console.log('Contest application submitted successfully:', data);
        setSubmitted(true);
      }
      
      // Reset form
      setFormData({
        projectName: '',
        projectDescription: '',
        techStack: '',
        githubLink: '',
        demoLink: '',
        teamMembers: '',
        category: 'web-development'
      });
      
    } catch (error: any) {
      console.error('Error submitting application:', error);
      if (error.message?.includes('unique')) {
        setError('You have already applied to this contest!');
      } else if (error.message?.includes('timed out')) {
        setError('Submission timed out. Please check your internet connection and try again.');
      } else {
        setError(error.message || 'Failed to submit application. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <p>Please log in to apply for contests.</p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Application Submitted!</h2>
          <p className="text-gray-400 mb-6">Thank you for applying to our coding contest. We'll review your application and get back to you soon.</p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white font-medium hover:shadow-lg transition-all"
          >
            Submit Another Application
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-black text-white pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mb-6">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Apply for Coding Contest</h1>
          <p className="text-gray-400 text-lg">
            Showcase your skills and compete with the best developers in our community
          </p>
        </motion.div>

        {/* Contest Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 text-center">
            <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Prize Pool</h3>
            <p className="text-gray-400">$5,000 in rewards</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 text-center">
            <Clock className="w-8 h-8 text-blue-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Duration</h3>
            <p className="text-gray-400">48 hours hackathon</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 text-center">
            <Users className="w-8 h-8 text-green-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Team Size</h3>
            <p className="text-gray-400">1-4 members</p>
          </div>
        </div>

        {/* Application Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-900 border border-gray-800 rounded-lg p-8"
        >
          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-6">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contest Selection */}
            <div>
              <label htmlFor="contestSelect" className="block text-sm font-medium mb-2">
                Select Contest *
              </label>
              <select
                id="contestSelect"
                value={selectedContestId}
                onChange={(e) => setSelectedContestId(e.target.value)}
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option value="">Choose a contest...</option>
                {contests.map((contest) => (
                  <option key={contest.id} value={contest.id}>
                    {contest.title} - {contest.prize_pool} ({contest.category})
                  </option>
                ))}
              </select>
              
              {/* Existing Application Warning */}
              {existingApplication && selectedContestId && (
                <div className="mt-3 p-3 bg-yellow-900/30 border border-yellow-600/30 rounded-lg">
                  <div className="flex items-center space-x-2 text-yellow-400 text-sm">
                    <Trophy className="w-4 h-4 flex-shrink-0" />
                    <span className="font-medium">You have already applied to this contest</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Application submitted on {existingApplication.created_at ? 
                      new Date(existingApplication.created_at).toLocaleDateString() : 'Unknown date'
                    } • Status: {existingApplication.status}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="projectName" className="block text-sm font-medium mb-2">
                Project Name *
              </label>
              <input
                type="text"
                id="projectName"
                name="projectName"
                value={formData.projectName}
                onChange={handleInputChange}
                required
                disabled={!!existingApplication}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter your project name"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                disabled={!!existingApplication}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="web-development">Web Development</option>
                <option value="mobile-app">Mobile App</option>
                <option value="ai-ml">AI/Machine Learning</option>
                <option value="blockchain">Blockchain</option>
                <option value="game-development">Game Development</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="projectDescription" className="block text-sm font-medium mb-2">
                Project Description *
              </label>
              <textarea
                id="projectDescription"
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleInputChange}
                required
                rows={4}
                disabled={!!existingApplication}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Describe your project idea and what problem it solves..."
              />
            </div>

            <div>
              <label htmlFor="techStack" className="block text-sm font-medium mb-2">
                Tech Stack *
              </label>
              <input
                type="text"
                id="techStack"
                name="techStack"
                value={formData.techStack}
                onChange={handleInputChange}
                required
                disabled={!!existingApplication}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="e.g., React, Node.js, Python, MongoDB"
              />
            </div>

            <div>
              <label htmlFor="githubLink" className="block text-sm font-medium mb-2">
                GitHub Repository (Optional)
              </label>
              <input
                type="url"
                id="githubLink"
                name="githubLink"
                value={formData.githubLink}
                onChange={handleInputChange}
                disabled={!!existingApplication}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="https://github.com/username/project"
              />
            </div>

            <div>
              <label htmlFor="demoLink" className="block text-sm font-medium mb-2">
                Demo/Live Link (Optional)
              </label>
              <input
                type="url"
                id="demoLink"
                name="demoLink"
                value={formData.demoLink}
                onChange={handleInputChange}
                disabled={!!existingApplication}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="https://your-demo.com"
              />
            </div>

            <div>
              <label htmlFor="teamMembers" className="block text-sm font-medium mb-2">
                Team Members (Optional)
              </label>
              <textarea
                id="teamMembers"
                name="teamMembers"
                value={formData.teamMembers}
                onChange={handleInputChange}
                rows={3}
                disabled={!!existingApplication}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="List your team members (names and roles)..."
              />
            </div>

            <div className="flex items-center justify-end space-x-4 pt-6">
              {existingApplication ? (
                <div className="flex flex-col items-end space-y-3">
                  <div className="flex items-center space-x-2 text-yellow-400">
                    <Trophy className="w-5 h-5" />
                    <span className="font-medium">Already Applied</span>
                  </div>
                  <div className="text-sm text-gray-400 text-right">
                    <p>You submitted an application for this contest on</p>
                    <p className="font-medium text-cyan-400">
                      {existingApplication.created_at ? new Date(existingApplication.created_at).toLocaleDateString() : 'Unknown date'}
                    </p>
                    <p className="mt-1">
                      Status: <span className={`font-medium ${
                        existingApplication.status === 'Approved' ? 'text-green-400' :
                        existingApplication.status === 'Rejected' ? 'text-red-400' :
                        'text-yellow-400'
                      }`}>
                        {existingApplication.status}
                      </span>
                    </p>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    Select a different contest to submit a new application
                  </div>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting || !!existingApplication}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Application
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </motion.div>

        {/* Additional Info */}
        <div className="mt-12 text-center text-gray-400">
          <p className="mb-4">
            <Star className="w-4 h-4 inline mr-1" />
            Applications are reviewed within 24-48 hours
          </p>
          <p className="text-sm">
            Need help? Contact us at contests@bvcodeverse.com
          </p>
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default ContestApplication;
