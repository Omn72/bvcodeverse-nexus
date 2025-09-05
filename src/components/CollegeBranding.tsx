import React from 'react';

const CollegeBranding = () => {
  return (
    <section className="relative py-16 bg-black border-t border-gray-800">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          {/* College Logo */}
          <div className="relative">
            <img 
              src="https://bvcoe.bharatividyapeeth.edu/media/images/bvcoe_logo_3.png" 
              alt="Bharati Vidyapeeth College Of Engineering Logo" 
              className="w-40 h-40 mx-auto object-contain"
            />
          </div>

          {/* College Name */}
          <div className="space-y-2">
            <p className="text-xl text-gray-300 font-semibold">
              Coding Hub from
            </p>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Bharati Vidyapeeth College Of Engineering
            </h2>
            <p className="text-gray-400 text-lg">
              Lavale, Pune
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollegeBranding;
