import { Squares } from '@/components/ui/squares-background';
import { useState, useEffect, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchUsers, getRecentUsers } from '@/lib/supabase';
import { Loader2, User, Search } from 'lucide-react';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [suggestedUsers, setSuggestedUsers] = useState<any[]>([]);
  const [isDesktop, setIsDesktop] = useState(false);
  const navigate = useNavigate();

  // Lazy-load the heavy Spline only when rendering on desktop (lg+)
  const LazySplineScene = lazy(() => import('@/components/ui/splite').then(m => ({ default: m.SplineScene })));

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults(suggestedUsers); // Show suggested users when query is empty
      setShowResults(true);
      return;
    }

    setIsSearching(true);
    
    try {
      // Search for users using the dedicated search function
      console.log('Searching for users with query:', query);
      const { data: users, error } = await searchUsers(query, 8);
      
      if (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } else {
        console.log('Search results:', users);
        setSearchResults(users || []);
      }
      
      setShowResults(true);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // Load suggested users when component mounts
  const loadSuggestedUsers = async () => {
    try {
      const { data: users, error } = await getRecentUsers(6);
      if (!error && users) {
        setSuggestedUsers(users);
      }
    } catch (error) {
      console.error('Error loading suggested users:', error);
    }
  };

  useEffect(() => {
    loadSuggestedUsers();
  }, []);

  // Track viewport to render 3D only on desktop
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = (e: MediaQueryListEvent | MediaQueryList) => setIsDesktop(('matches' in e ? e.matches : (e as MediaQueryList).matches));
    onChange(mq);
    mq.addEventListener?.('change', onChange as EventListener);
    return () => mq.removeEventListener?.('change', onChange as EventListener);
  }, []);

  const handleUserClick = (userIdOrObj: any) => {
    // If passed a profile object, prefer user_id/id; otherwise use the string id
    const id = typeof userIdOrObj === 'object' ? (userIdOrObj.user_id || userIdOrObj.id) : userIdOrObj
    // Navigate to internal ID-based profile route
    navigate(`/user/id/${id}`);
    setShowResults(false);
    setSearchQuery('');
  };

  return (
    <section className="relative py-12 overflow-hidden bg-black sm:pb-16 lg:pb-20 xl:pb-24">
      {/* Background: same animated squares + gradient blobs as CTA */}
  <div className="absolute inset-0 lg:hidden">
        <Squares
          direction="diagonal"
          speed={0.5}
          squareSize={50}
          borderColor="#333333"
          hoverFillColor="#1a1a1a"
          className="opacity-70"
        />
      </div>
  <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse lg:hidden" />
  <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000 lg:hidden" />

  <div className="px-4 mx-auto relative z-10 sm:px-6 lg:px-8 max-w-7xl pt-safe pb-safe">
        <div className="grid items-center grid-cols-1 gap-y-12 lg:grid-cols-2 gap-x-16">
          <div>
            <h1 className="text-4xl font-normal text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              Innovate. Collaborate. Elevate.
            </h1>
            <p className="mt-4 text-lg font-normal text-gray-400 sm:mt-8">
            Welcome to BVCodeVerse, BVCOEL's official coding club.
            </p>

            <div className="mt-8 sm:mt-12">
              <a
                href="https://bvcodeverse.substack.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full p-[2px] bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 hover:opacity-95"
              >
                <span className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-black uppercase bg-white rounded-full tracking-wider">
                  Subscribe to Newsletter
                </span>
              </a>
            </div>
          </div>

          {/* Hide robot on mobile; show only on lg+ */}
          <div className="relative hidden lg:flex items-center justify-center w-full h-full -mt-16">
            {/* Gradient glow around robot - reduced size */}
            <div className="absolute z-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full bg-gradient-to-br from-cyan-400/30 via-purple-500/20 to-transparent blur-md pointer-events-none"></div>
            {/* Spline Robot 3D React Component - reduced size */}
            <Suspense fallback={null}>
              {isDesktop && (
                <LazySplineScene 
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-[110vh] z-10 scale-125 translate-y-5 lg:translate-y-10"
                />
              )}
            </Suspense>
    {/* Bottom overlay to blend legs into background (below ribbon) */}
    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none"></div>
          </div>
        </div>
        
  </div>

  {/* Full-width Moving Ribbon - overlay robot legs on desktop */}
  <div className="relative lg:absolute left-0 right-0 lg:bottom-0 w-full overflow-hidden mt-8 lg:mt-0 z-30">
        <div className="bg-black py-3 relative min-h-[44px] flex items-center">
          {/* Robot-style gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-purple-500/15 to-transparent blur-sm"></div>
          <div className="relative whitespace-nowrap overflow-x-hidden flex">
            <div className="animate-marquee flex-shrink-0 flex items-center">
              <span className="text-white font-semibold text-base tracking-wider leading-6">
                PEOPLE • PASSION • PROFESSIONALISM • PEOPLE • PASSION • PROFESSIONALISM • PEOPLE • PASSION • PROFESSIONALISM • PEOPLE • PASSION • PROFESSIONALISM • PEOPLE • PASSION • PROFESSIONALISM • PEOPLE • PASSION • PROFESSIONALISM • PEOPLE • PASSION • PROFESSIONALISM • PEOPLE • PASSION • PROFESSIONALISM • 
              </span>
            </div>
            <div className="animate-marquee flex-shrink-0 flex items-center">
              <span className="text-white font-semibold text-base tracking-wider leading-6">
                PEOPLE • PASSION • PROFESSIONALISM • PEOPLE • PASSION • PROFESSIONALISM • PEOPLE • PASSION • PROFESSIONALISM • PEOPLE • PASSION • PROFESSIONALISM • PEOPLE • PASSION • PROFESSIONALISM • PEOPLE • PASSION • PROFESSIONALISM • PEOPLE • PASSION • PROFESSIONALISM • PEOPLE • PASSION • PROFESSIONALISM • 
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;