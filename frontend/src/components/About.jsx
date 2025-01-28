import React from 'react';
import { Code, Paintbrush, Share } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Code,
      title: "Create",
      description: "Write or paste your code snippet with syntax highlighting",
    },
    {
      icon: Paintbrush,
      title: "Customize",
      description: "Choose from beautiful themes and customize your code",
    },
    {
      icon: Share,
      title: "Share",
      description: "Get a unique URL and share with anyone, anywhere",
    }
  ];

  return (
    <div className=" bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Title */}
        <h2 className="text-5xl font-bold text-white mb-24 tracking-tight">
          How{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-blue-950 bg-clip-text text-transparent">
            It Works
          </span>
        </h2>

        {/* Timeline Container */}
        <div className="flex justify-center items-start relative">
          {/* Timeline Line with stronger visibility */}
          <div className="absolute top-8 left-[20%] right-[20%] flex">
            {/* Solid base line */}
            <div className="absolute inset-0 h-[2px] bg-indigo-600" />
            {/* Gradient overlay */}
            <div className="absolute inset-0 h-[2px] bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-600" />
            {/* Glow effect */}
            <div className="absolute inset-0 h-[2px] bg-indigo-400 blur-sm opacity-30" />
          </div>
          
          {/* Steps */}
          <div className="flex justify-between w-full max-w-4xl relative">
            {features.map((feature, index) => (
              <div key={feature.title} className="flex-1 relative px-4 group">
                {/* Icon Container with stronger border */}
                <div className="relative">
                  <div className="w-16 h-16 mx-auto bg-gray-800 rounded-full border-4 border-indigo-600 flex items-center justify-center mb-4 transition-all duration-300 group-hover:border-indigo-400 group-hover:scale-110">
                    {/* Enhanced Glow Effect */}
                    <div className="absolute inset-0 rounded-full bg-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    <feature.icon className="w-7 h-7 text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300" />
                  </div>
                  {/* Connection point dot */}
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-indigo-400" />
                </div>

                {/* Text Content */}
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-indigo-300 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm max-w-[250px] mx-auto leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;