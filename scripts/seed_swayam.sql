-- SQL seed for user 'swayampolakhare123'
-- Run in Supabase SQL editor or psql connected to your database

-- Replace the UUIDs below if you want to use your own IDs

INSERT INTO user_profiles (id, user_id, username, full_name, email, college, year, branch, skills, bio, created_at, updated_at)
VALUES (
  '00000000-0000-4000-8000-000000000001',
  '00000000-0000-4000-8000-000000000001',
  'swayampolakhare123',
  'Swayam Polakhare',
  'swayam+test@example.com',
  'Bharati Vidyapeeth College of Engineering',
  '3rd Year',
  'Computer Science Engineering',
  ARRAY['React','TypeScript','Node'],
  'Test profile for Swayam. Created for public profile testing.',
  now(),
  now()
)
ON CONFLICT (user_id) DO UPDATE
SET username = EXCLUDED.username,
    full_name = EXCLUDED.full_name,
    email = EXCLUDED.email,
    college = EXCLUDED.college,
    year = EXCLUDED.year,
    branch = EXCLUDED.branch,
    skills = EXCLUDED.skills,
    bio = EXCLUDED.bio,
    updated_at = now();

-- Insert matching stats (optional)
INSERT INTO user_stats (id, user_id, total_points, rank, level, projects_completed, contests_won, badges_earned, streak_days, next_level_points, created_at, updated_at)
VALUES (
  '10000000-0000-4000-8000-000000000001',
  '00000000-0000-4000-8000-000000000001',
  250, 45, 'Intermediate', 3, 1, 2, 5, 500, now(), now()
)
ON CONFLICT (user_id) DO UPDATE
SET total_points = EXCLUDED.total_points,
    rank = EXCLUDED.rank,
    level = EXCLUDED.level,
    projects_completed = EXCLUDED.projects_completed,
    contests_won = EXCLUDED.contests_won,
    badges_earned = EXCLUDED.badges_earned,
    streak_days = EXCLUDED.streak_days,
    next_level_points = EXCLUDED.next_level_points,
    updated_at = now();
