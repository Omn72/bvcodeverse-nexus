import { getAllContests } from './src/lib/supabase.js';

console.log('Testing Supabase connection...');

getAllContests().then(({ data, error }) => {
  if (error) {
    console.error('❌ Database Error:', error.message);
    
    if (error.message.includes('relation "contests" does not exist')) {
      console.log('\n🚨 SETUP REQUIRED:');
      console.log('1. Go to https://supabase.com/dashboard');
      console.log('2. Select your project');
      console.log('3. Open SQL Editor');
      console.log('4. Copy the contents of database-setup.sql');
      console.log('5. Paste and click Run');
      console.log('6. Try again\n');
    }
  } else {
    console.log(`✅ Database Connected! Found ${data?.length || 0} contests.`);
    if (data && data.length > 0) {
      console.log('Contests:', data.map(c => ({ title: c.title, status: c.status })));
    }
  }
}).catch(err => {
  console.error('❌ Connection Failed:', err.message);
});
