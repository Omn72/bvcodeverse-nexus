import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Github, Users, Save, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getApplicationsLocal, createSampleApplicationsForUser } from '@/lib/localDb';
import { Link } from 'react-router-dom';
import type { ContestApplication } from '@/lib/supabase';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<ContestApplication[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<ContestApplication | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    githubLink: '',
    teamMembers: '',
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!user) {
      window.location.href = '/login';
      return;
    }
    loadUserApplications();
  }, [user]);

  const loadUserApplications = () => {
    const allApplications = getApplicationsLocal();
    let userApplications = allApplications.filter(app => app.user_id === user?.id);
    
    // If no applications found, create sample ones for testing
    if (userApplications.length === 0 && user?.id) {
      const sampleApps = createSampleApplicationsForUser(user.id);
      userApplications = sampleApps;
    }
    
    setApplications(userApplications);
    
    // Select the first application by default
    if (userApplications.length > 0) {
      setSelectedApplication(userApplications[0]);
      setFormData({
        githubLink: userApplications[0].github_link || '',
        teamMembers: userApplications[0].team_members || '',
      });
    }
  };

  const handleApplicationSelect = (app: ContestApplication) => {
    setSelectedApplication(app);
    setFormData({
      githubLink: app.github_link || '',
      teamMembers: app.team_members || '',
    });
    setEditMode(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    if (!selectedApplication) return;

    // Update application in local storage
    const allApplications = getApplicationsLocal();
    const updatedApplications = allApplications.map(app => 
      app.id === selectedApplication.id 
        ? {
            ...app,
            github_link: formData.githubLink,
            team_members: formData.teamMembers,
            updated_at: new Date().toISOString()
          }
        : app
    );

    localStorage.setItem('bvcodeverse_applications', JSON.stringify(updatedApplications));
    
    // Update local state
    const updatedApp = updatedApplications.find(app => app.id === selectedApplication.id);
    if (updatedApp) {
      setSelectedApplication(updatedApp);
      setApplications(prev => prev.map(app => 
        app.id === selectedApplication.id ? updatedApp : app
      ));
    }

    setEditMode(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <p>Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link 
            to="/"
            className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Your Profile</h1>
              <p className="text-gray-400">
                {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Anonymous'}
              </p>
            </div>
          </div>
        </motion.div>

        {applications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No Applications Found</h2>
            <p className="text-gray-400 mb-6">You haven't submitted any contest applications yet.</p>
            <Link
              to="/contest"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white font-medium hover:shadow-lg transition-all"
            >
              Browse Contests
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Applications List */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <h2 className="text-xl font-semibold mb-4">Your Applications</h2>
              <div className="space-y-3">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    onClick={() => handleApplicationSelect(app)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedApplication?.id === app.id
                        ? 'border-cyan-500 bg-cyan-500/10'
                        : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                    }`}
                  >
                    <h3 className="font-medium text-sm">{app.project_name}</h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Status: <span className={`${
                        app.status === 'Approved' ? 'text-green-400' :
                        app.status === 'Rejected' ? 'text-red-400' : 'text-yellow-400'
                      }`}>
                        {app.status}
                      </span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(app.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Application Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              {selectedApplication ? (
                <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Application Details</h2>
                    {!editMode && (
                      <button
                        onClick={() => setEditMode(true)}
                        className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white text-sm font-medium hover:shadow-lg transition-all"
                      >
                        Edit Profile Info
                      </button>
                    )}
                  </div>

                  <div className="grid gap-6">
                    
                    {/* Read-only fields */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Project Name (Read-only)
                        </label>
                        <div className="px-4 py-3 bg-gray-800 rounded-lg text-gray-300 border border-gray-600">
                          {selectedApplication.project_name}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Tech Stack (Read-only)
                        </label>
                        <div className="px-4 py-3 bg-gray-800 rounded-lg text-gray-300 border border-gray-600">
                          {selectedApplication.tech_stack}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Project Description (Read-only)
                      </label>
                      <div className="px-4 py-3 bg-gray-800 rounded-lg text-gray-300 border border-gray-600 min-h-[100px]">
                        {selectedApplication.project_description}
                      </div>
                    </div>

                    {/* Editable fields */}
                    <div className="border-t border-gray-700 pt-6">
                      <h3 className="text-lg font-semibold mb-4 text-cyan-400">Editable Information</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            <Github className="w-4 h-4 inline mr-2" />
                            GitHub Repository URL
                          </label>
                          <input
                            type="url"
                            name="githubLink"
                            value={formData.githubLink}
                            onChange={handleInputChange}
                            disabled={!editMode}
                            placeholder="https://github.com/username/repository"
                            className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                              editMode 
                                ? 'bg-gray-800 border-gray-600 text-white focus:border-cyan-500 focus:outline-none' 
                                : 'bg-gray-800 border-gray-600 text-gray-300'
                            }`}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            <Users className="w-4 h-4 inline mr-2" />
                            Team Members
                          </label>
                          <textarea
                            name="teamMembers"
                            value={formData.teamMembers}
                            onChange={handleInputChange}
                            disabled={!editMode}
                            rows={3}
                            placeholder="Enter team member names (one per line or comma-separated)"
                            className={`w-full px-4 py-3 rounded-lg border transition-colors resize-none ${
                              editMode 
                                ? 'bg-gray-800 border-gray-600 text-white focus:border-cyan-500 focus:outline-none' 
                                : 'bg-gray-800 border-gray-600 text-gray-300'
                            }`}
                          />
                        </div>
                      </div>

                      {editMode && (
                        <div className="flex items-center space-x-4 mt-6">
                          <button
                            onClick={handleSave}
                            className="flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg text-white font-medium hover:shadow-lg transition-all"
                          >
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </button>
                          <button
                            onClick={() => {
                              setEditMode(false);
                              setFormData({
                                githubLink: selectedApplication.github_link || '',
                                teamMembers: selectedApplication.team_members || '',
                              });
                            }}
                            className="px-6 py-3 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      )}

                      {saved && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400"
                        >
                          ✅ Profile information saved successfully!
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700 text-center">
                  <p className="text-gray-400">Select an application to view details</p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
