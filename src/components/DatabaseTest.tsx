import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

const DatabaseTest = () => {
  const [status, setStatus] = useState('Testing...');
  const [user, setUser] = useState<any>(null);
  const [profiles, setProfiles] = useState<any[]>([]);

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Test 1: Check Supabase connection
        console.log('Testing Supabase connection...');
        const { data: testData, error: testError } = await supabase
          .from('user_profiles')
          .select('count')
          .limit(1);
        
        if (testError) {
          console.error('Database connection error:', testError);
          setStatus(`Database Error: ${testError.message}`);
          return;
        }

        // Test 2: Check auth user
        console.log('Checking auth user...');
        const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
        
        if (authError) {
          console.error('Auth error:', authError);
          setStatus(`Auth Error: ${authError.message}`);
          return;
        }

        setUser(authUser);

        // Test 3: Get some profiles
        console.log('Fetching profiles...');
        const { data: profileData, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .limit(5);
        
        if (profileError) {
          console.error('Profile fetch error:', profileError);
          setStatus(`Profile Error: ${profileError.message}`);
          return;
        }

        setProfiles(profileData || []);
        setStatus('All tests passed!');

      } catch (error: any) {
        console.error('Test error:', error);
        setStatus(`Test Error: ${error.message}`);
      }
    };

    testConnection();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 border border-gray-700 rounded-lg p-4 max-w-md z-50">
      <h3 className="text-white font-bold mb-2">Database Test</h3>
      <p className="text-sm text-gray-300 mb-2">Status: {status}</p>
      
      <div className="text-xs text-gray-400">
        <p>User: {user ? user.email : 'Not logged in'}</p>
        <p>Profiles found: {profiles.length}</p>
        
        {profiles.length > 0 && (
          <div className="mt-2">
            <p className="font-medium">Sample profiles:</p>
            {profiles.slice(0, 3).map((profile, i) => (
              <p key={i} className="truncate">
                {profile.full_name || 'No name'} - {profile.college || 'No college'}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DatabaseTest;
