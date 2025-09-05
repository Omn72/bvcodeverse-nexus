const Hero = () => {
  return (
    <section className="relative py-12 overflow-hidden bg-black sm:pb-16 lg:pb-20 xl:pb-24">
      <div className="px-4 mx-auto relative sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid items-center grid-cols-1 gap-y-12 lg:grid-cols-2 gap-x-16">
          <div>
            <h1 className="text-4xl font-normal text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              Empowering Coders, Showcasing Innovation
            </h1>
            <p className="mt-4 text-lg font-normal text-gray-400 sm:mt-8">
              Join BVCodeVerse, where passionate developers collaborate, learn cutting-edge technologies, 
              and build the future together. Your coding journey starts here.
            </p>

            <form action="#" method="POST" className="relative mt-8 rounded-full sm:mt-12">
              <div className="relative">
                <div className="absolute rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500"></div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-6">
                    <svg className="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input 
                    type="email" 
                    name="" 
                    id="" 
                    placeholder="Try React, Python, AI Development..." 
                    className="block w-full py-4 pr-6 text-white placeholder-gray-500 bg-black border border-transparent rounded-full pl-14 sm:py-5 focus:border-transparent focus:ring-0" 
                  />
                </div>
              </div>
              <div className="sm:absolute flex sm:right-1.5 sm:inset-y-1.5 mt-4 sm:mt-0">
                <button 
                  type="submit" 
                  className="inline-flex items-center justify-center w-full px-5 py-5 text-sm font-semibold tracking-widest text-black uppercase transition-all duration-200 bg-white rounded-full sm:w-auto sm:py-3 hover:opacity-90"
                >
                  Join the Club
                </button>
              </div>
            </form>

            <div className="mt-8 sm:mt-12">
              <p className="text-lg font-normal text-white">Trusted by 200+ developers</p>

              <div className="flex items-center mt-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M10.8586 4.71248C11.2178 3.60691 12.7819 3.60691 13.1412 4.71248L14.4246 8.66264C14.5853 9.15706 15.046 9.49182 15.5659 9.49182H19.7193C20.8818 9.49182 21.3651 10.9794 20.4247 11.6626L17.0645 14.104C16.6439 14.4095 16.4679 14.9512 16.6286 15.4456L17.912 19.3958C18.2713 20.5013 17.0059 21.4207 16.0654 20.7374L12.7052 18.2961C12.2846 17.9905 11.7151 17.9905 11.2945 18.2961L7.93434 20.7374C6.99388 21.4207 5.72851 20.5013 6.08773 19.3958L7.37121 15.4456C7.53186 14.9512 7.35587 14.4095 6.93529 14.104L3.57508 11.6626C2.63463 10.9794 3.11796 9.49182 4.28043 9.49182H8.43387C8.95374 9.49182 9.41448 9.15706 9.57513 8.66264L10.8586 4.71248Z"
                        fill="url(#star-gradient)"
                      />
                      <defs>
                        <linearGradient id="star-gradient" x1="3.07813" y1="3.8833" x2="23.0483" y2="6.90161" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#06b6d4" />
                          <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                      </defs>
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-base font-normal text-white"> 4.9/5 </span>
                <span className="ml-1 text-base font-normal text-gray-500"> (150+ Reviews) </span>
              </div>
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
                  fill="url(#bg-gradient)" 
                />
                <defs>
                  <linearGradient id="bg-gradient" x1="82.7339" y1="550.792" x2="-39.945" y2="118.965" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="absolute inset-0">
              <div className="object-cover w-full h-full opacity-50 bg-gradient-to-r from-gray-900/20 to-gray-800/20 rounded-lg"></div>
            </div>

            <div className="relative w-full max-w-md mx-auto aspect-square flex items-center justify-center">
              <div className="text-center space-y-6">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-cyan-500/30">
                  <svg className="w-16 h-16 text-cyan-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">BVCodeVerse</h3>
                  <p className="text-gray-400">Innovation Hub</p>
                  <div className="flex justify-center space-x-4 text-sm text-gray-500">
                    <span>200+ Members</span>
                    <span>•</span>
                    <span>50+ Projects</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;