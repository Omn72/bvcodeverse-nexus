-- Create contests table
CREATE TABLE IF NOT EXISTS contests (
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

-- Create contest_applications table
CREATE TABLE IF NOT EXISTS contest_applications (
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
  UNIQUE(contest_id, applicant_email) -- Prevent multiple applications from same email to same contest
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contests_status ON contests(status);
CREATE INDEX IF NOT EXISTS idx_contests_created_at ON contests(created_at);
CREATE INDEX IF NOT EXISTS idx_contest_applications_contest_id ON contest_applications(contest_id);
CREATE INDEX IF NOT EXISTS idx_contest_applications_user_id ON contest_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_contest_applications_status ON contest_applications(status);
CREATE INDEX IF NOT EXISTS idx_contest_applications_created_at ON contest_applications(created_at);

-- Disable RLS for development (you can enable it later with proper policies)
ALTER TABLE contests DISABLE ROW LEVEL SECURITY;
ALTER TABLE contest_applications DISABLE ROW LEVEL SECURITY;

-- Alternative: Enable RLS with permissive policies for development
-- ALTER TABLE contests ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE contest_applications ENABLE ROW LEVEL SECURITY;

-- Allow public access to contests table for development
-- CREATE POLICY "Allow public access to contests" ON contests FOR ALL USING (true);
-- CREATE POLICY "Allow public access to applications" ON contest_applications FOR ALL USING (true); 
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.email = 'admin@bvcodeverse.com' -- Replace with your admin email
    )
  );

-- RLS Policies for contest_applications table
-- Allow users to read their own applications
CREATE POLICY "Allow users to read own applications" ON contest_applications
  FOR SELECT USING (auth.uid() = user_id);

-- Allow users to insert their own applications
CREATE POLICY "Allow users to insert own applications" ON contest_applications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own applications
CREATE POLICY "Allow users to update own applications" ON contest_applications
  FOR UPDATE USING (auth.uid() = user_id);

-- Allow admin to read all applications
CREATE POLICY "Allow admin to read all applications" ON contest_applications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.email = 'admin@bvcodeverse.com' -- Replace with your admin email
    )
  );

-- Allow admin to update application status
CREATE POLICY "Allow admin to update application status" ON contest_applications
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.email = 'admin@bvcodeverse.com' -- Replace with your admin email
    )
  );

-- Create a function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_contests_updated_at 
  BEFORE UPDATE ON contests 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contest_applications_updated_at 
  BEFORE UPDATE ON contest_applications 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample contests (optional)
INSERT INTO contests (title, description, category, prize_pool, duration, max_team_size, deadline, status) VALUES
(
  'Web Development Championship',
  'Build a full-stack web application using modern technologies. Show your skills in React, Node.js, and database design.',
  'Web Development',
  '$3,000',
  '48 hours',
  4,
  '2025-09-15',
  'Open'
),
(
  'AI/ML Innovation Challenge',
  'Create an innovative AI or Machine Learning solution that solves a real-world problem. Use any ML framework of your choice.',
  'AI/Machine Learning',
  '$2,000',
  '72 hours',
  3,
  '2025-09-30',
  'Open'
);
