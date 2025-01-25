import React from 'react';
import bg from '../assets/result.svg';
import Navbar from './Navbar';


const Hero = () => {
  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-black opacity-30"></div> 
      
      <Navbar />
      
      {/* Hero content */}
      <div className="relative z-10 text-center text-white flex flex-col items-center justify-center h-full px-6 font-montserrat">
        <h1 className="text-4xl md:text-5xl font-semibold mb-8 tracking-tight leading-tight md:leading-snug">
        Get, Share, and Access Your Code Snippets Anywhere
        </h1>
        <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed md:leading-loose">
          Snipbucket helps you save time by keeping all your code snippets in one secure, accessible place.
        </p>
        
        {/* Call to Action Buttons */}
        <div className="flex space-x-6 mt-8">
          {/* Primary Button */}
          <button className="bg-[#560090] hover:bg-[#4e006b] text-white py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 hover:cursor-pointer">
            Get Started – It’s Free!
          </button>
          
          {/* Secondary Button */}
          <button className="border-2 border-white text-white py-3 px-8 rounded-lg transition duration-300 hover:bg-white hover:text-[#560090] transform hover:scale-105 hover:cursor-pointer">
            Watch Demo
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
