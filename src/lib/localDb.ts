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
export const checkExistingApplication = (userId: string, contestId: string): ContestApplication | null => {
  const applications = getApplicationsLocal()
  return applications.find(app => app.user_id === userId && app.contest_id === contestId) || null
}

export const submitApplicationLocal = (appData: Omit<ContestApplication, 'id' | 'created_at' | 'updated_at' | 'status'>) => {
  // Check for existing application
  const existingApp = checkExistingApplication(appData.user_id, appData.contest_id)
  if (existingApp) {
    return { 
      data: null, 
      error: { 
        message: 'You have already submitted an application for this contest',
        code: 'DUPLICATE_APPLICATION',
        existingApplication: existingApp
      } 
    }
  }

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

  // Add sample applications for testing profile functionality
  if (getApplicationsLocal().length === 0) {
    const sampleApplications: ContestApplication[] = [
      {
        id: generateId(),
        contest_id: getContestsLocal()[0]?.id || 'sample-contest-1',
        user_id: 'sample-user-id', // This would be replaced with actual user ID
        applicant_name: 'John Doe',
        applicant_email: 'john.doe@example.com',
        project_name: 'E-Commerce Platform',
        project_description: 'A modern e-commerce platform with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, and payment integration.',
        tech_stack: 'React, Node.js, MongoDB, Stripe API',
        github_link: 'https://github.com/johndoe/ecommerce-platform',
        demo_link: 'https://ecommerce-demo.com',
        team_members: 'John Doe (Lead Developer), Jane Smith (UI/UX Designer)',
        status: 'Pending',
        created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        updated_at: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: generateId(),
        contest_id: getContestsLocal()[1]?.id || 'sample-contest-2',
        user_id: 'sample-user-id',
        applicant_name: 'John Doe',
        applicant_email: 'john.doe@example.com',
        project_name: 'AI Code Review Assistant',
        project_description: 'An AI-powered tool that automatically reviews code for bugs, security vulnerabilities, and best practices using machine learning models.',
        tech_stack: 'Python, TensorFlow, FastAPI, Docker',
        github_link: 'https://github.com/johndoe/ai-code-reviewer',
        demo_link: '',
        team_members: 'John Doe (ML Engineer), Mike Johnson (Backend Developer), Sarah Wilson (DevOps)',
        status: 'Approved',
        created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        updated_at: new Date(Date.now() - 86400000).toISOString()
      }
    ]
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(sampleApplications))
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

// Function to create sample applications for a specific user (for testing Profile functionality)
export const createSampleApplicationsForUser = (userId: string) => {
  const contests = getContestsLocal()
  if (contests.length === 0) {
    initializeLocalData() // Ensure contests exist first
  }
  
  const sampleApplications: ContestApplication[] = [
    {
      id: generateId(),
      contest_id: contests[0]?.id || 'sample-contest-1',
      user_id: userId,
      applicant_name: 'Test User',
      applicant_email: 'test@example.com',
      project_name: 'E-Commerce Platform',
      project_description: 'A modern e-commerce platform with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, and payment integration.',
      tech_stack: 'React, Node.js, MongoDB, Stripe API',
      github_link: 'https://github.com/testuser/ecommerce-platform',
      demo_link: 'https://ecommerce-demo.com',
      team_members: 'Test User (Lead Developer), Jane Smith (UI/UX Designer)',
      status: 'Pending',
      created_at: new Date(Date.now() - 86400000).toISOString(),
      updated_at: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: generateId(),
      contest_id: contests[1]?.id || 'sample-contest-2',
      user_id: userId,
      applicant_name: 'Test User',
      applicant_email: 'test@example.com',
      project_name: 'AI Code Review Assistant',
      project_description: 'An AI-powered tool that automatically reviews code for bugs, security vulnerabilities, and best practices using machine learning models.',
      tech_stack: 'Python, TensorFlow, FastAPI, Docker',
      github_link: '',
      demo_link: '',
      team_members: '',
      status: 'Approved',
      created_at: new Date(Date.now() - 172800000).toISOString(),
      updated_at: new Date(Date.now() - 86400000).toISOString()
    }
  ]
  
  // Add to existing applications
  const existingApplications = getApplicationsLocal()
  const updatedApplications = [...existingApplications, ...sampleApplications]
  localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(updatedApplications))
  
  return sampleApplications
}
