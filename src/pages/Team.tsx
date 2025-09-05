import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Github, Linkedin } from 'lucide-react';

// Custom CSS for photo filtering
const photoFilterStyles = `
  .team-photo-filter {
    background-blend-mode: multiply;
    mix-blend-mode: multiply;
  }
  
  .team-photo-filter::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, 
      rgba(255, 193, 7, 0.1) 0%, 
      rgba(255, 235, 59, 0.1) 50%, 
      rgba(255, 193, 7, 0.1) 100%);
    pointer-events: none;
    border-radius: inherit;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = photoFilterStyles;
  document.head.appendChild(styleElement);
}

interface TeamMember {
  avatar: string;
  name: string;
  role: string;
  linkedin?: string;
  github?: string;
}

// BVCodeVerse team members - using local team photos
const TEAM_MEMBERS: TeamMember[] = [
  {
    avatar: '/1.png',
    name: 'Om Narkhede',
    role: 'President',
    linkedin: 'https://linkedin.com/in/om-narkhede',
    github: 'https://github.com/omnarkhede'
  },
  {
    avatar: '/2.jpg',
    name: 'Shivam Murkute',
    role: 'Vice President',
    linkedin: 'https://linkedin.com/in/shivam-murkute',
    github: 'https://github.com/shivammurkute'
  },
  {
    avatar: '/3.jpg',
    name: 'Katrina Irom',
    role: 'Secretary',
    linkedin: 'https://linkedin.com/in/katrina-irom',
    github: 'https://github.com/katrinairom'
  },
  {
    avatar: '/4.jpg',
    name: 'Sanskruti Kakade',
    role: 'Treasurer',
    linkedin: 'https://linkedin.com/in/sanskruti-kakade',
    github: 'https://github.com/sanskrutikakade'
  },
  {
    avatar: '/5.jpg',
    name: 'Aayush Jaju',
    role: 'Technical Head',
    linkedin: 'https://linkedin.com/in/aayush-jaju',
    github: 'https://github.com/aayushjaju'
  },
  {
    avatar: '/6.jpg',
    name: 'Harshada Misal',
    role: 'Creativity and Public Relations Head',
    linkedin: 'https://linkedin.com/in/harshada-misal',
    github: 'https://github.com/harshadamisal'
  },
  {
    avatar: '/7.jpg',
    name: 'Swayam Polakhare',
    role: 'Creativity and Public Relations and Technical Co-Head',
    linkedin: 'https://linkedin.com/in/swayam-polakhare',
    github: 'https://github.com/swayampolakhare'
  },
  {
    avatar: '/8.jpg',
    name: 'Swaraj Singh',
    role: 'Social Media Head',
    linkedin: 'https://linkedin.com/in/swaraj-singh',
    github: 'https://github.com/swarajsingh'
  },
  {
    avatar: '/9.jpg',
    name: 'Karan Sathe',
    role: 'Marketing Head',
    linkedin: 'https://linkedin.com/in/karan-sathe',
    github: 'https://github.com/karansathe'
  },
  {
    avatar: '/10.jpg',
    name: 'Harshal Patil',
    role: 'Event Coordinator Head',
    linkedin: 'https://linkedin.com/in/harshal-patil',
    github: 'https://github.com/harshalpatil'
  },
  {
    avatar: '/11.jpg',
    name: 'Mayank Tiwari',
    role: 'Event Coordinator Co-Head',
    linkedin: 'https://linkedin.com/in/mayank-tiwari',
    github: 'https://github.com/mayanktiwari'
  },
];

export function TeamCard({
  member,
  className,
  index,
  ...props
}: React.ComponentProps<'div'> & { member: TeamMember; index: number }) {
  return (
    <motion.div 
      className={cn('p-6 rounded-xl overflow-hidden text-center relative', className)} 
      initial={{ 
        opacity: 0, 
        x: index % 2 === 0 ? -100 : 100,
        y: 50,
        scale: 0.8
      }}
      animate={{ 
        opacity: 1, 
        x: 0,
        y: 0,
        scale: 1
      }}
      transition={{ 
        duration: 0.8, 
        delay: 0.8 + (index * 0.1),
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ 
        scale: 1.05,
        y: -10,
        x: index % 2 === 0 ? 5 : -5,
        transition: { duration: 0.2 }
      }}
      {...props}
    >
      {/* Enhanced glassmorphism card background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-md"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-purple-500/5"></div>
      
      {/* Twinkling stars animation */}
      <div className="absolute top-3 right-4 w-1 h-1 bg-white/80 rounded-full animate-pulse">
        <div className="absolute inset-0 animate-ping bg-white/60 rounded-full"></div>
      </div>
      <div className="absolute bottom-6 left-3 w-0.5 h-0.5 bg-cyan-400/90 rounded-full animate-pulse" style={{animationDelay: '1s'}}>
        <div className="absolute inset-0 animate-ping bg-cyan-400/70 rounded-full" style={{animationDelay: '1s'}}></div>
      </div>
      <div className="absolute top-1/3 left-2 w-0.5 h-0.5 bg-purple-400/80 rounded-full animate-pulse" style={{animationDelay: '2s'}}>
        <div className="absolute inset-0 animate-ping bg-purple-400/60 rounded-full" style={{animationDelay: '2s'}}></div>
      </div>
      <div className="absolute top-1/4 right-2 w-0.5 h-0.5 bg-white/70 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}>
        <div className="absolute inset-0 animate-ping bg-white/50 rounded-full" style={{animationDelay: '0.5s'}}></div>
      </div>
      <div className="absolute bottom-1/3 right-6 w-1 h-1 bg-cyan-300/80 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}>
        <div className="absolute inset-0 animate-ping bg-cyan-300/60 rounded-full" style={{animationDelay: '1.5s'}}></div>
      </div>
      {/* Profile Image - Clean and Simple */}
      <div className="relative mb-4">
        <motion.div
          className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-white/30 shadow-lg relative"
          whileHover={{ 
            rotate: 360,
            scale: 1.1,
            boxShadow: "0 0 30px rgba(34, 211, 238, 0.3)"
          }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={member.avatar}
            alt={member.name}
            width={96}
            height={96}
            className="w-full h-full object-cover"
            style={{
              filter: `
                contrast(1.2) 
                saturate(1.3) 
                brightness(1.0)
              `.trim(),
              transform: 'scale(1.3)',
              objectPosition: 'center'
            }}
          />
        </motion.div>
        
        {/* Simple outer glow effect */}
        <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-500/20 blur-md -z-10"></div>
      </div>

      {/* Member Info */}
      <div className="relative z-10 space-y-2">
        <h3 className="text-lg font-semibold text-white">{member.name}</h3>
        <p className="text-cyan-400 font-medium text-sm">{member.role}</p>
      </div>

      {/* Social Media Icons */}
      <div className="relative z-10 flex justify-center space-x-4 mt-4">
        {member.linkedin && (
          <motion.a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-gray-800/50 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 transition-all duration-300"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Linkedin className="w-4 h-4" />
          </motion.a>
        )}
        
        {member.github && (
          <motion.a
            href={member.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-300"
            whileHover={{ scale: 1.2, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Github className="w-4 h-4" />
          </motion.a>
        )}
      </div>

      {/* Animated border on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl border-2 border-transparent"
        whileHover={{
          borderColor: "rgba(34, 211, 238, 0.3)",
          boxShadow: "0 0 20px rgba(34, 211, 238, 0.1)"
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

const Team = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                Meet Our{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400">
                  Team
                </span>
              </h1>
            </motion.div>
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
            >
              Passionate developers, designers, and innovators driving BVCodeVerse forward
            </motion.p>
          </div>
        </section>

        {/* Team Grid */}
        <motion.section 
          className="py-20 px-4"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {TEAM_MEMBERS.map((member, index) => (
                <TeamCard
                  className="bg-black/20 backdrop-blur-lg border border-white/10 relative shadow-xl hover:shadow-2xl hover:shadow-cyan-400/10 transition-all duration-300"
                  key={index}
                  member={member}
                  index={index}
                />
              ))}
            </motion.div>
          </div>
        </motion.section>
        
        {/* Static team info section */}
        <motion.section 
          className="py-20 px-4"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Join Our Growing Community
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed">
                BVCodeVerse is more than just a coding club – we're a family of tech enthusiasts 
                committed to learning, building, and growing together. Each member brings unique 
                skills and perspectives that make our community stronger.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              {[
                { number: '50+', label: 'Core Members' },
                { number: '10+', label: 'Leadership Team' },
                { number: '24/7', label: 'Collaboration' }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                >
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-2">
                    {stat.number}
                  </div>
                  <p className="text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      </div>
    </Layout>
  );
};

export default Team;