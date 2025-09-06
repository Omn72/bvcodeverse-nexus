import Layout from '@/components/Layout';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';

const Events = () => {
  return (
    <Layout>
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Calendar className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">Upcoming Events</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Join Our <span className="gradient-text">Events</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Participate in workshops, hackathons, and coding sessions that will enhance your skills and expand your network.
            </p>
          </div>

          <div className="space-y-8">
            {/* Event cards */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-xl p-8 border border-border nav-glow">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4">Event Title {i}</h3>
                    <p className="text-muted-foreground mb-6">
                      Join us for an exciting event where we'll explore cutting-edge technologies and build amazing projects together.
                    </p>
                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2 text-primary" />
                        March 15, 2024
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2 text-primary" />
                        6:00 PM - 9:00 PM
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2 text-primary" />
                        Campus Auditorium
                      </div>
                    </div>
                  </div>
                  <div className="lg:ml-8">
                    <Button className="btn-neon">Register Now</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </Layout>
  );
};

export default Events;