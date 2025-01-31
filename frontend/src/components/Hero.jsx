import React from 'react';
import { Code, BookOpen, Share2, ArrowRight } from 'lucide-react';
import Typewriter from 'typewriter-effect';
import CodeShowcase from './CodeShowcase';

const Hero = () => {

  const features = [
    {
      icon: <Code className="h-8 w-8 text-blue-400" size={24} />,
      gradient: "from-blue-600 via-purple-600 to-indigo-600",
      iconBg: "bg-blue-900/30 border-blue-800/50",
      title: "Store Instantly",
      description: "Capture and save code snippets in seconds"
    },
    {
      icon: <BookOpen className="h-8 w-8 text-green-400" size={24} />,
      gradient: "from-green-600 via-cyan-600 to-blue-600",
      iconBg: "bg-green-900/30 border-green-800/50",
      title: "Organize Smartly",
      description: "Categorize with tags and languages"
    },
    {
      icon: <Share2 className="h-8 w-8 text-purple-400" size={24} />,
      gradient: "from-purple-600 via-pink-600 to-red-600",
      iconBg: "bg-purple-900/30 border-purple-800/50",
      title: "Share Easily",
      description: "Collaborate with team members"
    }
  ];



  return (
    <div className="bg-gradient-to-b from-gray-950 via-slate-900 to-gray-950 text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-12 overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:items-center mt-12">
        {/* Left Content */}
        <div className="space-y-6 pt-4 sm:pt-8">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
              <span className="block">Your Code Snippets</span>
              <span className="h-14 sm:h-16 block">
                <Typewriter
                  options={{
                    strings: ['Simplified', 'Readable', 'Sharable'],
                    autoStart: true,
                    loop: true,
                    delay: 60,
                    deleteSpeed: 30,
                  }}
                />
              </span>
            </h1>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 flex flex-col items-start space-y-2">
              <Code className="text-blue-400" size={24} />
              <h3 className="font-semibold text-white text-lg">Store Instantly</h3>
              <p className="text-gray-400 text-sm">
                Capture and save code snippets in seconds
              </p>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 flex flex-col items-start space-y-2">
              <BookOpen className="text-green-400" size={24} />
              <h3 className="font-semibold text-white text-lg">Organize Smartly</h3>
              <p className="text-gray-400 text-sm">
                Categorize with tags and languages
              </p>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 flex flex-col items-start space-y-2">
              <Share2 className="text-purple-400" size={24} />
              <h3 className="font-semibold text-white text-lg">Share Easily</h3>
              <p className="text-gray-400 text-sm">
                Collaborate with team members
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition flex items-center justify-center w-full sm:w-auto">
              Get Started <ArrowRight className="ml-2" size={20} />
            </button>
            <button className="border border-gray-700 text-gray-300 px-6 py-3 rounded-md hover:bg-gray-800 transition w-full sm:w-auto">
              View Demo
            </button>
          </div>
        </div>

        {/* Right Content - Interactive Code Showcase */}
        <div className="w-full h-auto mt-8 lg:mt-0">
          <CodeShowcase />
        </div>
      </div>
    </div>
  );
};

export default Hero;