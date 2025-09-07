import Layout from '@/components/Layout';
import Footer from '@/components/Footer';
import { motion, useMotionValue } from 'framer-motion';
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
}: React.ComponentProps<typeof motion.div> & { member: TeamMember; index: number }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // 3D tilt motion values
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width) * 2 - 1; // -1 to 1
    const py = (y / rect.height) * 2 - 1; // -1 to 1
    const max = 12; // max tilt in degrees
    rotateX.set(-py * max);
    rotateY.set(px * max);
  };

  const handleMouseLeave: React.MouseEventHandler<HTMLDivElement> = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

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
        scale: 0.5,
        rotateY: -180
      }}
      animate={{ 
        opacity: 1,
        scale: 1,
        rotateY: 0
      }}
      transition={{ 
        duration: 0.8, 
        delay: 0.2 + (index * 0.1),
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ 
        scale: 1.08,
        y: -15,
        rotateX: 5,
        transition: { 
          duration: 0.3,
          type: "spring",
          stiffness: 300
        }
      }}
      whileTap={{ scale: 0.95 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' as const }}
      {...props}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-md rounded-xl" style={{ transform: 'translateZ(-40px)' }}></div>
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-purple-500/5 rounded-xl" style={{ transform: 'translateZ(-60px)' }}></div>
      
      {/* Profile Image */}
    <div className="relative mb-4" style={{ transform: 'translateZ(30px)' }}>
        <motion.div
          className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-white/30 shadow-lg relative bg-gray-800 group hover:cursor-pointer"
          whileHover={{ 
            rotate: 5,
            boxShadow: "0 0 30px rgba(34, 211, 238, 0.3)"
          }}
          transition={{ duration: 0.3 }}
      style={{ transformStyle: 'preserve-3d' as const }}
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
              className={`w-full h-full object-cover transform scale-125 hover:scale-[1.9] transition duration-300 ease-out will-change-transform ${
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
        
        {/* 3D Rotating Glow */}
        <motion.div 
          className="absolute inset-0 w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-500/20 blur-md -z-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          style={{ transform: 'translateZ(-20px)' }}
        ></motion.div>
      </div>

      {/* Member Info with Enhanced Animations */}
      <motion.div 
        className="relative z-10 space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 + (index * 0.1), duration: 0.5 }}
        style={{ transform: 'translateZ(20px)' }}
      >
        <motion.h3 
          className="text-lg font-semibold text-white"
          whileHover={{ scale: 1.05 }}
        >
          {member.name}
        </motion.h3>
        <motion.p 
          className="text-cyan-400 font-medium text-sm leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 + (index * 0.1), duration: 0.5 }}
        >
          {member.role}
        </motion.p>
      </motion.div>

      {/* Social Media Icons with Enhanced Animations */}
      <motion.div 
        className="relative z-10 flex justify-center space-x-3 mt-4"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 + (index * 0.1), duration: 0.4, type: "spring" }}
        style={{ transform: 'translateZ(25px)' }}
      >
        {member.linkedin && (
          <motion.a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-gray-800/50 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 transition-all duration-300 relative overflow-hidden"
            whileHover={{ 
              scale: 1.3, 
              rotate: 10,
              boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)"
            }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className="absolute inset-0 bg-blue-400/20 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <Linkedin className="w-4 h-4 relative z-10" />
          </motion.a>
        )}
        {member.github && (
          <motion.a
            href={member.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-300 relative overflow-hidden"
            whileHover={{ 
              scale: 1.3, 
              rotate: -10,
              boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)"
            }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className="absolute inset-0 bg-white/10 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <Github className="w-4 h-4 relative z-10" />
          </motion.a>
        )}
      </motion.div>

      {/* Hover border effect */}
      <motion.div
        className="absolute inset-0 rounded-xl border-2 border-transparent"
        whileHover={{
          borderColor: "rgba(34, 211, 238, 0.3)",
        }}
        transition={{ duration: 0.3 }}
        style={{ transform: 'translateZ(10px)' }}
      />
    </motion.div>
  );
}

const Team = () => {
  // Floating particles animation
  const FloatingParticles = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -80, -20],
              x: [-10, 10, -10],
              opacity: [0.4, 0.8, 0.4],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <Layout>
      <div className="min-h-screen bg-black relative">
        <FloatingParticles />
        
        {/* Hero Section */}
        <section className="py-20 px-4 relative">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            >
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
              >
                Meet Our{' '}
                <motion.span 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400"
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  style={{ backgroundSize: "200% 200%" }}
                >
                  Team
                </motion.span>
              </motion.h1>
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

          {/* Animated background elements */}
          <motion.div
            className="absolute top-20 left-10 w-16 h-16 border border-cyan-400/20 rounded-full"
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-12 h-12 border border-purple-500/20 rounded-full"
            animate={{ 
              rotate: -360,
              scale: [1, 0.8, 1],
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
        </section>

        {/* Team Grid with Enhanced Animations */}
        <motion.section 
          className="py-20 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {TEAM_MEMBERS.map((member, index) => (
                <motion.div
                  key={`${member.name}-${index}`}
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.8 + (index * 0.1),
                    type: "spring",
                    stiffness: 100
                  }}
                  style={{ perspective: 1000 }}
                >
                  <TeamCard
                    className="bg-black/20 backdrop-blur-lg border border-white/10 relative shadow-xl hover:shadow-2xl hover:shadow-cyan-400/10 transition-all duration-300"
                    member={member}
                    index={index}
                  />
                </motion.div>
              ))}
            </motion.div>
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