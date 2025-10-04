import { Code2, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
// Terms modal replaced with a dedicated page link for reliability

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4 max-w-sm lg:max-w-none">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/logo.png" 
                alt="BVCodeVerse Logo" 
                width="128" height="128"
                decoding="async"
                loading="lazy"
                className="h-16 w-16 md:h-24 md:w-24 lg:h-20 lg:w-20 object-contain filter brightness-2"
              />
              {/* intentionally left blank: logo only on the left column */}
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              Empowering the next generation of coders through collaboration, innovation, and continuous learning.
            </p>
            <div className="flex items-center space-x-4">
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2 rounded-md hover:bg-white/5">
                <Github className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors nav-glow" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2 rounded-md hover:bg-white/5">
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors nav-glow" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="mailto:bvcodeverse@outlook.com" aria-label="Email" className="p-2 rounded-md hover:bg-white/5">
                <Mail className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors nav-glow" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          {/* Quick Links & Resources: show accordion on mobile, lists on md+ */}
          <div className="md:hidden space-y-4">
            <details className="bg-transparent border border-border rounded-lg p-3">
              <summary className="font-semibold text-foreground cursor-pointer">Quick Links</summary>
              <ul className="mt-3 space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-muted-foreground hover:text-primary transition-colors block">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>

            <details className="bg-transparent border border-border rounded-lg p-3">
              <summary className="font-semibold text-foreground cursor-pointer">Resources</summary>
              <ul className="mt-3 space-y-2">
                {resources.map((resource) => (
                  <li key={resource.name}>
                    <Link to={resource.path} className="text-muted-foreground hover:text-primary transition-colors block">
                      {resource.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </div>

          {/* Desktop lists */}
          <div className="hidden md:block lg:col-span-1">
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-3 mb-6">
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
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-foreground mb-4">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm">Bharati Vidyapeeth College Of Engineering Lavale Pune</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm">bvcodeverse@outlook.com</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm">+91 8999603334 Harshal Patil (Event Co-ordinator Head)</span>
              </div>
            </div>

            {/* Join CTA */}
            <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 w-full md:w-80">
              <h4 className="font-semibold text-foreground mb-2">Drop Your Feedback</h4>
              <p className="text-sm text-muted-foreground mb-3">
                We're listening 👂🏼. Share your thoughts
              </p>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScbKwy-QGmoF0BjgD8HL4vrhfO-QnW4tjyM8Xcj4hoTb0eyZQ/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full md:w-auto btn-neon px-4 py-2 rounded-lg text-sm font-medium text-center"
              >
                Feedback
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2025{' '}
              <a 
                href="https://bvcoe.bharatividyapeeth.edu/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors cursor-pointer underline"
              >
                BVCOEL
              </a>
                . All rights reserved. Designed & Developed by{' '}
              <a 
                href="https://www.linkedin.com/in/omnarkhede/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors cursor-pointer underline"
              >
                Om Narkhede
              </a>
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-primary transition-colors underline-offset-2 hover:underline">Terms & Conditions</Link>
              <Link to="/code-of-conduct" className="hover:text-primary transition-colors">Code of Conduct</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;