import Layout from '@/components/Layout';
import { Calendar, MapPin, Clock, ExternalLink, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

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
            {/* Featured Event: Git & GitHub Workshop */}
            <div className="bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900 rounded-xl p-8 border border-cyan-500/50 shadow-xl shadow-cyan-500/10">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold mb-3 border border-cyan-500/40">
                    FEATURED HANDS-ON WORKSHOP
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                    Git & GitHub Hands-on Workshop
                  </h3>
                  <p className="text-cyan-400 text-sm font-semibold mb-3">
                    LEARN | PRACTICE | COLLABORATE | BUILD
                  </p>
                  <p className="text-gray-300 text-sm sm:text-base mb-6 leading-relaxed">
                    A practical workshop by Department of Computer Engineering & BV CodeVerse to help you master Git and GitHub, manage repositories, collaborate on team projects, and unlock the GitHub Student Developer Pack.
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                    <div className="flex items-center bg-gray-900 px-3 py-1.5 rounded-lg border border-gray-800">
                      <Calendar className="h-4 w-4 mr-2 text-cyan-400" />
                      12th October
                    </div>
                    <div className="flex items-center bg-gray-900 px-3 py-1.5 rounded-lg border border-gray-800">
                      <Clock className="h-4 w-4 mr-2 text-purple-400" />
                      9:30 AM - 11:30 AM
                    </div>
                    <div className="flex items-center bg-gray-900 px-3 py-1.5 rounded-lg border border-gray-800">
                      <MapPin className="h-4 w-4 mr-2 text-pink-400" />
                      CCF- LAB
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                  <Link
                    to="/github-session"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-bold text-black bg-cyan-400 hover:bg-cyan-300 transition-colors text-center shadow-lg shadow-cyan-500/20"
                  >
                    View Workshop & Cheatsheet
                  </Link>
                </div>
              </div>
            </div>

            {/* Other Events */}
            {[
              {
                title: "Web3 & Smart Contracts Bootcamp",
                desc: "Dive into blockchain development, write and deploy Solidity smart contracts, and explore decentralized apps.",
                date: "November 5, 2024",
                time: "4:00 PM - 7:00 PM",
                location: "Seminar Hall"
              },
              {
                title: "BV CodeVerse Hackathon Sprint",
                desc: "A 24-hour sprint bringing together designers, developers, and innovators to build impactful real-world software.",
                date: "December 14, 2024",
                time: "10:00 AM - Over-night",
                location: "College Campus Labs"
              }
            ].map((event, i) => (
              <div key={i} className="bg-card rounded-xl p-8 border border-border nav-glow">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4">{event.title}</h3>
                    <p className="text-muted-foreground mb-6">
                      {event.desc}
                    </p>
                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2 text-primary" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2 text-primary" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2 text-primary" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                  <div className="lg:ml-8">
                    <Button className="btn-neon">Coming Soon</Button>
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

export default Events;