# Database Setup Instructions for BVCodeVerse

## 📋 Quick Setup

1. **Go to your Supabase project dashboard**
2. **Navigate to SQL Editor**
3. **Copy and paste the SQL from `database/setup.sql`**
4. **Run the SQL script**

## 🎯 What the SQL script creates:

### Tables:
- **`user_profiles`** - Stores user profile information (name, bio, skills, etc.)
- **`user_stats`** - Stores user statistics (points, rank, badges, etc.)

### Features:
- **Row Level Security (RLS)** - Users can only see/edit their own data
- **Automatic Profile Creation** - When users sign up, profiles are created automatically
- **Rank System** - Function to update user ranks based on points
- **Indexes** - For better performance

## 🔧 Manual Verification

After running the script, verify the tables exist:

```sql
-- Check if tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('user_profiles', 'user_stats');
```

## 🚀 Test the Profile System

1. Sign up a new user
2. Go to the Profile page
3. Edit and save profile information
4. Check the database tables to see the data

## 🎨 Sample Data (Optional)

You can add some sample stats for testing:

```sql
-- Add sample stats for existing users (replace with actual user IDs)
INSERT INTO user_stats (user_id, total_points, level, projects_completed) 
VALUES 
  ('your-user-id-here', 1500, 'Advanced Coder', 8);
```

## ⚠️ Important Notes

- The script includes automatic profile creation for new users
- Ranks are calculated dynamically based on points
- All data is secured with Row Level Security (RLS)
- Users get 50 welcome bonus points when they sign up
