import React from 'react';
import { Code, BookOpen, Share2, ArrowRight } from 'lucide-react';
import Typewriter from 'typewriter-effect';
import CodeShowcase from './CodeShowCase';

const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-gray-950 via-slate-900 to-gray-950 text-white py-12 px-6 sm:px-8 lg:px-12 overflow-hidden min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
              Your Code Snippets
              <Typewriter
                options={{
                  strings: ['Simplified', 'Readable', 'Sharable'],
                  autoStart: true,
                  loop: true,
                  delay: 60,
                  deleteSpeed: 30,
                }}
              />
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300">
              Revolutionize how you store, organize, and share code across your projects and team.
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 flex flex-col items-start space-y-2">
              <Code className="text-blue-400" size={28} />
              <h3 className="font-semibold text-white">Store Instantly</h3>
              <p className="text-gray-400 text-sm">
                Capture and save code snippets in seconds
              </p>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 flex flex-col items-start space-y-2">
              <BookOpen className="text-green-400" size={28} />
              <h3 className="font-semibold text-white">Organize Smartly</h3>
              <p className="text-gray-400 text-sm">
                Categorize with tags and languages
              </p>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 flex flex-col items-start space-y-2">
              <Share2 className="text-purple-400" size={28} />
              <h3 className="font-semibold text-white">Share Easily</h3>
              <p className="text-gray-400 text-sm">
                Collaborate with team members
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition flex items-center justify-center">
              Get Started <ArrowRight className="ml-2" size={20} />
            </button>
            <button className="border border-gray-700 text-gray-300 px-6 py-3 rounded-md hover:bg-gray-800 transition">
              View Demo
            </button>
          </div>
        </div>

        {/* Right Content - Interactive Code Showcase */}
        <div className="w-full h-auto">
          <CodeShowcase />
        </div>
      </div>
    </div>
  );
};

export default Hero;
