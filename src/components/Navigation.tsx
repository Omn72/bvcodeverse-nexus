import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code2, Menu, X } from 'lucide-react';

const Navigation = () => {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Team', path: '/team' },
    { name: 'Events', path: '/events' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Projects', path: '/projects' },
  ];

  return (
    <header className="py-4 bg-black sm:py-6">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <Code2 className="h-9 w-9 text-cyan-500" />
              <span className="text-xl font-bold text-white">BVCodeVerse</span>
            </Link>
          </div>

          <div className="flex md:hidden">
            <button 
              type="button" 
              className="text-white" 
              onClick={() => setExpanded(!expanded)}
            >
              {!expanded ? (
                <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>

          <nav className="hidden ml-10 mr-auto space-x-10 lg:ml-20 lg:space-x-12 md:flex md:items-center md:justify-start">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                to={item.path} 
                className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="relative hidden md:items-center md:justify-center md:inline-flex group">
            <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
            <Link 
              to="/dashboard" 
              className="relative inline-flex items-center justify-center px-6 py-2 text-base font-normal text-white bg-black border border-transparent rounded-full"
            >
              Join the Club
            </Link>
          </div>
        </div>

        {expanded && (
          <nav>
            <div className="flex flex-col pt-8 pb-4 space-y-6">
              {navItems.map((item) => (
                <Link 
                  key={item.name}
                  to={item.path} 
                  className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
                  onClick={() => setExpanded(false)}
                >
                  {item.name}
                </Link>
              ))}

              <div className="relative inline-flex items-center justify-center group">
                <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
                <Link 
                  to="/dashboard" 
                  className="relative inline-flex items-center justify-center w-full px-6 py-2 text-base font-normal text-white bg-black border border-transparent rounded-full"
                  onClick={() => setExpanded(false)}
                >
                  Join the Club
                </Link>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navigation;