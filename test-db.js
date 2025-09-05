// Simple test to check database connection
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ghtrbnqzsphmqkormffw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdodHJibnF6c3BobXFrb3JtZmZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwNjUyOTUsImV4cCI6MjA3MjY0MTI5NX0.V_Il6kJ_zpyw_ZcE5mJQCoer1Gv0ypr8FDvRm7Q-2CU';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testDatabase() {
  console.log('Testing database connection...');
  
  try {
    // Test basic connection
    const { data, error } = await supabase.from('contests').select('count');
    if (error) {
      console.error('Database connection error:', error);
      console.log('This usually means the tables do not exist yet.');
      console.log('Please run the database-setup.sql in your Supabase dashboard SQL editor.');
      return;
    }
    
    console.log('✅ Database connection successful!');
    console.log('Number of contests:', data?.length || 0);
    
    // Test getting contests
    const { data: contests, error: contestsError } = await supabase
      .from('contests')
      .select('*');
      
    if (contestsError) {
      console.error('Error fetching contests:', contestsError);
    } else {
      console.log('✅ Contests fetched successfully:', contests?.length || 0);
    }
    
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

testDatabase();
