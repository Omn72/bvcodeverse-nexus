import React, { useState, useEffect } from 'react';
import { getAllContests, createContest, type Contest } from '@/lib/supabase';
import { Button } from '@/components/ui/button';

const DatabaseTest = () => {
  const [status, setStatus] = useState<'testing' | 'connected' | 'error'>('testing');
  const [message, setMessage] = useState('');
  const [contests, setContests] = useState<Contest[]>([]);

  useEffect(() => {
    testDatabase();
  }, []);

  const testDatabase = async () => {
    try {
      setStatus('testing');
      setMessage('Testing database connection...');

      // Test fetching contests
      const { data, error } = await getAllContests();
      
      if (error) {
        setStatus('error');
        if (error.message?.includes('relation "contests" does not exist')) {
          setMessage('❌ Database tables not found! Please run database-setup.sql in your Supabase SQL editor first.');
        } else {
          setMessage(`❌ Database error: ${error.message}`);
        }
        return;
      }

      setStatus('connected');
      setMessage(`✅ Database connected successfully! Found ${data?.length || 0} contests.`);
      setContests(data || []);

    } catch (err: any) {
      setStatus('error');
      setMessage(`❌ Connection failed: ${err.message}`);
    }
  };

  const testCreateContest = async () => {
    try {
      const testContest = {
        title: `Test Contest ${Date.now()}`,
        description: 'This is a test contest created by the database test component.',
        category: 'Web Development',
        prize_pool: '1000',
        duration: '48 hours',
        max_team_size: 4,
        deadline: '2025-12-31',
        status: 'Draft' as const,
        created_by: 'test-user'
      };

      const { data, error } = await createContest(testContest);
      
      if (error) {
        alert(`Error creating test contest: ${error.message}`);
        return;
      }

      alert('✅ Test contest created successfully!');
      testDatabase(); // Refresh the list
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Database Connection Test
        </h1>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Connection Status</h2>
          <div className="mb-4">
            <div className={`inline-block px-3 py-1 rounded text-sm font-medium ${
              status === 'testing' ? 'bg-yellow-500 text-black' :
              status === 'connected' ? 'bg-green-500 text-white' :
              'bg-red-500 text-white'
            }`}>
              {status.toUpperCase()}
            </div>
          </div>
          <p className="text-gray-300 mb-4">{message}</p>
          
          <div className="flex gap-4">
            <Button onClick={testDatabase} variant="outline">
              Test Connection Again
            </Button>
            {status === 'connected' && (
              <Button onClick={testCreateContest} className="bg-cyan-500 hover:bg-cyan-600">
                Test Create Contest
              </Button>
            )}
          </div>
        </div>

        {status === 'error' && (
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-red-400 mb-4">Setup Required</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-300">
              <li>Go to your Supabase dashboard</li>
              <li>Open SQL Editor</li>
              <li>Copy and paste the contents of <code>database-setup.sql</code></li>
              <li>Click Run to execute the SQL</li>
              <li>Refresh this page to test again</li>
            </ol>
          </div>
        )}

        {contests.length > 0 && (
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Existing Contests</h3>
            <div className="space-y-4">
              {contests.map((contest) => (
                <div key={contest.id} className="border border-gray-700 rounded p-4">
                  <h4 className="font-bold">{contest.title}</h4>
                  <p className="text-gray-400 text-sm">{contest.description}</p>
                  <div className="flex gap-4 mt-2 text-sm">
                    <span>Prize: ${contest.prize_pool}</span>
                    <span>Status: {contest.status}</span>
                    <span>Team Size: {contest.max_team_size}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DatabaseTest;
