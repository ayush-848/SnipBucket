import React from 'react'
import Navbar from '../components/Navbar';


const SkeletonLoader = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <Navbar />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8 animate-pulse">
          <div className="h-5 w-24 bg-gray-800 rounded-full"></div>
        </div>
  
        <div className="bg-gray-900/40 backdrop-blur-2xl rounded-3xl border border-gray-800/50 shadow-2xl overflow-hidden">
          <div className="px-10 py-8 border-b border-gray-800/50">
            <div className="h-10 bg-gray-800 rounded-xl w-3/4 mb-6"></div>
            <div className="flex space-x-6">
              <div className="h-9 bg-gray-800 rounded-lg w-32"></div>
              <div className="h-9 bg-gray-800 rounded-lg w-32"></div>
              <div className="h-9 bg-gray-800 rounded-lg w-32"></div>
            </div>
          </div>
  
          <div className="p-10">
            <div className="h-96 bg-gray-800 rounded-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-900/50 to-transparent animate-shimmer" />
            </div>
          </div>
  
          <div className="px-10 pb-8">
            <div className="flex justify-between">
              <div className="flex space-x-4">
                <div className="h-12 bg-gray-800 rounded-xl w-32"></div>
                <div className="h-12 bg-gray-800 rounded-xl w-32"></div>
              </div>
              <div className="h-12 bg-gray-800 rounded-xl w-32"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  export default SkeletonLoader;