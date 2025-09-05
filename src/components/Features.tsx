import { Code2, Users, Zap, Laptop, Trophy, BookOpen } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Code2,
      title: 'Learn to Code',
      description: 'Master programming languages and frameworks with hands-on workshops and mentorship.'
    },
    {
      icon: Users,
      title: 'Collaborate',
      description: 'Work on real projects with talented peers and build lasting professional connections.'
    },
    {
      icon: Zap,
      title: 'Innovation Hub',
      description: 'Turn your creative ideas into reality with access to resources and expert guidance.'
    },
    {
      icon: Laptop,
      title: 'Tech Talks',
      description: 'Stay updated with industry trends through expert sessions and knowledge sharing.'
    },
    {
      icon: Trophy,
      title: 'Competitions',
      description: 'Participate in hackathons, coding contests, and showcase your skills to win prizes.'
    },
    {
      icon: BookOpen,
      title: 'Resources',
      description: 'Access curated learning materials, project templates, and development tools.'
    }
  ];

  return (
    <section className="py-20 bg-card/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Zap className="h-4 w-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">What We Offer</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Why Choose <span className="gradient-text">BVCodeVerse</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join a community that's committed to your growth as a developer and innovator.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-card rounded-xl p-8 border border-border nav-glow group">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;