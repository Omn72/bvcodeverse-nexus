import React, { useEffect, useState } from 'react';
import { getAllContests, submitContestApplication, type Contest } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { RefreshCw } from 'lucide-react';

const ContestList: React.FC = () => {
  const { user } = useAuth();
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [applyingId, setApplyingId] = useState<string | null>(null);
  const [applied, setApplied] = useState<Record<string, boolean>>({});

  const load = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await getAllContests();
    if (error) setError(error.message || 'Failed to load contests');
    setContests(data || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
    const handler = () => load();
    window.addEventListener('contest:refresh', handler);
    return () => window.removeEventListener('contest:refresh', handler);
  }, []);

  const apply = async (contestId: string) => {
    if (!user) {
      setError('Please log in to apply');
      return;
    }
    try {
      setApplyingId(contestId);
      setError(null);
      const payload = {
        contest_id: contestId,
        user_id: user.id,
        applicant_name: user.email || 'User',
        applicant_email: user.email || 'unknown@local',
        project_name: 'TBD',
        project_description: 'TBD',
        tech_stack: 'TBD',
      } as any;
      const { error } = await submitContestApplication(payload);
      if (error) throw error;
      setApplied((prev) => ({ ...prev, [contestId]: true }));
    } catch (e: any) {
      setError(e?.message || 'Failed to apply');
    } finally {
      setApplyingId(null);
    }
  };

  if (loading) return <div className="text-gray-400">Loading contests…</div>;
  if (error) return <div className="text-red-400">{error}</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400">{contests.length} contest(s)</span>
        <button onClick={load} className="px-2.5 py-2 rounded border border-gray-700 hover:bg-gray-800 text-gray-200 text-sm inline-flex items-center gap-2">
          <RefreshCw className="w-4 h-4"/> Refresh
        </button>
      </div>
      {contests.map((c) => (
        <div key={c.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-semibold">{c.title}</h4>
              <p className="text-gray-400 text-sm">{c.description}</p>
            </div>
            <button
              disabled={applied[c.id] || applyingId === c.id}
              onClick={() => apply(c.id)}
              className="px-3 py-2 rounded bg-cyan-600 hover:bg-cyan-700 text-white disabled:opacity-50"
            >
              {applied[c.id] ? 'Applied' : applyingId === c.id ? 'Applying…' : 'Apply'}
            </button>
          </div>
        </div>
      ))}
      {contests.length === 0 && (
        <div className="text-gray-400">No contests yet.</div>
      )}
    </div>
  );
};

export default ContestList;
