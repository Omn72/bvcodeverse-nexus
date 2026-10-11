import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, createContest } from '@/lib/supabase';

const ADMIN_EMAILS = [
  'admin@bvcodeverse.com',
  'omnarkhede@gmail.com',
];

const dateToYYYYMMDD = (value: string) => {
  const d = new Date(value);
  if (isNaN(d.getTime())) return '';
  return d.toISOString().slice(0, 10);
};

const ContestForm: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = !!user?.email && ADMIN_EMAILS.includes(user.email);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [category, setCategory] = useState('General');
  const [prizePool, setPrizePool] = useState('N/A');
  const [duration, setDuration] = useState('48 hours');
  const [maxTeamSize, setMaxTeamSize] = useState(4);
  const [status, setStatus] = useState<'Draft' | 'Open' | 'Closed'>('Open');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!isAdmin) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const payload = {
        title,
        description,
        category,
        prize_pool: prizePool,
        duration: duration || (startDate && endDate ? `${dateToYYYYMMDD(startDate)} → ${dateToYYYYMMDD(endDate)}` : 'TBD'),
        max_team_size: Number(maxTeamSize) || 1,
        deadline: endDate ? dateToYYYYMMDD(endDate) : dateToYYYYMMDD(new Date().toISOString()),
        status,
        created_by: user?.id || 'Admin',
      } as any;

      const { error } = await createContest(payload);
      if (error) throw error;
      setSuccess('Contest created');
      setTitle('');
      setDescription('');
      setStartDate('');
      setEndDate('');
      setCategory('General');
      setPrizePool('N/A');
      setDuration('48 hours');
      setMaxTeamSize(4);
      setStatus('Open');

      // Notify other components to refresh
      try { window.dispatchEvent(new CustomEvent('contest:refresh')); } catch {}
    } catch (err: any) {
      setError(err?.message || 'Failed to create contest');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
      <h3 className="text-xl font-semibold text-white">Create Contest</h3>
      <div>
        <label className="block text-sm text-gray-400 mb-1">Title</label>
        <input
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Contest title"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-400 mb-1">Description</label>
        <textarea
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={3}
          placeholder="Write a short description"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Category</label>
          <select
            className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>General</option>
            <option>Web Development</option>
            <option>AI/Machine Learning</option>
            <option>Mobile</option>
            <option>Blockchain</option>
            <option>Game Dev</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Prize Pool</label>
          <input
            className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={prizePool}
            onChange={(e) => setPrizePool(e.target.value)}
            placeholder="$500"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Duration</label>
          <input
            className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="e.g. 48 hours"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Max Team Size</label>
          <input
            type="number"
            min={1}
            className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={maxTeamSize}
            onChange={(e) => setMaxTeamSize(parseInt(e.target.value || '1', 10))}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Start Date</label>
          <input
            type="date"
            className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">End Date</label>
          <input
            type="date"
            className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm text-gray-400 mb-1">Status</label>
        <select
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          value={status}
          onChange={(e) => setStatus(e.target.value as any)}
        >
          <option value="Open">Open</option>
          <option value="Draft">Draft</option>
          <option value="Closed">Closed</option>
        </select>
      </div>
      {error && <div className="text-sm text-red-400">{error}</div>}
      {success && <div className="text-sm text-green-500">{success}</div>}
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 rounded bg-cyan-600 hover:bg-cyan-700 text-white disabled:opacity-50"
      >
        {loading ? 'Creating…' : 'Create Contest'}
      </button>
    </form>
  );
};

export default ContestForm;
