import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [expanded, setExpanded] = useState(false);

  const navItems = [
    { name: 'Git Workshop', path: '/github-session', isFeatured: true },
    { name: 'Team', path: '/team' },
    { name: 'Events', path: '/events' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Projects', path: '/projects' },
  ];

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

          <nav className="hidden ml-8 mr-auto space-x-6 lg:ml-16 lg:space-x-8 md:flex md:items-center md:justify-start">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                to={item.path} 
                className={`text-sm transition-all duration-200 flex items-center gap-1.5 ${
                  item.isFeatured 
                    ? 'text-cyan-400 font-semibold px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 hover:bg-cyan-900/60 hover:text-white shadow-sm shadow-cyan-500/20' 
                    : 'font-normal text-gray-400 hover:text-white'
                }`}
                onClick={() => console.log(`Desktop nav: ${item.name} clicked`)}
              >
                <span>{item.name}</span>
                {item.isFeatured && (
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
                )}
              </Link>
            ))}
          </nav>
        </div>

        {expanded && (
          <nav className="md:hidden">
            <div className="flex flex-col pt-8 pb-4 space-y-5">
              {navItems.map((item) => (
                <Link 
                  key={item.name}
                  to={item.path} 
                  className={`text-base transition-all duration-200 flex items-center justify-between ${
                    item.isFeatured
                      ? 'text-cyan-400 font-semibold bg-cyan-950/40 p-3 rounded-lg border border-cyan-800'
                      : 'font-normal text-gray-400 hover:text-white px-1'
                  }`}
                  onClick={() => {
                    console.log(`Navigation to ${item.path}`);
                    setExpanded(false);
                  }}
                >
                  <span>{item.name}</span>
                  {item.isFeatured && (
                    <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
                      12 Oct
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navigation;