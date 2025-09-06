import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, User, ChevronDown, FileText } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Navigation = () => {
  const [expanded, setExpanded] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { user, signOut } = useAuth();

  // Debug log on component mount
  useEffect(() => {
    console.log('Navigation component mounted', { user: !!user, expanded, showUserMenu });
  }, []);

  const navItems = [
    { name: 'Team', path: '/team' },
    { name: 'Events', path: '/events' },
    { name: 'Contest', path: '/contest' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Projects', path: '/projects' },
  ];

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        console.log('Clicked outside user menu, closing');
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  const handleSignOut = async () => {
    try {
      await signOut();
      setExpanded(false);
      setShowUserMenu(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Get user display name and initials
  const getUserDisplayName = () => {
    if (!user) return '';
    return user.user_metadata?.full_name || 
           user.user_metadata?.name || 
           user.email?.split('@')[0] || 
           'User';
  };

  const getUserInitials = () => {
    const name = getUserDisplayName();
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <header className="py-3 bg-black sm:py-4 relative z-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="shrink-0">
            <Link 
              to="/" 
              className="flex items-center space-x-2"
              onClick={() => console.log('Logo clicked')}
            >
              <img 
                src="/logo.png" 
                alt="BVCodeVerse Logo" 
                className="h-12 w-12 object-contain filter brightness-125 transform scale-125"
              />
            </Link>
          </div>

          <div className="flex md:hidden">
            {/* Simplified mobile menu button */}
            <div 
              className="text-white p-2 hover:bg-gray-800/50 rounded-lg transition-colors cursor-pointer select-none" 
              onClick={() => {
                console.log('Mobile menu toggle clicked via div', !expanded);
                setExpanded(!expanded);
              }}
              onMouseDown={(e) => e.preventDefault()}
            >
              {!expanded ? (
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
          </div>

          <nav className="hidden ml-8 mr-auto space-x-8 lg:ml-16 lg:space-x-10 md:flex md:items-center md:justify-start">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                to={item.path} 
                className="text-sm font-normal text-gray-400 transition-all duration-200 hover:text-white"
                onClick={() => console.log(`Desktop nav: ${item.name} clicked`)}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {user ? (
              <div className="relative" ref={userMenuRef}>
                {/* Simplified user menu button */}
                <div
                  className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-gray-800/50 cursor-pointer select-none"
                  onClick={() => {
                    console.log('User menu toggle clicked via div', !showUserMenu);
                    setShowUserMenu(!showUserMenu);
                  }}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
                    {getUserInitials()}
                  </div>
                  <span className="font-medium">{getUserDisplayName()}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                </div>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-xl py-2 z-[9999]">
                    <Link 
                      to="/apply-contest"
                      className="flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                      onClick={() => {
                        console.log('Apply for Contest link clicked');
                        setShowUserMenu(false);
                      }}
                    >
                      <FileText className="w-4 h-4 mr-3" />
                      Apply for Contest
                    </Link>
                    <Link 
                      to="/profile"
                      className="flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                      onClick={() => {
                        console.log('Profile link clicked');
                        setShowUserMenu(false);
                      }}
                    >
                      <User className="w-4 h-4 mr-3" />
                      Profile
                    </Link>
                    <Link 
                      to="/dashboard"
                      className="flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                      onClick={() => {
                        console.log('Dashboard link clicked');
                        setShowUserMenu(false);
                      }}
                    >
                      <User className="w-4 h-4 mr-3" />
                      Dashboard
                    </Link>
                    <hr className="my-2 border-gray-700" />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Desktop sign out clicked');
                        handleSignOut();
                      }}
                      className="flex items-center w-full px-4 py-2 text-gray-300 hover:text-red-400 hover:bg-gray-800 transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link 
                  to="/login"
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <div className="relative group">
                  <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
                  <Link 
                    to="/signup" 
                    className="relative inline-flex items-center justify-center px-6 py-2 text-base font-normal text-white bg-black border border-transparent rounded-full"
                  >
                    Login
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>

        {expanded && (
          <nav className="md:hidden">
            <div className="flex flex-col pt-8 pb-4 space-y-6">
              {navItems.map((item) => (
                <Link 
                  key={item.name}
                  to={item.path} 
                  className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
                  onClick={() => {
                    console.log(`Navigation to ${item.path}`);
                    setExpanded(false);
                  }}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Auth Section */}
              {user ? (
                <>
                  <div className="flex items-center space-x-3 py-2 border-b border-gray-700 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
                      {getUserInitials()}
                    </div>
                    <div>
                      <p className="text-white font-medium">{getUserDisplayName()}</p>
                      <p className="text-gray-400 text-sm">{user.email}</p>
                    </div>
                  </div>
                  <Link 
                    to="/apply-contest"
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors py-2"
                    onClick={() => setExpanded(false)}
                  >
                    <FileText className="w-4 h-4" />
                    <span>Apply for Contest</span>
                  </Link>
                  <Link 
                    to="/profile"
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors py-2"
                    onClick={() => setExpanded(false)}
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                  <Link 
                    to="/dashboard"
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors py-2"
                    onClick={() => setExpanded(false)}
                  >
                    <User className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('Mobile sign out clicked');
                      handleSignOut();
                    }}
                    className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-colors text-left py-2 w-full"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login"
                    className="text-base font-normal text-gray-400 hover:text-white transition-colors"
                    onClick={() => setExpanded(false)}
                  >
                    Sign In
                  </Link>
                  <div className="relative inline-flex items-center justify-center group">
                    <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
                    <Link 
                      to="/signup" 
                      className="relative inline-flex items-center justify-center w-full px-6 py-2 text-base font-normal text-white bg-black border border-transparent rounded-full"
                      onClick={() => setExpanded(false)}
                    >
                      Login
                    </Link>
                  </div>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navigation;