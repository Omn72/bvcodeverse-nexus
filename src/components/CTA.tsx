import { ArrowRight, Code, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTA = () => {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5" />
      <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Zap className="h-4 w-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">Join the Movement</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold">
            Ready to <span className="gradient-text">Code</span> the Future?
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join our community of passionate developers, innovators, and tech enthusiasts. 
            Your journey to becoming an exceptional coder starts here.
          </p>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12 max-w-3xl mx-auto">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Code className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-foreground">Learn & Grow</div>
                <div className="text-sm text-muted-foreground">Skill development</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-secondary" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-foreground">Network</div>
                <div className="text-sm text-muted-foreground">Build connections</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-foreground">Innovate</div>
                <div className="text-sm text-muted-foreground">Create impact</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="btn-neon group px-8 py-6 text-lg font-semibold rounded-xl">
              Join BVCodeVerse Now
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Button variant="outline" className="btn-outline-neon px-8 py-6 text-lg font-semibold rounded-xl">
              Learn More
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground mb-4">Trusted by students and faculty</p>
            <div className="flex justify-center items-center space-x-8 text-muted-foreground">
              <div className="text-2xl font-bold gradient-text">200+</div>
              <div className="w-px h-8 bg-border"></div>
              <div className="text-2xl font-bold gradient-text">50+</div>
              <div className="w-px h-8 bg-border"></div>
              <div className="text-2xl font-bold gradient-text">4.9★</div>
            </div>
            <div className="flex justify-center items-center space-x-8 text-xs text-muted-foreground mt-2">
              <span>Members</span>
              <span></span>
              <span>Projects</span>
              <span></span>
              <span>Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;