import { ArrowRight, Search, Star, Code, Users, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative py-12 overflow-hidden bg-background sm:pb-16 lg:pb-20 xl:pb-24">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      {/* Floating Code Elements */}
      <div className="absolute top-20 left-10 text-primary/20 font-mono text-xs select-none">
        {'<div className="future">'}
      </div>
      <div className="absolute top-32 right-16 text-secondary/20 font-mono text-xs select-none">
        {'{coding: true}'}
      </div>
      <div className="absolute bottom-32 left-20 text-primary/20 font-mono text-xs select-none">
        {'</innovation>'}
      </div>
      <div className="absolute bottom-20 right-12 text-secondary/20 font-mono text-xs select-none">
        {'// Join us'}
      </div>

      <div className="px-4 mx-auto relative sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid items-center grid-cols-1 gap-y-12 lg:grid-cols-2 gap-x-16">
          <div>
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
              Empowering <span className="gradient-text">Coders</span>, Showcasing <span className="gradient-text">Innovation</span>
            </h1>
            <p className="mt-4 text-lg font-normal text-muted-foreground sm:mt-8">
              Join BVCodeVerse, where passionate developers collaborate, learn cutting-edge technologies, 
              and build the future together. Your coding journey starts here.
            </p>

            <form className="relative mt-8 rounded-full sm:mt-12">
              <div className="relative">
                <div className="absolute rounded-full -inset-px bg-gradient-to-r from-primary to-secondary"></div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-6">
                    <Search className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Search skills: React, Python, AI..." 
                    className="block w-full py-4 pr-6 text-foreground placeholder-muted-foreground bg-background border border-transparent rounded-full pl-14 sm:py-5 focus:border-transparent focus:ring-0" 
                  />
                </div>
              </div>
              <div className="sm:absolute flex sm:right-1.5 sm:inset-y-1.5 mt-4 sm:mt-0">
                <button 
                  type="submit" 
                  className="inline-flex items-center justify-center w-full px-5 py-5 text-sm font-semibold tracking-widest text-background uppercase transition-all duration-200 bg-foreground rounded-full sm:w-auto sm:py-3 hover:opacity-90"
                >
                  Join the Club
                </button>
              </div>
            </form>

            <div className="mt-8 sm:mt-12">
              <p className="text-lg font-normal text-foreground">Trusted by 200+ developers</p>

              <div className="flex items-center mt-3">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-current text-primary" />
                  ))}
                </div>
                <span className="ml-2 text-base font-normal text-foreground"> 4.9/5 </span>
                <span className="ml-1 text-base font-normal text-muted-foreground"> (150+ Reviews) </span>
              </div>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-4 mt-8">
              {[
                { icon: Code, text: 'Learn & Code' },
                { icon: Users, text: 'Collaborate' },
                { icon: Zap, text: 'Innovate' }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full bg-card/50 border border-border hover:border-primary/50 transition-colors nav-glow"
                >
                  <feature.icon className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-foreground">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0">
              <svg 
                className="blur-3xl filter opacity-70" 
                style={{filter: 'blur(64px)'}} 
                width="444" 
                height="536" 
                viewBox="0 0 444 536" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M225.919 112.719C343.98 64.6648 389.388 -70.487 437.442 47.574C485.496 165.635 253.266 481.381 135.205 529.435C17.1445 577.488 57.9596 339.654 9.9057 221.593C-38.1482 103.532 107.858 160.773 225.919 112.719Z" 
                  fill="url(#heroGradient)" 
                />
                <defs>
                  <linearGradient id="heroGradient" x1="82.7339" y1="550.792" x2="-39.945" y2="118.965" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(var(--secondary))" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="relative w-full max-w-md mx-auto aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl flex items-center justify-center">
              <div className="text-center space-y-4">
                <Code className="h-20 w-20 text-primary mx-auto animate-pulse" />
                <div className="space-y-2">
                  <div className="text-2xl font-bold gradient-text">BVCodeVerse</div>
                  <div className="text-sm text-muted-foreground">Innovation Hub</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
          <div className="space-y-2">
            <div className="text-3xl md:text-4xl font-bold gradient-text">200+</div>
            <div className="text-muted-foreground">Active Members</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl md:text-4xl font-bold gradient-text">50+</div>
            <div className="text-muted-foreground">Projects Built</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl md:text-4xl font-bold gradient-text">24/7</div>
            <div className="text-muted-foreground">Collaboration</div>
          </div>
        </div>
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
    </section>
  );
};

export default Hero;