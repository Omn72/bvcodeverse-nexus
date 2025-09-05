import Layout from '@/components/Layout';
import { BarChart3, Users, Calendar, Code2 } from 'lucide-react';

const Dashboard = () => {
  return (
    <Layout>
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <BarChart3 className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">Dashboard</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Club <span className="gradient-text">Analytics</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Track our progress, monitor club activities, and view key metrics that showcase BVCodeVerse's growth and impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { icon: Users, title: 'Total Members', value: '250+', color: 'text-primary' },
              { icon: Code2, title: 'Projects', value: '75', color: 'text-secondary' },
              { icon: Calendar, title: 'Events', value: '25', color: 'text-primary' },
              { icon: BarChart3, title: 'Activities', value: '100+', color: 'text-secondary' }
            ].map((stat, i) => (
              <div key={i} className="bg-card rounded-xl p-6 border border-border nav-glow">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-bold gradient-text">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-card rounded-xl p-8 border border-border nav-glow">
              <h3 className="text-xl font-semibold mb-6">Recent Activities</h3>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <p className="text-sm text-muted-foreground">Activity item {i}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-8 border border-border nav-glow">
              <h3 className="text-xl font-semibold mb-6">Upcoming Events</h3>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <p className="text-sm text-muted-foreground">Event {i}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;