import Layout from '@/components/Layout';
import { Users, Github, Linkedin, Mail } from 'lucide-react';

const Team = () => {
  return (
    <Layout>
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Users className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">Our Team</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Meet the <span className="gradient-text">Innovators</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The passionate minds driving BVCodeVerse forward, building the future of coding education and collaboration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team member cards will be populated with real data */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-card rounded-xl p-6 border border-border nav-glow">
                <div className="w-20 h-20 bg-gradient-primary rounded-full mb-4 mx-auto"></div>
                <h3 className="text-xl font-semibold text-center mb-2">Team Member {i}</h3>
                <p className="text-muted-foreground text-center mb-4">Position Title</p>
                <div className="flex justify-center space-x-3">
                  <Github className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                  <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                  <Mail className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Team;