import Layout from '@/components/Layout';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Github, Linkedin, User } from 'lucide-react';
import { useState } from 'react';

interface TeamMember {
  avatar: string;
  name: string;
  role: string;
  linkedin?: string;
  github?: string;
}

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
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Generate a fallback avatar URL
  const getFallbackAvatar = (name: string) => {
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1e293b&color=22d3ee&size=96&format=png&bold=true`;
  };

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
        delay: 0.2 + (index * 0.1),
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ 
        scale: 1.05,
        y: -10,
        transition: { duration: 0.2 }
      }}
      {...props}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-md rounded-xl"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-purple-500/5 rounded-xl"></div>
      
      {/* Profile Image */}
      <div className="relative mb-4">
        <motion.div
          className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-white/30 shadow-lg relative bg-gray-800"
          whileHover={{ 
            rotate: 5,
            scale: 1.1,
            boxShadow: "0 0 30px rgba(34, 211, 238, 0.3)"
          }}
          transition={{ duration: 0.3 }}
        >
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          
          {imageError ? (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800">
              <User className="w-12 h-12 text-gray-400" />
            </div>
          ) : (
            <img
              src={member.avatar}
              alt={member.name}
              width={96}
              height={96}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => {
                console.log(`Image loaded: ${member.avatar}`);
                setImageLoaded(true);
              }}
              onError={(e) => {
                console.error(`Image failed to load: ${member.avatar}`);
                setImageError(true);
                // Try fallback avatar
                const target = e.target as HTMLImageElement;
                if (!target.src.includes('ui-avatars.com')) {
                  target.src = getFallbackAvatar(member.name);
                  setImageError(false);
                }
              }}
            />
          )}
        </motion.div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-500/20 blur-md -z-10"></div>
      </div>

      {/* Member Info */}
      <div className="relative z-10 space-y-2">
        <h3 className="text-lg font-semibold text-white">{member.name}</h3>
        <p className="text-cyan-400 font-medium text-sm leading-tight">{member.role}</p>
      </div>

      {/* Social Media Icons */}
      <div className="relative z-10 flex justify-center space-x-3 mt-4">
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

      {/* Hover border effect */}
      <motion.div
        className="absolute inset-0 rounded-xl border-2 border-transparent"
        whileHover={{
          borderColor: "rgba(34, 211, 238, 0.3)",
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
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
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
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
            >
              Passionate developers, designers, and innovators driving BVCodeVerse forward
            </motion.p>
          </div>
        </section>

        {/* Team Grid */}
        <motion.section 
          className="py-20 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {TEAM_MEMBERS.map((member, index) => (
                <TeamCard
                  className="bg-black/20 backdrop-blur-lg border border-white/10 relative shadow-xl hover:shadow-2xl hover:shadow-cyan-400/10 transition-all duration-300"
                  key={`${member.name}-${index}`}
                  member={member}
                  index={index}
                />
              ))}
            </div>
          </div>
        </motion.section>

        {/* Team Stats Section */}
        <motion.section 
          className="py-20 px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Join Our Growing Community
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed">
              BVCodeVerse is more than just a coding club – we're a family of tech enthusiasts 
              committed to learning, building, and growing together. Each member brings unique 
              skills and perspectives that make our community stronger.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                { number: '50+', label: 'Core Members' },
                { number: '11', label: 'Leadership Team' },
                { number: '24/7', label: 'Collaboration' }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                >
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-2">
                    {stat.number}
                  </div>
                  <p className="text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
      <Footer />
    </Layout>
  );
};

export default Team;