// INSTANT LOCAL DATABASE - No delays, no network issues
import type { Contest, ContestApplication } from './supabase'

// Local storage keys
const CONTESTS_KEY = 'bvcodeverse_contests'
const APPLICATIONS_KEY = 'bvcodeverse_applications'

// Generate UUID
const generateId = () => Math.random().toString(36).substring(2) + Date.now().toString(36)

// INSTANT Contest Functions
export const createContestLocal = (contestData: Omit<Contest, 'id' | 'created_at' | 'updated_at'>) => {
  const contests = getContestsLocal()
  const newContest: Contest = {
    ...contestData,
    id: generateId(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
  
  contests.unshift(newContest) // Add to beginning for latest first
  localStorage.setItem(CONTESTS_KEY, JSON.stringify(contests))
  
  return { data: newContest, error: null }
}

export const getContestsLocal = (): Contest[] => {
  try {
    const stored = localStorage.getItem(CONTESTS_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export const getActiveContestsLocal = (): Contest[] => {
  return getContestsLocal().filter(c => c.status === 'Open')
}

// INSTANT Application Functions
export const submitApplicationLocal = (appData: Omit<ContestApplication, 'id' | 'created_at' | 'updated_at' | 'status'>) => {
  const applications = getApplicationsLocal()
  const newApp: ContestApplication = {
    ...appData,
    id: generateId(),
    status: 'Pending',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
  
  applications.unshift(newApp)
  localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(applications))
  
  return { data: newApp, error: null }
}

export const getApplicationsLocal = (): ContestApplication[] => {
  try {
    const stored = localStorage.getItem(APPLICATIONS_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

// Initialize with sample data if empty
export const initializeLocalData = () => {
  if (getContestsLocal().length === 0) {
    const sampleContests: Contest[] = [
      {
        id: generateId(),
        title: "Web Development Challenge",
        description: "Build an innovative web application using modern technologies",
        category: "Web Development",
        prize_pool: "$5,000",
        duration: "48 hours",
        max_team_size: 4,
        deadline: "2025-09-20T23:59:59",
        status: "Open",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: "AdminOm"
      },
      {
        id: generateId(),
        title: "AI/ML Innovation Contest",
        description: "Create an AI solution that solves real-world problems",
        category: "AI/Machine Learning",
        prize_pool: "$3,000",
        duration: "72 hours",
        max_team_size: 3,
        deadline: "2025-09-25T23:59:59",
        status: "Open",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: "AdminOm"
      }
    ]
    localStorage.setItem(CONTESTS_KEY, JSON.stringify(sampleContests))
  }
}

// INSTANT Delete Contest Function
export const deleteContestLocal = (contestId: string) => {
  const contests = getContestsLocal()
  const filteredContests = contests.filter(c => c.id !== contestId)
  localStorage.setItem(CONTESTS_KEY, JSON.stringify(filteredContests))
  
  // Also remove related applications
  const applications = getApplicationsLocal()
  const filteredApplications = applications.filter(a => a.contest_id !== contestId)
  localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(filteredApplications))
  
  return { data: { id: contestId }, error: null }
}

// INSTANT Update Contest Status Function
export const updateContestStatusLocal = (contestId: string, newStatus: Contest['status']) => {
  const contests = getContestsLocal()
  const updatedContests = contests.map(c => 
    c.id === contestId 
      ? { ...c, status: newStatus, updated_at: new Date().toISOString() }
      : c
  )
  localStorage.setItem(CONTESTS_KEY, JSON.stringify(updatedContests))
  
  const updatedContest = updatedContests.find(c => c.id === contestId)
  return { data: updatedContest, error: null }
}
