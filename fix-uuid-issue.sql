-- Fix the created_by field type issue
-- Run this script in your Supabase SQL Editor

-- Drop the existing contests table if it has UUID created_by field
-- WARNING: This will delete existing data
DROP TABLE IF EXISTS contest_applications;
DROP TABLE IF EXISTS contests;

-- Recreate contests table with correct created_by field type
CREATE TABLE contests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  prize_pool VARCHAR(50) NOT NULL,
  duration VARCHAR(50) NOT NULL,
  max_team_size INTEGER NOT NULL DEFAULT 1,
  deadline DATE NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'Draft' CHECK (status IN ('Draft', 'Open', 'Closed')),
  created_by VARCHAR(255) DEFAULT 'Admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Recreate contest_applications table
CREATE TABLE contest_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contest_id UUID NOT NULL REFERENCES contests(id) ON DELETE CASCADE,
  user_id UUID DEFAULT gen_random_uuid(),
  applicant_name VARCHAR(255) NOT NULL,
  applicant_email VARCHAR(255) NOT NULL,
  project_name VARCHAR(255) NOT NULL,
  project_description TEXT NOT NULL,
  tech_stack TEXT NOT NULL,
  github_link TEXT,
  demo_link TEXT,
  team_members TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(contest_id, applicant_email)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contests_status ON contests(status);
CREATE INDEX IF NOT EXISTS idx_contests_created_at ON contests(created_at);
CREATE INDEX IF NOT EXISTS idx_contest_applications_contest_id ON contest_applications(contest_id);
CREATE INDEX IF NOT EXISTS idx_contest_applications_status ON contest_applications(status);

-- Disable Row Level Security for development
ALTER TABLE contests DISABLE ROW LEVEL SECURITY;
ALTER TABLE contest_applications DISABLE ROW LEVEL SECURITY;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers to automatically update updated_at columns
DROP TRIGGER IF EXISTS update_contests_updated_at ON contests;
DROP TRIGGER IF EXISTS update_contest_applications_updated_at ON contest_applications;

CREATE TRIGGER update_contests_updated_at BEFORE UPDATE ON contests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contest_applications_updated_at BEFORE UPDATE ON contest_applications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample contest data
INSERT INTO contests (title, description, category, prize_pool, duration, max_team_size, deadline, status, created_by) 
VALUES 
  ('Web Development Hackathon', 'Build an innovative web application using modern technologies', 'Web Development', '$5000', '48 hours', 4, '2025-09-18', 'Open', 'Admin'),
  ('AI Challenge 2025', 'Create an AI-powered solution to solve real-world problems', 'AI/Machine Learning', '$3000', '72 hours', 3, '2025-09-25', 'Open', 'Admin'),
  ('Mobile App Contest', 'Develop a mobile application that makes a difference', 'Mobile App', '$2500', '48 hours', 4, '2025-10-01', 'Draft', 'Admin');

-- Verify the fix
SELECT 'Database recreated successfully with correct field types!' as message;
SELECT COUNT(*) as contest_count FROM contests;
SELECT title, created_by FROM contests LIMIT 3;
