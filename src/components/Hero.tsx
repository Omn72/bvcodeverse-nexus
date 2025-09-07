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
             The BVCodeVerse, BVCOEL official Coding Hub.
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="relative mt-8 rounded-full sm:mt-12">
              <div className="relative">
                <div className="absolute rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500"></div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-6">
                    <Search className="w-5 h-5 text-gray-500" />
                  </div>

                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      handleSearch(e.target.value);
                    }}
                    onFocus={() => {
                      if (!searchQuery && suggestedUsers.length > 0) {
                        setSearchResults(suggestedUsers);
                        setShowResults(true);
                      } else if (searchQuery) {
                        setShowResults(true);
                      }
                    }}
                    onBlur={() => setTimeout(() => setShowResults(false), 200)}
                    placeholder="Search developers by name, college, or skills..." 
                    className="block w-full py-4 pr-6 text-white placeholder-gray-500 bg-black border border-transparent rounded-full pl-14 sm:py-5 focus:border-transparent focus:ring-0" 
                  />
                  
                  {isSearching && (
                    <div className="absolute inset-y-0 right-20 flex items-center">
                      <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                    </div>
                  )}
                </div>

                {/* Search Results Dropdown */}
                {showResults && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-2xl shadow-xl z-50 max-h-80 overflow-y-auto">
                    {!searchQuery && (
                      <div className="px-4 py-2 border-b border-gray-800">
                        <p className="text-sm text-gray-400 font-medium">Suggested Users</p>
                      </div>
                    )}
                    {searchResults.map((user, index) => (
                      <div
                        key={user.user_id || user.id || user.username || index}
                        onClick={() => handleUserClick(user)}
                        className="flex items-center p-4 hover:bg-gray-800 cursor-pointer transition-colors border-b border-gray-800 last:border-b-0"
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center text-black font-bold text-sm mr-3">
                          {user.full_name 
                            ? user.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
                            : <User className="w-5 h-5" />
                          }
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-medium">
                            {user.full_name || 'Anonymous User'}
                          </p>
                          <div className="flex items-center text-sm text-gray-400">
                            <span>{user.college || 'Student'}</span>
                            {user.user_stats && user.user_stats.length > 0 && (
                              <>
                                <span className="mx-2">•</span>
                                <span>{user.user_stats[0].total_points || 0} points</span>
                                {user.user_stats[0].rank && (
                                  <>
                                    <span className="mx-2">•</span>
                                    <span className="text-cyan-400">Rank #{user.user_stats[0].rank}</span>
                                  </>
                                )}
                              </>
                            )}
                            {user.skills && user.skills.length > 0 && (
                              <>
                                <span className="mx-2">•</span>
                                <span className="text-purple-400">{user.skills.slice(0, 2).join(', ')}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* No Results Message */}
                {showResults && searchResults.length === 0 && searchQuery && !isSearching && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-2xl shadow-xl z-50 p-6 text-center">
                    <User className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-400">No users found matching "{searchQuery}"</p>
                    <p className="text-sm text-gray-500 mt-1">Try searching by name, college, or skills</p>
                  </div>
                )}
              </div>
              <div className="sm:absolute flex sm:right-1.5 sm:inset-y-1.5 mt-4 sm:mt-0">
                <button 
                  type="submit" 
                  className="inline-flex items-center justify-center w-full px-5 py-5 text-sm font-semibold tracking-widest text-black uppercase transition-all duration-200 bg-white rounded-full sm:w-auto sm:py-3 hover:opacity-90"
                >
                  Join the Newsletter
                </button>
              </div>
            </form>
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
            {/* Bottom overlay to hide cut-off legs */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent z-15 pointer-events-none"></div>
          </div>
        </div>
        
      </div>

      {/* Full-width Moving Ribbon - outside container to span entire page width */}
      <div className="w-full overflow-hidden mt-8 z-10">
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