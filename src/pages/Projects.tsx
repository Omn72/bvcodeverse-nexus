import Layout from '@/components/Layout';
import { Code2, Github, ExternalLink, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Projects = () => {
  return (
    <Layout>
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Code2 className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">Our Work</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Featured <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover innovative solutions and creative applications built by our talented community members.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-card rounded-xl p-6 border border-border nav-glow">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg mb-4 flex items-center justify-center">
                  <Code2 className="h-12 w-12 text-primary" />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Project {i}</h3>
                    <p className="text-muted-foreground text-sm">
                      An innovative solution showcasing modern development practices and creative problem-solving.
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">React</span>
                    <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full">TypeScript</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Star className="h-4 w-4 fill-current text-yellow-400" />
                      <span>24</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="p-2">
                        <Github className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-2">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;