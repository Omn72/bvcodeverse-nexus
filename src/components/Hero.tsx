import { SplineScene } from "@/components/ui/splite";

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
              Join BVCodeVerse, where passionate developers collaborate.
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
          </div>

          <div className="relative flex items-center justify-center w-full h-full -mt-32">
            {/* Gradient glow around robot - increased size */}
            <div className="absolute z-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full bg-gradient-to-br from-cyan-400/30 via-purple-500/20 to-transparent blur-md pointer-events-none"></div>
            {/* Spline Robot 3D React Component - increased size further */}
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-[120vh] z-10 scale-125 translate-y-8"
            />
            {/* Bottom overlay to hide cut-off legs */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent z-15 pointer-events-none"></div>
          </div>
        </div>
        
        {/* Full Screen Width Moving Banner - Seamless Infinite */}
        <div className="absolute left-0 w-screen overflow-hidden mt-8 z-20">
          <div className="bg-black py-1 relative">
            {/* Robot-style gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-purple-500/15 to-transparent blur-sm"></div>
            <div className="relative whitespace-nowrap overflow-hidden flex">
              <div className="animate-marquee flex-shrink-0 flex items-center">
                <span className="text-white font-semibold text-base tracking-wider">
                  PEOPLE • PASSION • PROFESSIONALISM • PEOPLE • PASSION • PROFESSIONALISM • PEOPLE • PASSION • PROFESSIONALISM • PEOPLE • PASSION • PROFESSIONALISM • PEOPLE • PASSION • PROFESSIONALISM • PEOPLE • PASSION • PROFESSIONALISM • PEOPLE • PASSION • PROFESSIONALISM • PEOPLE • PASSION • PROFESSIONALISM • 
                </span>
              </div>
              <div className="animate-marquee flex-shrink-0 flex items-center">
                <span className="text-white font-semibold text-base tracking-wider">
                  PEOPLE • PASSION • PROFESSIONALISM • PEOPLE • PASSION • PROFESSIONALISM • PEOPLE • PASSION • PROFESSIONALISM • PEOPLE • PASSION • PROFESSIONALISM • PEOPLE • PASSION • PROFESSIONALISM • PEOPLE • PASSION • PROFESSIONALISM • PEOPLE • PASSION • PROFESSIONALISM • PEOPLE • PASSION • PROFESSIONALISM • 
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;