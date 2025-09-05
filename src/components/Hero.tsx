import { ArrowRight, Code, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const features = [
    { icon: Code, text: 'Learn & Code' },
    { icon: Users, text: 'Collaborate' },
    { icon: Zap, text: 'Innovate' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] animate-pulse" />
      
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

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Heading */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="text-sm font-medium text-primary">Welcome to the Future of Coding</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="block text-foreground">Empowering</span>
              <span className="block gradient-text text-shadow-glow">Coders,</span>
              <span className="block text-foreground">Showcasing</span>
              <span className="block gradient-text text-shadow-glow">Innovation</span>
            </h1>
          </div>

          <p className="max-w-3xl mx-auto text-xl md:text-2xl text-muted-foreground leading-relaxed">
            Join BVCodeVerse, where passionate developers collaborate, learn cutting-edge technologies, 
            and build the future together. Your coding journey starts here.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 px-4 py-2 rounded-full bg-card/50 border border-border hover:border-primary/50 transition-colors nav-glow"
              >
                <feature.icon className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-foreground">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="btn-neon group px-8 py-6 text-lg font-semibold rounded-xl">
              Join the Club
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Button variant="outline" className="btn-outline-neon px-8 py-6 text-lg font-semibold rounded-xl">
              Explore Projects
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold gradient-text">200+</div>
              <div className="text-muted-foreground">Active Members</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold gradient-text">50+</div>
              <div className="text-muted-foreground">Projects Built</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold gradient-text">24/7</div>
              <div className="text-muted-foreground">Collaboration</div>
            </div>
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