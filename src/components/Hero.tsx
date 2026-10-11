import { ArrowRight, Code2, Users, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative py-12 overflow-hidden bg-black sm:pb-16 lg:pb-20 xl:pb-24">
      <div className="px-4 mx-auto relative sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid items-center grid-cols-1 gap-y-12 lg:grid-cols-2 gap-x-16">
          <div className="z-10">
            <h1 className="text-4xl font-normal text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              Empowering Coders, Showcasing Innovation
            </h1>
            <p className="mt-4 text-lg font-normal text-gray-400 sm:mt-8">
              Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 font-bold">BVCodeVerse</span>, where passionate developers collaborate, learn, and build the future together.
            </p>

            <div className="mt-8 sm:mt-12 flex flex-wrap gap-4">
              <Link
                to="/team"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-bold text-white transition-all duration-200 bg-gradient-to-r from-cyan-500 to-purple-500 border border-transparent rounded-full hover:from-cyan-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              >
                Meet the Team
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              
              <Link
                to="/projects"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-bold text-gray-300 transition-all duration-200 bg-transparent border border-gray-700 rounded-full hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
              >
                View Projects
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-gray-800 pt-8">
              <div>
                <div className="flex items-center space-x-2 text-cyan-400 mb-2">
                  <Code2 className="w-5 h-5" />
                  <span className="font-bold">Code</span>
                </div>
                <p className="text-sm text-gray-500">Master new technologies</p>
              </div>
              <div>
                <div className="flex items-center space-x-2 text-purple-400 mb-2">
                  <Cpu className="w-5 h-5" />
                  <span className="font-bold">Build</span>
                </div>
                <p className="text-sm text-gray-500">Create real-world projects</p>
              </div>
              <div>
                <div className="flex items-center space-x-2 text-pink-400 mb-2">
                  <Users className="w-5 h-5" />
                  <span className="font-bold">Connect</span>
                </div>
                <p className="text-sm text-gray-500">Join a vibrant community</p>
              </div>
            </div>
          </div>

          <div className="relative h-[400px] lg:h-[600px] w-full hidden md:flex items-center justify-center">
             <div className="relative w-full h-full bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 rounded-2xl border border-gray-800 backdrop-blur-sm overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
                <div className="text-center p-8">
                   <div className="text-6xl mb-4">🚀</div>
                   <h3 className="text-2xl font-bold text-white mb-2">Launch Your Journey</h3>
                   <p className="text-gray-400">Collaborate, Build, and Innovate</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;