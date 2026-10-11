import React, { useEffect, useMemo, useState } from 'react';
import Layout from '@/components/Layout';
import { getAllContests, type Contest, createContest, testDatabaseConnection, getSupabaseInfo, getSupabaseRestParams } from '@/lib/supabase';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Trophy, Calendar, Clock, Users, RefreshCw, Filter, Search } from 'lucide-react';

const ContestListDB: React.FC = () => {
  const [contests, setContests] = useState<Contest[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [info] = useState(() => getSupabaseInfo());
  const [testing, setTesting] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [restProbe, setRestProbe] = useState<string | null>(null);
  const location = useLocation();
  const showDebug = import.meta.env.DEV || new URLSearchParams(location.search).has('debug');
  // UI state
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Open' | 'Closed' | 'Draft'>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'deadline'>('newest');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await getAllContests();
      if (error) {
        setError(error.message || 'Failed to load contests');
      }
      setContests(data || []);
      setLoading(false);
    };
    load();
  }, []);

  const refresh = async () => {
    setLoading(true);
    const { data, error } = await getAllContests();
    if (error) setError(error.message || 'Failed to load contests');
    setContests(data || []);
    setLoading(false);
  };

  const runTest = async () => {
    try {
      setTesting(true);
      const result = await testDatabaseConnection();
      if (result.success) setTestResult('Database connection OK');
      else setTestResult(result.error || 'Database test failed');
    } finally {
      setTesting(false);
    }
  };

  const probeRest = async () => {
    try {
      const { url, anonKey } = getSupabaseRestParams();
      const controller = new AbortController();
      const to = setTimeout(() => controller.abort(), 6000);
      const resp = await fetch(`${url}/rest/v1/contests?select=id&limit=1`, {
        headers: {
          apikey: anonKey,
          Authorization: `Bearer ${anonKey}`,
        },
        signal: controller.signal,
      });
      clearTimeout(to);
      if (!resp.ok) {
        setRestProbe(`REST error ${resp.status}`);
        return;
      }
      setRestProbe('REST OK');
    } catch (e: any) {
      if (e?.name === 'AbortError') setRestProbe('REST timeout');
      else setRestProbe(`REST failed: ${e?.message || 'unknown'}`);
    }
  };

  const seedSample = async () => {
    try {
      setSeeding(true);
      const samples: Omit<Contest, 'id' | 'created_at' | 'updated_at'>[] = [
        {
          title: 'Sample Web Dev Contest',
          description: 'Build a modern web app using React and Tailwind.',
          category: 'Web Development',
          prize_pool: '$500',
          duration: '48 hours',
          max_team_size: 4,
          deadline: '2025-09-30',
          status: 'Open',
          created_by: 'SeedScript',
        },
        {
          title: 'AI Mini Challenge',
          description: 'Train a small model and showcase results.',
          category: 'AI/Machine Learning',
          prize_pool: '$300',
          duration: '36 hours',
          max_team_size: 3,
          deadline: '2025-10-10',
          status: 'Open',
          created_by: 'SeedScript',
        },
      ];
      for (const s of samples) {
        await createContest(s);
      }
      const { data } = await getAllContests();
      setContests(data || []);
    } finally {
      setSeeding(false);
    }
  };

  const categories = useMemo(() => {
    const set = new Set<string>();
    (contests || []).forEach(c => { if (c.category) set.add(c.category); });
    return ['All', ...Array.from(set).sort()];
  }, [contests]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    let list = (contests || []).filter(c => {
      const matchesStatus = statusFilter === 'All' ? true : c.status === statusFilter;
      const matchesCategory = categoryFilter === 'All' ? true : c.category === categoryFilter;
      const matchesSearch = !term ||
        c.title.toLowerCase().includes(term) ||
        (c.description || '').toLowerCase().includes(term) ||
        (c.category || '').toLowerCase().includes(term);
      return matchesStatus && matchesCategory && matchesSearch;
    });
    list = list.slice().sort((a, b) => {
      if (sortBy === 'deadline') {
        const da = new Date(a.deadline).getTime();
        const db = new Date(b.deadline).getTime();
        return da - db; // soonest first
      }
      // newest by created_at fallback
      const ca = new Date(a.updated_at || a.created_at || 0).getTime();
      const cb = new Date(b.updated_at || b.created_at || 0).getTime();
      return cb - ca;
    });
    return list;
  }, [contests, search, statusFilter, categoryFilter, sortBy]);

  const openCount = useMemo(() => (contests || []).filter(c => c.status === 'Open').length, [contests]);
  const closingSoon = useMemo(() => {
    const now = Date.now();
    const seven = 7 * 24 * 60 * 60 * 1000;
    return (contests || []).filter(c => {
      const d = new Date(c.deadline).getTime();
      return d - now <= seven && d - now >= 0 && c.status === 'Open';
    }).length;
  }, [contests]);

  const isClosed = (c: Contest) => new Date(c.deadline).getTime() < Date.now() || c.status !== 'Open';
  const statusColor = (s: Contest['status']) =>
    s === 'Open' ? 'bg-emerald-500/15 text-emerald-300 border-emerald-400/20' :
    s === 'Closed' ? 'bg-red-500/15 text-red-300 border-red-400/20' :
    'bg-zinc-500/15 text-zinc-300 border-zinc-400/20';

  return (
    <Layout>
      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-8">Contests</h1>

          {(!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) && (
            <div className="mb-6 p-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-300 text-sm">
              Supabase environment variables are missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.
            </div>
          )}

          {showDebug && (
            <>
              <div className="mb-4 text-xs text-muted-foreground">
                Connected to: <span className="font-mono">{info.url.replace(/^https?:\/\//, '')}</span>
                {info.isFallback && (
                  <span className="ml-2 px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-400 border border-yellow-400/30">fallback</span>
                )}
              </div>

              <div className="flex items-center gap-3 mb-6">
                <button onClick={runTest} disabled={testing} className="px-3 py-1.5 text-sm rounded border border-border hover:bg-accent/30">
                  {testing ? 'Testing…' : 'Test DB connection'}
                </button>
                <button onClick={seedSample} disabled={seeding} className="px-3 py-1.5 text-sm rounded border border-border hover:bg-accent/30">
                  {seeding ? 'Seeding…' : 'Seed sample contests'}
                </button>
                <button onClick={probeRest} className="px-3 py-1.5 text-sm rounded border border-border hover:bg-accent/30">
                  Probe REST
                </button>
                {testResult && <span className="text-xs text-muted-foreground">{testResult}</span>}
                {restProbe && <span className="text-xs text-muted-foreground"> · {restProbe}</span>}
              </div>
            </>
          )}

          {loading && (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-border p-6 animate-pulse bg-card/40">
                  <div className="h-6 w-1/3 bg-muted rounded mb-4" />
                  <div className="h-4 w-full bg-muted rounded mb-2" />
                  <div className="h-4 w-2/3 bg-muted rounded" />
                </div>
              ))}
            </div>
          )}
          {error && <div className="text-red-400">{error}</div>}

          {!loading && !error && (
            <>
              {/* Controls */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded border border-border"><Trophy className="w-4 h-4"/> Open: {openCount}</span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded border border-border"><Calendar className="w-4 h-4"/> Closing soon: {closingSoon}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-2 top-2.5 text-muted-foreground"/>
                    <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search contests" className="pl-8 pr-3 py-2 rounded border border-border bg-background/60"/>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground hidden md:inline-flex"><Filter className="w-4 h-4 mr-1"/>Filters</span>
                    <select value={statusFilter} onChange={(e)=>setStatusFilter(e.target.value as any)} className="px-2 py-2 rounded border border-border bg-background/60 text-sm">
                      <option>All</option>
                      <option>Open</option>
                      <option>Closed</option>
                      <option>Draft</option>
                    </select>
                    <select value={categoryFilter} onChange={(e)=>setCategoryFilter(e.target.value)} className="px-2 py-2 rounded border border-border bg-background/60 text-sm">
                      {categories.map(c => (<option key={c}>{c}</option>))}
                    </select>
                    <select value={sortBy} onChange={(e)=>setSortBy(e.target.value as any)} className="px-2 py-2 rounded border border-border bg-background/60 text-sm">
                      <option value="newest">Newest</option>
                      <option value="deadline">Ending soon</option>
                    </select>
                    <button onClick={refresh} className="px-2.5 py-2 rounded border border-border hover:bg-accent/30" title="Refresh">
                      <RefreshCw className="w-4 h-4"/>
                    </button>
                  </div>
                </div>
              </div>

              {/* List */}
              <div className="space-y-4">
                {filtered.map((c) => (
                  <div key={c.id} className="group relative rounded-xl border border-border p-6 bg-card hover:shadow-lg hover:shadow-black/20 transition-all">
                    <div className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-cyan-500/10 to-purple-500/10 pointer-events-none"/>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="text-2xl font-semibold leading-tight">{c.title}</h3>
                        <p className="text-muted-foreground mt-1">{c.description}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded border ${statusColor(c.status)}`}>{c.status}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-4">
                      <span className="inline-flex items-center gap-2"><Trophy className="w-4 h-4 text-yellow-400"/> {c.prize_pool}</span>
                      <span className="inline-flex items-center gap-2"><Clock className="w-4 h-4"/> {c.duration}</span>
                      <span className="inline-flex items-center gap-2"><Users className="w-4 h-4"/> up to {c.max_team_size}</span>
                      <span className="inline-flex items-center gap-2"><Calendar className="w-4 h-4"/> {new Date(c.deadline).toLocaleDateString()}</span>
                      <span className="inline-flex items-center gap-2 px-2 py-0.5 rounded border border-border text-xs">{c.category}</span>
                    </div>
                    <div className="mt-5 flex items-center justify-end">
                      {isClosed(c) ? (
                        <button disabled className="px-4 py-2 rounded-lg border border-border text-muted-foreground opacity-60 cursor-not-allowed">Closed</button>
                      ) : (
                        <Link to={`/apply-contest?contestId=${c.id}`} className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium hover:opacity-95">
                          Apply now
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
                {filtered.length === 0 && (
                  <div className="text-muted-foreground">No contests match your filters.</div>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default ContestListDB;
