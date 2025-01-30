import React from 'react';
import { Code, Paintbrush, Share } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Code,
      title: "Create",
      description: "Write or paste your code snippet with syntax highlighting.",
    },
    {
      icon: Paintbrush,
      title: "Customize",
      description: "Choose from beautiful themes and personalize your snippet.",
    },
    {
      icon: Share,
      title: "Share",
      description: "Get a unique URL and share with anyone, anywhere.",
    }
  ];

  return (
    <div className="bg-gradient-to-b from-gray-950 via-slate-900 to-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center py-12">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 sm:mb-24 tracking-tight relative">
          How{' '}
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-600">
            SnipBucket Works
            <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-indigo-400 to-blue-600 opacity-70 rounded-full" />
          </span>
        </h2>

        {/* Mobile-optimized layout */}
        <div className="flex flex-col sm:flex-row sm:justify-center items-center sm:items-start gap-8 sm:gap-4 relative">
          {/* Timeline Line - Hidden on mobile, visible on desktop */}
          <div className="hidden sm:block absolute top-8 left-[15%] right-[15%]">
            <div className="absolute inset-0 h-[3px] bg-indigo-700 opacity-70 rounded-full" />
            <div className="absolute inset-0 h-[3px] bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-600 animate-pulse" />
            <div className="absolute inset-0 h-[3px] bg-indigo-500 blur-md opacity-50" />
          </div>

          {/* Steps */}
          {features.map((feature, index) => (
            <div key={feature.title} className="w-full sm:flex-1 relative px-4 group">
              {/* Vertical connector line on mobile */}
              {index < features.length - 1 && (
                <div className="sm:hidden absolute left-1/2 bottom-0 transform -translate-x-1/2 w-[3px] h-8 bg-indigo-600 opacity-70" />
              )}

              {/* Icon Container */}
              <div className="relative">
                <div className="w-16 h-16 mx-auto bg-gray-800 backdrop-blur-md rounded-full border-4 border-indigo-600 flex items-center justify-center mb-6 transition-all duration-300 group-hover:border-indigo-400 group-hover:scale-110 shadow-lg">
                  <div className="absolute inset-0 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-lg" />
                  <feature.icon className="w-8 h-8 text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300" />
                </div>
              </div>

              {/* Card Container */}
              <div className="relative group-hover:scale-105 transition-transform duration-300 mb-8 sm:mb-0">
                <div className="bg-gray-850 bg-opacity-80 p-6 rounded-2xl shadow-xl backdrop-blur-lg border border-gray-700 hover:border-indigo-500 transition-all duration-300">
                  <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 group-hover:text-indigo-300 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm max-w-[260px] mx-auto leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;