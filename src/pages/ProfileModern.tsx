import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, CheckCircle, Users, Github, Calendar, Trophy, Target, Code2, Edit3, Save, X, User, Mail, Globe, Star } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { ContestApplication, getApplicationsByUser, updateMyApplication, warmupDatabase } from '@/lib/supabase'
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
  const [isSyncing, setIsSyncing] = useState(false)
  const hasCacheRef = useRef(false)

  // Load user applications and calculate stats
  useEffect(() => {
    if (user && !loading) {
      // 1) Instant paint from cache (if any)
      try {
        const cacheKey = `bv_apps_${user.id}`
        const cached = localStorage.getItem(cacheKey)
        if (cached) {
          const apps = JSON.parse(cached) as ContestApplication[]
          hasCacheRef.current = true
          setApplications(apps)
          // fast stats
          setProfileStats({
            totalApplications: apps.length,
            approvedApplications: apps.filter(a => a.status === 'Approved').length,
            pendingApplications: apps.filter(a => a.status === 'Pending').length,
            rejectedApplications: apps.filter(a => a.status === 'Rejected').length,
          })
        }
      } catch {}

      // 2) Warm up DB in the background (don’t block UI)
      warmupDatabase().catch(() => {})

      // 3) Fetch fresh data in background; show subtle syncing indicator
      setIsSyncing(true)
      loadUserData()
    }
  }, [user, loading, navigate])

  const loadUserData = async () => {
    if (!user) return
    
    try {
      // Only show blocking loader if we had no cache
      if (!hasCacheRef.current) setProfileLoading(true)
      console.log('Loading applications from DB for user:', user.id)

      const { data, error } = await getApplicationsByUser(user.id)
      if (error) {
        console.error('Error fetching applications from DB:', error)
        if (!hasCacheRef.current) setApplications([])
      } else {
        setApplications((data as any[]) || [])
        // Update cache with fresh results
        try {
          localStorage.setItem(`bv_apps_${user.id}`, JSON.stringify((data as any[]) || []))
        } catch {}
      }
      
      // Calculate stats
      const apps = (Array.isArray((data as any[])) ? (data as any[]) : []) as ContestApplication[]
      const stats: ProfileStats = {
        totalApplications: apps.length,
        approvedApplications: apps.filter(app => app.status === 'Approved').length,
        pendingApplications: apps.filter(app => app.status === 'Pending').length,
        rejectedApplications: apps.filter(app => app.status === 'Rejected').length
      }
      
      setProfileStats(stats)
      
    } catch (error) {
      console.error('Error loading user applications:', error)
    } finally {
      setProfileLoading(false)
  setIsSyncing(false)
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
      const updates: any = {
        github_link: editForm.githubUrl || null,
        team_members: editForm.teamMembers.join(',') || null,
      }
      const { error } = await updateMyApplication(applicationId, user.id, updates)
      if (error) {
        console.error('Error saving application:', error)
      }
      // Optimistic cache update
      try {
        const next = applications.map(a => a.id === applicationId ? { ...a, ...updates, updated_at: new Date().toISOString() } as any : a)
        setApplications(next as any)
        localStorage.setItem(`bv_apps_${user.id}`, JSON.stringify(next))
      } catch {}

      // Refresh from DB (non-blocking UI)
      const { data } = await getApplicationsByUser(user.id)
      setApplications((data as any[]) || [])
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

  // Don’t block the whole page; we’ll render and show a subtle syncing badge instead

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Please sign in</h2>
            <p className="text-muted-foreground">You need to be logged in to view your profile.</p>
            <a href="/login?redirect=/profile" className="inline-flex items-center px-5 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
              Go to Login
            </a>
          </div>
        </div>
      </Layout>
    )
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
                {isSyncing && (
                  <span className="ml-2 inline-flex items-center gap-2 text-xs text-primary">
                    <span className="w-3 h-3 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    Syncing…
                  </span>
                )}
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

          {/* Pending/Rejected cards removed per request */}
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
                {profileLoading ? (
                  <>
                    <div className="w-16 h-16 rounded-full border-2 border-primary/20 border-t-primary animate-spin mb-4" />
                    <p className="text-muted-foreground">Loading your applications…</p>
                  </>
                ) : (
                  <>
                    <Code2 className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Applications Yet</h3>
                    <p className="text-muted-foreground text-center max-w-md">
                      You haven't submitted any contest applications yet. Start building amazing projects and join our contests!
                    </p>
                  </>
                )}
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
                            {application.status === 'Approved' && (
                              <Badge className={`${getStatusColor('Approved')} border`}>
                                <div className="flex items-center gap-1">
                                  {getStatusIcon('Approved')}
                                  Approved
                                </div>
                              </Badge>
                            )}
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
                          <Label className="text-sm font-medium text-foreground">Contest</Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            {(application as any).contests?.title || application.contest_id}
                          </p>
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
