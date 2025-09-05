# Database Setup Instructions

## ⚠️ IMPORTANT: You need to run this first before the application will work!

The contest management system requires database tables to be created in your Supabase project.

## Steps to Set Up the Database:

### 1. Go to Your Supabase Dashboard
- Visit https://supabase.com/dashboard
- Login to your account
- Select your project: `ghtrbnqzsphmqkormffw`

### 2. Open SQL Editor
- In your Supabase dashboard, click on "SQL Editor" in the left sidebar
- Click "New query"

### 3. Copy and Paste the SQL
- Copy the entire contents of `database-setup.sql` file
- Paste it into the SQL editor
- Click "Run" to execute the SQL

### 4. Verify Tables Were Created
- Go to "Table Editor" in the sidebar
- You should see two new tables:
  - `contests`
  - `contest_applications`

## What This Creates:
- **contests table**: Stores contest information (title, description, prize pool, etc.)
- **contest_applications table**: Stores user applications to contests
- **RLS policies**: Security rules to protect data
- **Sample data**: A few example contests to test with

## After Running the SQL:
1. Refresh your application at http://localhost:8082
2. Go to `/admin/login` and login with:
   - Username: `AdminOm`
   - Password: `BVCodeVerse@strong`
3. Try creating a new contest
4. Check the `/contests` page to see active contests

## Troubleshooting:
- If you get "relation does not exist" errors, the SQL hasn't been run yet
- If you get permission errors, check your RLS policies
- Check the browser console for detailed error messages

## Current Status:
❌ **Database tables NOT created yet** - Please run the SQL setup first!

Once you've completed these steps, the "add content" functionality will work properly.
