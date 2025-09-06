-- Simple database setup - Run this in Supabase SQL Editor
-- This will create the minimum required tables to make Add Contest work

-- Drop existing tables if they exist
DROP TABLE IF EXISTS contest_applications CASCADE;
DROP TABLE IF EXISTS contests CASCADE;

-- Create contests table with simple structure
CREATE TABLE contests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  prize_pool TEXT NOT NULL,
  duration TEXT NOT NULL,
  max_team_size INTEGER NOT NULL DEFAULT 4,
  deadline TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Draft',
  created_by TEXT DEFAULT 'Admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create applications table
CREATE TABLE contest_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contest_id UUID REFERENCES contests(id) ON DELETE CASCADE,
  user_id UUID DEFAULT gen_random_uuid(),
  applicant_name TEXT NOT NULL,
  applicant_email TEXT NOT NULL,
  project_name TEXT NOT NULL,
  project_description TEXT NOT NULL,
  tech_stack TEXT NOT NULL,
  github_link TEXT,
  demo_link TEXT,
  team_members TEXT,
  status TEXT DEFAULT 'Pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Disable RLS completely
ALTER TABLE contests DISABLE ROW LEVEL SECURITY;
ALTER TABLE contest_applications DISABLE ROW LEVEL SECURITY;

-- Test insert to verify it works
INSERT INTO contests (title, description, category, prize_pool, duration, max_team_size, deadline, status) 
VALUES ('Test Contest', 'Test Description', 'Web Development', '$100', '48 hours', 4, '2025-09-18', 'Open');

-- Show success message
SELECT 'Tables created successfully!' as message;
SELECT COUNT(*) as contest_count FROM contests;
