import { Code2, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Team', path: '/team' },
    { name: 'Events', path: '/events' },
    { name: 'Projects', path: '/projects' },
  ];

  const resources = [
    { name: 'Gallery', path: '/gallery' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Join Us', path: '#join' },
    { name: 'Contact', path: '#contact' },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="relative">
                <Code2 className="h-8 w-8 text-primary" />
                <div className="absolute inset-0 bg-primary/20 blur-xl opacity-50" />
              </div>
              <span className="font-bold text-xl gradient-text">BVCodeVerse</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-xs">
              Empowering the next generation of coders through collaboration, innovation, and continuous learning.
            </p>
            <div className="flex items-center space-x-4">
              <Github className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors nav-glow" />
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors nav-glow" />
              <Mail className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors nav-glow" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-3">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <Link 
                    to={resource.path}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {resource.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm">College Campus, Tech Building</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm">hello@bvcodeverse.edu</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
            </div>

            {/* Join CTA */}
            <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
              <h4 className="font-semibold text-foreground mb-2">Ready to Join?</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Start your coding journey with us today.
              </p>
              <button className="w-full btn-neon px-4 py-2 rounded-lg text-sm font-medium">
                Join BVCodeVerse
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2024 BVCodeVerse. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Code of Conduct</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;