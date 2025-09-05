import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Github, Linkedin } from 'lucide-react';

interface TeamMember {
  avatar: string;
  name: string;
  role: string;
  linkedin?: string;
  github?: string;
}

// BVCodeVerse team members - you can replace with actual team photos
const TEAM_MEMBERS: TeamMember[] = [
  {
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    name: 'Arjun Sharma',
    role: 'Club President',
    linkedin: 'https://linkedin.com/in/arjun-sharma',
    github: 'https://github.com/arjunsharma'
  },
  {
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    name: 'Priya Patel',
    role: 'Technical Lead',
    linkedin: 'https://linkedin.com/in/priya-patel',
    github: 'https://github.com/priyapatel'
  },
  {
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
    name: 'Rahul Kumar',
    role: 'Web Development Head',
    linkedin: 'https://linkedin.com/in/rahul-kumar',
    github: 'https://github.com/rahulkumar'
  },
  {
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    name: 'Sneha Reddy',
    role: 'AI/ML Lead',
    linkedin: 'https://linkedin.com/in/sneha-reddy',
    github: 'https://github.com/snehareddy'
  },
  {
    avatar: 'https://images.unsplash.com/photo-1522556189639-b150ed9c4330?w=400&auto=format&fit=crop&q=80',
    name: 'Vikram Singh',
    role: 'Mobile App Lead',
    linkedin: 'https://linkedin.com/in/vikram-singh',
    github: 'https://github.com/vikramsingh'
  },
  {
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    name: 'Ananya Joshi',
    role: 'Events Coordinator',
    linkedin: 'https://linkedin.com/in/ananya-joshi',
    github: 'https://github.com/ananyajoshi'
  },
  {
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    name: 'Karthik Rao',
    role: 'DevOps Lead',
    linkedin: 'https://linkedin.com/in/karthik-rao',
    github: 'https://github.com/karthikrao'
  },
  {
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    name: 'Ishita Gupta',
    role: 'UI/UX Designer',
    linkedin: 'https://linkedin.com/in/ishita-gupta',
    github: 'https://github.com/ishitagupta'
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
      className={cn('p-6 rounded-xl overflow-hidden text-center', className)} 
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      whileHover={{ 
        scale: 1.05,
        y: -10,
        transition: { duration: 0.2 }
      }}
      {...props}
    >
      {/* Profile Image - Made Smaller */}
      <div className="relative mb-4">
        <motion.div
          className="w-24 h-24 mx-auto rounded-full overflow-hidden border-3 border-gradient-to-r from-cyan-400 to-purple-500"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={member.avatar}
            alt={member.name}
            width={96}
            height={96}
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Glow effect around image */}
        <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-500/20 blur-md -z-10"></div>
      </div>

      {/* Member Info */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-white">{member.name}</h3>
        <p className="text-cyan-400 font-medium text-sm">{member.role}</p>
      </div>

      {/* Social Media Icons */}
      <div className="flex justify-center space-x-4 mt-4">
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
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                Meet Our{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400">
                  Team
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                Passionate developers, designers, and innovators driving BVCodeVerse forward
              </p>
            </motion.div>
          </div>
        </section>

        {/* Team Grid */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {TEAM_MEMBERS.map((member, index) => (
                <TeamCard
                  className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 relative"
                  key={index}
                  member={member}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Static team info section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                { number: '50+', label: 'Core Members' },
                { number: '10+', label: 'Leadership Team' },
                { number: '24/7', label: 'Collaboration' }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-2">
                    {stat.number}
                  </div>
                  <p className="text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Team;