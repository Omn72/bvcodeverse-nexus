import React, { useState } from 'react';

const AboutUs = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="relative py-16 bg-black text-white">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 text-center">
        {/* About Us Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
          About Us
        </h2>

        {/* Logos Side by Side */}
        <div className="flex justify-center items-center space-x-6 mb-6">
          <img 
            src="https://bvcoe.bharatividyapeeth.edu/media/images/bvcoe_logo_3.png" 
            alt="Bharati Vidyapeeth College Of Engineering Logo" 
            className="w-40 h-40 object-contain"
          />
          <img 
            src="/logo.png" 
            alt="BV CodeVerse Club Logo" 
            className="w-48 h-48 object-contain"
          />
        </div>

        {/* About Us Content */}
        <div className="px-4 mx-auto max-w-4xl">
          <p className="text-lg text-gray-300 mb-4">
            BV CodeVerse is the official coding club of the Computer Engineering Department, Bharati Vidyapeeth College of Engineering, Lavale, Pune. With the motto of nurturing a strong coding culture, we focus on collaboration and growth through diverse domains like Open Source, Web and App Development, Graphics, Game Development, and more.
          </p>
          {isExpanded && (
            <>
              <p className="text-lg text-gray-300 mb-4">
                We organize workshops, events, hackathons, coding sessions, and hands-on tutorials, while also providing mentorship from seniors and guidance from industry experts. This ensures that students not only learn but also gain real-world exposure and practical experience.
              </p>
              <p className="text-lg text-gray-300">
                While many students at our institute are already excelling, BV CodeVerse helps them go further by offering structured guidance, peer-to-peer learning, and opportunities to showcase their skills. Our purpose is to provide an official platform that empowers students, helps them surpass their boundaries, and builds a healthier, more connected, and productive network.
              </p>
            </>
          )}
          <button 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="mt-4 text-primary underline focus:outline-none"
          >
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
