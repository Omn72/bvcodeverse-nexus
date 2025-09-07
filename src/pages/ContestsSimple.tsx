import Layout from '@/components/Layout';
import { Calendar, Clock, MapPin, Trophy, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { createContest, testDatabaseConnection, warmupDatabase } from '@/lib/supabase';

type SampleContest = {
  title: string;
  desc: string;
  prize: string;
  duration: string;
  date: string;
  mode: string;
  category: string;
  status: 'Open' | 'Draft' | 'Closed';
  team: string;
  slug: string;
};

const sampleContests: SampleContest[] = [
  {
    title: 'Web Dev Sprint',
    desc: 'Build a modern, responsive web app using React and Tailwind in 48 hours.',
    prize: '$500 Prize Pool',
    duration: '48 hours',
    date: 'Sep 28, 2025',
    mode: 'Online',
    category: 'Web',
    status: 'Open',
  team: 'Up to 4 members',
  slug: 'web-dev-sprint',
  },
  {
    title: 'Algo Challenge',
    desc: 'Solve a set of algorithmic problems testing speed and accuracy.',
    prize: '$300 Prize Pool',
    duration: '3 hours',
    date: 'Oct 05, 2025',
    mode: 'On Campus',
    category: 'DSA',
    status: 'Draft',
  team: 'Solo',
  slug: 'algo-challenge',
  },
  {
    title: 'AI Mini Hack',
    desc: 'Prototype an AI-powered feature with any open-source model or API.',
    prize: '$700 Prize Pool',
    duration: '24 hours',
    date: 'Oct 20, 2025',
    mode: 'Hybrid',
    category: 'AI/ML',
    status: 'Closed',
  team: 'Up to 3 members',
  slug: 'ai-mini-hack',
  },
];

const ContestsSimple = () => {
  const [savingSlug, setSavingSlug] = useState<string | null>(null);
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [saveErrors, setSaveErrors] = useState<Record<string, string>>({});
  const [dbStatus, setDbStatus] = useState<string | null>(null);
  const [dbTesting, setDbTesting] = useState(false);

  const parseTeamSize = (team: string): number => {
    if (/solo/i.test(team)) return 1;
    const match = team.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 1;
  };

  const toDateString = (dateStr: string): string => {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return new Date().toISOString().slice(0, 10);
    return d.toISOString().slice(0, 10); // YYYY-MM-DD for DATE column
  };

  const mapSampleToDb = (c: SampleContest) => ({
    title: c.title,
    description: c.desc,
    category: c.category,
    prize_pool: c.prize,
    duration: c.duration,
    max_team_size: parseTeamSize(c.team),
  deadline: toDateString(c.date),
    status: c.status as 'Draft' | 'Open' | 'Closed',
  });

  const handleSave = async (c: SampleContest) => {
    try {
      setSavingSlug(c.slug);
      setSaveErrors((prev) => ({ ...prev, [c.slug]: '' }));
      const payload = mapSampleToDb(c);
      console.log('Saving contest payload:', payload);
      const { error } = await createContest(payload as any);
      if (error) {
        console.error('Save contest error:', error);
        setSaveErrors((prev) => ({ ...prev, [c.slug]: error.message || 'Failed to save contest' }));
      } else {
        setSaved((prev) => ({ ...prev, [c.slug]: true }));
      }
    } catch (err: any) {
      setSaveErrors((prev) => ({ ...prev, [c.slug]: err?.message || 'Unexpected error' }));
    } finally {
      setSavingSlug(null);
    }
  };

  const runDiagnostics = async () => {
    try {
      setDbTesting(true);
      setDbStatus('Testing connection...');
      const warm = await warmupDatabase();
      if (!warm.success) {
        setDbStatus(`Warmup failed: ${warm.error?.message || warm.error}`);
        return;
      }
      const test = await testDatabaseConnection();
      setDbStatus(test.success ? 'Database connection OK.' : `DB test failed: ${test.error}. ${test.suggestion || ''}`);
    } catch (e: any) {
      setDbStatus(e?.message || 'Diagnostics failed');
    } finally {
      setDbTesting(false);
    }
  };

  return (
    <Layout>
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Env missing warning */}
          {(!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) && (
            <div className="mb-6 p-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-300 text-sm">
              Supabase environment variables are missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable saving contests. See DATABASE_SETUP_REQUIRED.md.
            </div>
          )}

          {/* DB diagnostics */}
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <Button variant="secondary" onClick={runDiagnostics} disabled={dbTesting}>
              {dbTesting ? 'Running diagnostics…' : 'Run DB Diagnostics'}
            </Button>
            {dbStatus && <span className="text-sm text-muted-foreground">{dbStatus}</span>}
          </div>
          {/* Hero */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Trophy className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">Upcoming Contests</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Compete in <span className="gradient-text">Contests</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Fast-paced challenges to test your skills and win prizes. Apply solo or with a team.
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sampleContests.map((c, i) => {
              const statusStyles =
                c.status === 'Open'
                  ? 'bg-green-500/15 text-green-400 border border-green-500/30'
                  : c.status === 'Draft'
                  ? 'bg-yellow-500/15 text-yellow-300 border border-yellow-500/30'
                  : 'bg-red-500/15 text-red-400 border border-red-500/30';
              return (
                <div
                  key={i}
                  className="bg-card rounded-xl p-8 border border-border nav-glow transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                        {c.category}
                      </span>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles}`}>
                        {c.status}
                      </span>
                    </div>
                    <div className="text-right text-primary font-semibold">{c.prize}</div>
                  </div>

                  <h3 className="text-2xl font-bold mb-2">{c.title}</h3>
                  <p className="text-muted-foreground mb-6">{c.desc}</p>

                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-primary" />
                      {c.duration}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-primary" />
                      {c.date}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-primary" />
                      {c.team}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-primary" />
                      {c.mode}
                    </div>
                  </div>

                  <div className="flex justify-between items-center gap-3">
                    <div className="text-xs text-muted-foreground">
                      {saved[c.slug] ? (
                        <span className="text-green-500">Saved to database</span>
                      ) : saveErrors[c.slug] ? (
                        <span className="text-red-400">{saveErrors[c.slug]}</span>
                      ) : null}
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant="secondary"
                        disabled={savingSlug === c.slug || saved[c.slug]}
                        onClick={() => handleSave(c)}
                      >
                        {savingSlug === c.slug ? 'Saving…' : saved[c.slug] ? 'Saved' : 'Save to DB'}
                      </Button>
                    {c.status === 'Open' ? (
                      <Link to={`/apply-contest?contest=${encodeURIComponent(c.slug)}`} aria-label={`Apply for ${c.title}`}>
                        <Button className="btn-neon">Apply Now</Button>
                      </Link>
                    ) : c.status === 'Draft' ? (
                      <Button disabled variant="secondary">Coming Soon</Button>
                    ) : (
                      <Button disabled variant="secondary">Closed</Button>
                    )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </Layout>
  );
};

export default ContestsSimple;
