import { useState } from 'react';
import { createContest, testDatabaseConnection, getAllContests, deleteContest, getAllApplications, type Contest, type ContestApplication } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';

const DatabaseDebug = () => {
  const [result, setResult] = useState<string>('');

  const testConnection = async () => {
    setResult('Testing connection...');
    const result = await testDatabaseConnection();
    setResult(JSON.stringify(result, null, 2));
  };

  const testCreateContest = async () => {
    setResult('Testing contest creation...');
    
    const testContest: Omit<Contest, 'id' | 'created_at' | 'updated_at'> = {
      title: 'Test Contest',
      description: 'This is a test contest',
      category: 'Web Development',
      prize_pool: '$100',
      duration: '48 hours',
      max_team_size: 4,
      deadline: '2025-09-18',
      status: 'Draft',
      created_by: 'TestAdmin'
    };

    console.log('Test contest data:', testContest);
    
    const { data, error } = await createContest(testContest);
    
    if (error) {
      setResult(`Error: ${JSON.stringify(error, null, 2)}`);
    } else {
      setResult(`Success: ${JSON.stringify(data, null, 2)}`);
    }
  };

  const testDeleteContest = async () => {
    setResult('Getting contests to delete...');
    
    // First get all contests
    const { data: contests, error: getError } = await getAllContests();
    
    if (getError) {
      setResult(`Error getting contests: ${JSON.stringify(getError, null, 2)}`);
      return;
    }
    
    if (!contests || contests.length === 0) {
      setResult('No contests found to delete. Create a test contest first.');
      return;
    }
    
    // Find a test contest to delete
    const testContest = contests.find(c => c.title.includes('Test Contest'));
    
    if (!testContest) {
      setResult(`Found ${contests.length} contests, but no test contests to delete safely. Available contests:\n${contests.map(c => `- ${c.title} (${c.id})`).join('\n')}`);
      return;
    }
    
    setResult(`Deleting contest: ${testContest.title} (${testContest.id})`);
    
    const { data, error } = await deleteContest(testContest.id);
    
    if (error) {
      setResult(`Delete Error: ${JSON.stringify(error, null, 2)}`);
    } else {
      setResult(`Delete Success: Contest "${testContest.title}" deleted successfully!\nResult: ${JSON.stringify(data, null, 2)}`);
    }
  };

  const testGetApplications = async () => {
    setResult('Getting all applications...');
    
    try {
      // First try the getAllApplications function
      const { data: applications, error } = await getAllApplications();
      
      if (error) {
        setResult(`Error getting applications: ${JSON.stringify(error, null, 2)}`);
        return;
      }

      // Also try direct query to see raw data
      const { supabase } = await import('@/lib/supabase');
      const { data: rawApplications, error: rawError } = await supabase
        .from('contest_applications')
        .select('*');

      setResult(`
=== getAllApplications() Result ===
Applications found: ${applications?.length || 0}
Data: ${JSON.stringify(applications, null, 2)}

=== Direct Query Result ===
Raw applications found: ${rawApplications?.length || 0}
Error: ${rawError ? JSON.stringify(rawError, null, 2) : 'None'}
Data: ${JSON.stringify(rawApplications, null, 2)}
      `);
    } catch (err) {
      setResult(`Unexpected error: ${err}`);
    }
  };

  const testCreateApplication = async () => {
    setResult('Creating test application...');
    
    // First get a contest to apply to
    const { data: contests, error: contestsError } = await getAllContests();
    
    if (contestsError || !contests || contests.length === 0) {
      setResult('Error: No contests found to apply to. Create a contest first.');
      return;
    }
    
    const testApp = {
      contest_id: contests[0].id,
      user_id: 'test-user-123',
      applicant_name: 'Test User',
      applicant_email: 'test@example.com',
      project_name: 'Test Project',
      project_description: 'This is a test project for debugging',
      tech_stack: 'React, TypeScript, Supabase',
      github_link: 'https://github.com/test/test-project',
      demo_link: 'https://test-project.vercel.app',
      team_members: 'Test User, Another Member'
    };
    
    // Import submitContestApplication
    const { supabase } = await import('@/lib/supabase');
    
    const { data, error } = await supabase
      .from('contest_applications')
      .insert([testApp])
      .select();
    
    if (error) {
      setResult(`Error creating test application: ${JSON.stringify(error, null, 2)}`);
    } else {
      setResult(`Test application created successfully!\n\n${JSON.stringify(data, null, 2)}`);
    }
  };

  return (
    <Layout>
      <div className="p-6 bg-gray-900 text-white min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Database Debug</h1>
        
        <div className="space-x-4 mb-6">
          <Button onClick={testConnection}>Test Connection</Button>
          <Button onClick={testCreateContest}>Test Create Contest</Button>
          <Button onClick={testDeleteContest} variant="destructive">Test Delete Contest</Button>
          <Button onClick={testGetApplications}>Test Get Applications</Button>
          <Button onClick={testCreateApplication} className="bg-green-600 hover:bg-green-700">Create Test Application</Button>
        </div>
        
        <div className="bg-gray-800 p-4 rounded">
        <h3 className="font-bold mb-2">Result:</h3>
        <pre className="whitespace-pre-wrap text-sm">{result}</pre>
      </div>
      
      <div className="mt-6 bg-gray-800 p-4 rounded">
        <h3 className="font-bold mb-2">Instructions:</h3>
        <p className="text-sm">
          If you see "relation 'contests' does not exist" error, you need to:
          <br />1. Go to your Supabase dashboard
          <br />2. Open SQL Editor  
          <br />3. Copy and paste the contents of database-setup.sql
          <br />4. Click Run
        </p>
      </div>
    </div>
    </Layout>
  );
};

export default DatabaseDebug;
