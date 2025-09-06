import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, CheckCircle, Users, Github, Calendar, Trophy, Target, Code2, Edit3, Save, X, User, Mail, Globe, Star } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { getApplicationsLocal, createSampleApplicationsForUser } from '@/lib/localDb'
import { ContestApplication } from '@/lib/supabase'
import Layout from '@/components/Layout'

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

    if (user && !loading) {
      loadUserData()
    }
  }, [user, loading, navigate])

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
      console.error('Error loading user applications:', error)
    } finally {
      setProfileLoading(false)
    }
  }

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

  const handleEditSave = async (applicationId: string) => {
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
              github_link: editForm.githubUrl,
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case 'Rejected':
        return <X className="h-4 w-4 text-red-400" />
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-500/10 text-green-400 border-green-500/20'
      case 'Rejected':
        return 'bg-red-500/10 text-red-400 border-red-500/20'
      default:
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
    }
  }

  if (loading || profileLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background">
        {/* Background Effects */}
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-secondary/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 py-8 relative">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <User className="h-6 w-6 text-background" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Developer Profile
              </h1>
              <p className="text-muted-foreground flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {user.email}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,255,0.1)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Target className="h-4 w-4" />
                Total Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{profileStats.totalApplications}</div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.1)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Approved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">{profileStats.approvedApplications}</div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(234,179,8,0.1)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-400">{profileStats.pendingApplications}</div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-red-500/20 hover:border-red-500/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.1)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <X className="h-4 w-4" />
                Rejected
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-400">{profileStats.rejectedApplications}</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Applications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Trophy className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Contest Applications</h2>
          </div>

          {applications.length === 0 ? (
            <Card className="bg-card/30 backdrop-blur-sm border-border/50">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Code2 className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Applications Yet</h3>
                <p className="text-muted-foreground text-center max-w-md">
                  You haven't submitted any contest applications yet. Start building amazing projects and join our contests!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {applications.map((application, index) => (
                <motion.div
                  key={application.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Card className="bg-card/30 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,255,0.1)] group">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl text-foreground flex items-center gap-3">
                            <Star className="h-5 w-5 text-primary" />
                            {application.project_name}
                            <Badge className={`${getStatusColor(application.status)} border`}>
                              <div className="flex items-center gap-1">
                                {getStatusIcon(application.status)}
                                {application.status}
                              </div>
                            </Badge>
                          </CardTitle>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Applied: {application.created_at ? new Date(application.created_at).toLocaleDateString() : 'N/A'}
                            </div>
                            {application.updated_at && application.created_at && new Date(application.updated_at) > new Date(application.created_at) && (
                              <div className="flex items-center gap-1 text-primary">
                                <div className="w-1 h-1 rounded-full bg-primary" />
                                Updated: {new Date(application.updated_at).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {editingApp !== application.id && (
                          <Button
                            onClick={() => handleEditStart(application)}
                            size="sm"
                            variant="outline"
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 border-primary/20 hover:border-primary/40 hover:bg-primary/10"
                          >
                            <Edit3 className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* GitHub URL */}
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-foreground flex items-center gap-2">
                            <Github className="h-4 w-4 text-primary" />
                            GitHub Repository
                          </Label>
                          {editingApp === application.id ? (
                            <div className="space-y-3">
                              <Input
                                value={editForm.githubUrl}
                                onChange={(e) => setEditForm(prev => ({ ...prev, githubUrl: e.target.value }))}
                                placeholder="https://github.com/username/repository"
                                className="bg-input border-border/50 focus:border-primary"
                              />
                              <div className="flex gap-2">
                                <Button
                                  onClick={() => handleEditSave(application.id)}
                                  size="sm"
                                  disabled={saveLoading}
                                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                                >
                                  {saveLoading ? (
                                    <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                                  ) : (
                                    <>
                                      <Save className="h-4 w-4 mr-1" />
                                      Save
                                    </>
                                  )}
                                </Button>
                                <Button
                                  onClick={handleEditCancel}
                                  size="sm"
                                  variant="outline"
                                  className="border-border/50 hover:border-red-500/50 hover:bg-red-500/10"
                                >
                                  <X className="h-4 w-4 mr-1" />
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div>
                              {application.github_link ? (
                                <a
                                  href={application.github_link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                                >
                                  <Globe className="h-4 w-4" />
                                  {application.github_link}
                                </a>
                              ) : (
                                <p className="text-sm text-muted-foreground italic">No GitHub URL provided</p>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Team Members */}
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-foreground flex items-center gap-2">
                            <Users className="h-4 w-4 text-primary" />
                            Team Members
                          </Label>
                          {editingApp === application.id ? (
                            <Input
                              value={editForm.teamMembers.join(', ')}
                              onChange={(e) => setEditForm(prev => ({ 
                                ...prev, 
                                teamMembers: e.target.value.split(',').map(m => m.trim()).filter(m => m) 
                              }))}
                              placeholder="Enter team member names separated by commas"
                              className="bg-input border-border/50 focus:border-primary"
                            />
                          ) : (
                            <div>
                              {application.team_members && application.team_members.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                  {application.team_members.split(',').map((member, memberIndex) => (
                                    <Badge key={memberIndex} variant="secondary" className="bg-secondary/20 text-secondary border-secondary/20">
                                      {member.trim()}
                                    </Badge>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-sm text-muted-foreground italic">No team members specified</p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Project Details */}
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium text-foreground">Contest ID</Label>
                          <p className="text-sm text-muted-foreground mt-1">{application.contest_id}</p>
                        </div>
                        
                        <div>
                          <Label className="text-sm font-medium text-foreground">Tech Stack</Label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {application.tech_stack ? application.tech_stack.split(',').map((tech, techIndex) => (
                              <Badge key={techIndex} variant="outline" className="bg-muted/30 border-primary/20 text-foreground">
                                {tech.trim()}
                              </Badge>
                            )) : (
                              <p className="text-sm text-muted-foreground italic">No tech stack specified</p>
                            )}
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-foreground">Description</Label>
                          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{application.project_description}</p>
                        </div>
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
    </Layout>
  )
}

export default ProfilePage
