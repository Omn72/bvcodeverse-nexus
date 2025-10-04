import { ArrowRight, Trophy, Clock, Gift, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Squares } from '@/components/ui/squares-background';

const CTA = () => {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Animated Squares Background */}
      <div className="absolute inset-0">
        <Squares
          direction="diagonal"
          speed={0.5}
          squareSize={50}
          borderColor="#333333"
          hoverFillColor="#1a1a1a"
          className="opacity-70"
        />
      </div>
      
      {/* Background gradient effects */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Trophy className="h-4 w-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">Contest Season Open</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white">
            Ready to <span className="gradient-text">participate</span>?
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Join our exciting coding contests and hackathons. Compete with fellow developers, 
            showcase your skills, and win amazing prizes. Your next big victory awaits!
          </p>

          {/* Contest Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12 max-w-3xl mx-auto">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Trophy className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-white">Win Prizes</div>
                <div className="text-sm text-gray-400">Cash & rewards</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-secondary" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-white">48H Challenges</div>
                <div className="text-sm text-gray-400">Fast-paced coding</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Gift className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-white">Recognition</div>
                <div className="text-sm text-gray-400">Build your portfolio</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/apply-contest">
              <Button className="btn-neon group px-8 py-6 text-lg font-semibold rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                Apply for Contest
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            
            <Link to="/contest">
              <Button 
                variant="outline" 
                className="btn-outline-neon px-8 py-6 text-lg font-semibold rounded-xl border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300"
              >
                View Contest Details
              </Button>
            </Link>
          </div>

          {/* Explore Dashboard CTA (replaces stats) */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-400 mb-4">Explore more contest data and leaderboards</p>
            <Link to="/dashboard" className="inline-block">
              <Button className="btn-neon group px-8 py-4 text-lg font-semibold rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                Explore Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;