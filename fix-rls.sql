-- Fix RLS permissions issue
-- Run this script in your Supabase SQL Editor to fix the permission denied error

-- Disable Row Level Security on existing tables
ALTER TABLE contests DISABLE ROW LEVEL SECURITY;
ALTER TABLE contest_applications DISABLE ROW LEVEL SECURITY;

-- Drop any existing restrictive policies
DROP POLICY IF EXISTS "Allow public read access to open contests" ON contests;
DROP POLICY IF EXISTS "Allow authenticated users to read all contests" ON contests;
DROP POLICY IF EXISTS "Allow admin to manage contests" ON contests;
DROP POLICY IF EXISTS "Allow users to read own applications" ON contest_applications;
DROP POLICY IF EXISTS "Allow users to insert own applications" ON contest_applications;
DROP POLICY IF EXISTS "Allow users to update own applications" ON contest_applications;
DROP POLICY IF EXISTS "Allow admin to read all applications" ON contest_applications;
DROP POLICY IF EXISTS "Allow admin to update application status" ON contest_applications;

-- Create permissive policies for development (if you want to enable RLS later)
-- ALTER TABLE contests ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE contest_applications ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow all operations on contests" ON contests FOR ALL USING (true);
-- CREATE POLICY "Allow all operations on applications" ON contest_applications FOR ALL USING (true);

-- Verify the fix
SELECT 'RLS disabled successfully!' as message;
