import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { AlertCircle, CheckCircle, Users, Github, Calendar, Trophy, Target, Code2, Edit3, Save, X, User, Mail, Globe, Star } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { getApplicationsLocal, createSampleApplicationsForUser } from '@/lib/localDb'
import { ContestApplication } from '@/lib/supabase'

interface ProfileStats {
  totalApplications: number
  approvedApplications: number
  pendingApplications: number
  rejectedApplications: number
}

const ProfilePage: React.FC = () => {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  
  const [applications, setApplications] = useState<ContestApplication[]>([])
  const [profileLoading, setProfileLoading] = useState(true)
  const [profileStats, setProfileStats] = useState<ProfileStats>({
    totalApplications: 0,
    approvedApplications: 0,
    pendingApplications: 0,
    rejectedApplications: 0
  })
  const [editingApp, setEditingApp] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<{
    githubUrl: string
    teamMembers: string[]
  }>({
    githubUrl: '',
    teamMembers: []
  })
  const [saveLoading, setSaveLoading] = useState(false)

  // Load user applications and calculate stats
  useEffect(() => {
    if (!user && !loading) {
      navigate('/auth?redirect=profile')
      return
    }

    const loadUserData = async () => {
      if (!user) return
      
      try {
        setProfileLoading(true)
        console.log('Loading applications for user:', user.id)
        
        const allApplications = getApplicationsLocal()
        let userApplications = allApplications.filter(app => app.user_id === user.id)
        console.log('Found applications:', userApplications.length)
        
        // Create sample applications if none exist (for testing)
        if (userApplications.length === 0) {
          console.log('No applications found, creating sample applications...')
          const sampleApps = createSampleApplicationsForUser(user.id)
          userApplications = sampleApps
          console.log('Created sample applications:', userApplications.length)
        }
        
        setApplications(userApplications)
        
        // Calculate stats
        const stats: ProfileStats = {
          totalApplications: userApplications.length,
          approvedApplications: userApplications.filter(app => app.status === 'Approved').length,
          pendingApplications: userApplications.filter(app => app.status === 'Pending').length,
          rejectedApplications: userApplications.filter(app => app.status === 'Rejected').length
        }
        
        setProfileStats(stats)
        
      } catch (error) {
        console.error('Error loading user data:', error)
      } finally {
        setProfileLoading(false)
      }
    }

    if (user) {
      console.log('User found, loading data...')
      loadUserData()
    } else {
      console.log('No user found')
    }
  }, [user, loading, navigate])

  const handleEditStart = (application: ContestApplication) => {
    setEditingApp(application.id)
    setEditForm({
      githubUrl: application.github_link || '',
      teamMembers: application.team_members ? application.team_members.split(',').map(m => m.trim()) : []
    })
  }

  const handleEditCancel = () => {
    setEditingApp(null)
    setEditForm({ githubUrl: '', teamMembers: [] })
  }

  const handleEditSave = (applicationId: string) => {
    if (!user) return
    
    try {
      setSaveLoading(true)
      
      // Get all applications from local storage
      const allApplications = getApplicationsLocal()
      
      // Update the specific application
      const updatedApplications = allApplications.map(app => 
        app.id === applicationId
          ? {
              ...app,
              github_url: editForm.githubUrl,
              team_members: editForm.teamMembers.join(','),
              updated_at: new Date().toISOString()
            }
          : app
      )
      
      // Save back to local storage
      localStorage.setItem('bvcodeverse_applications', JSON.stringify(updatedApplications))
      
      // Refresh user applications
      const userApplications = updatedApplications.filter(app => app.user_id === user.id)
      setApplications(userApplications)
      
      setEditingApp(null)
      setEditForm({ githubUrl: '', teamMembers: [] })
      
    } catch (error) {
      console.error('Error updating application:', error)
    } finally {
      setSaveLoading(false)
    }
  }

  const handleTeamMemberChange = (index: number, value: string) => {
    const updatedTeamMembers = [...editForm.teamMembers]
    updatedTeamMembers[index] = value
    setEditForm({ ...editForm, teamMembers: updatedTeamMembers })
  }

  const addTeamMember = () => {
    setEditForm({ 
      ...editForm, 
      teamMembers: [...editForm.teamMembers, ''] 
    })
  }

  const removeTeamMember = (index: number) => {
    const updatedTeamMembers = editForm.teamMembers.filter((_, i) => i !== index)
    setEditForm({ ...editForm, teamMembers: updatedTeamMembers })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-300'
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4" />
      case 'rejected':
        return <AlertCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">Profile Dashboard</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Manage your contest applications and track your progress
            </p>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profileStats.totalApplications}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{profileStats.approvedApplications}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <AlertCircle className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{profileStats.pendingApplications}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{profileStats.rejectedApplications}</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Applications List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Your Applications
              </CardTitle>
              <CardDescription>
                Review and edit your contest applications. You can update GitHub URLs and team member information.
              </CardDescription>
            </CardHeader>
          </Card>

          {applications.length === 0 ? (
            <Card>
              <CardContent className="py-12">
                <div className="text-center space-y-4">
                  <Target className="h-12 w-12 mx-auto text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-900">No Applications Yet</h3>
                  <p className="text-gray-600">
                    You haven't submitted any contest applications yet.
                  </p>
                  <Button onClick={() => navigate('/contests')}>
                    Browse Contests
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {applications.map((application, index) => (
                <motion.div
                  key={application.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-xl">{application.project_name}</CardTitle>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="h-4 w-4" />
                            Applied on {application.created_at ? new Date(application.created_at).toLocaleDateString() : 'N/A'}
                            {application.updated_at && application.created_at && new Date(application.updated_at) > new Date(application.created_at) && (
                              <span className="text-gray-400">
                                • Updated {new Date(application.updated_at).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={`${getStatusColor(application.status)} flex items-center gap-1`}>
                            {getStatusIcon(application.status)}
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      
                      {/* Project Details (Read-only) */}
                      <div className="space-y-4">
                        <h4 className="font-medium flex items-center gap-2">
                          <Target className="h-4 w-4" />
                          Project Details
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                          <div>
                            <Label className="text-sm font-medium text-gray-700">Topic</Label>
                            <p className="text-sm text-gray-900">{application.contest_id}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-700">Category</Label>
                            <p className="text-sm text-gray-900">{application.status}</p>
                          </div>
                          <div className="md:col-span-2">
                            <Label className="text-sm font-medium text-gray-700">Tech Stack</Label>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {application.tech_stack ? application.tech_stack.split(',').map((tech, techIndex) => (
                                <Badge key={techIndex} variant="outline" className="text-xs">
                                  {tech.trim()}
                                </Badge>
                              )) : (
                                <p className="text-sm text-gray-500 italic">No tech stack specified</p>
                              )}
                            </div>
                          </div>
                          <div className="md:col-span-2">
                            <Label className="text-sm font-medium text-gray-700">Description</Label>
                            <p className="text-sm text-gray-900 mt-1">{application.project_description}</p>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Editable Fields */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium flex items-center gap-2">
                            <Code2 className="h-4 w-4" />
                            Editable Information
                          </h4>
                          {editingApp === application.id ? (
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={handleEditCancel}
                              >
                                Cancel
                              </Button>
                              <Button 
                                size="sm"
                                onClick={() => handleEditSave(application.id)}
                                disabled={saveLoading}
                              >
                                {saveLoading ? 'Saving...' : 'Save Changes'}
                              </Button>
                            </div>
                          ) : (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditStart(application)}
                            >
                              Edit
                            </Button>
                          )}
                        </div>

                        {editingApp === application.id ? (
                          <div className="space-y-4 p-4 border rounded-lg bg-blue-50">
                            {/* GitHub URL - Editable */}
                            <div>
                              <Label htmlFor={`github-${application.id}`} className="flex items-center gap-2">
                                <Github className="h-4 w-4" />
                                GitHub Repository URL
                              </Label>
                              <Input
                                id={`github-${application.id}`}
                                value={editForm.githubUrl}
                                onChange={(e) => setEditForm({ ...editForm, githubUrl: e.target.value })}
                                placeholder="https://github.com/username/repository"
                                className="mt-1"
                              />
                            </div>

                            {/* Team Members - Editable */}
                            <div>
                              <Label className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                Team Members
                              </Label>
                              <div className="space-y-2 mt-2">
                                {editForm.teamMembers.map((member, memberIndex) => (
                                  <div key={memberIndex} className="flex gap-2">
                                    <Input
                                      value={member}
                                      onChange={(e) => handleTeamMemberChange(memberIndex, e.target.value)}
                                      placeholder="Team member name"
                                      className="flex-1"
                                    />
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => removeTeamMember(memberIndex)}
                                    >
                                      Remove
                                    </Button>
                                  </div>
                                ))}
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={addTeamMember}
                                >
                                  Add Team Member
                                </Button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                            {/* GitHub URL - Display */}
                            <div>
                              <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                <Github className="h-4 w-4" />
                                GitHub Repository
                              </Label>
                              {application.github_link ? (
                                <a 
                                  href={application.github_link} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline text-sm"
                                >
                                  {application.github_link}
                                </a>
                              ) : (
                                <p className="text-sm text-gray-500 italic">Not provided</p>
                              )}
                            </div>

                            {/* Team Members - Display */}
                            <div>
                              <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                <Users className="h-4 w-4" />
                                Team Members
                              </Label>
                              {application.team_members && application.team_members.length > 0 ? (
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {application.team_members.split(',').map((member, memberIndex) => (
                                    <Badge key={memberIndex} variant="secondary">
                                      {member.trim()}
                                    </Badge>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-sm text-gray-500 italic">No team members added</p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default ProfilePage
