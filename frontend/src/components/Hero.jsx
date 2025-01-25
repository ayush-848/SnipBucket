import React, { useState } from 'react';
import bg from '../assets/result.svg';
import Navbar from './Navbar';
import { FaSearch, FaCode, FaShareAlt, FaClipboardList } from 'react-icons/fa';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for: ", searchQuery);
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-black opacity-30"></div> 
      
      <Navbar />
      
      {/* Hero content */}
      <div className="relative z-10 text-center text-white flex flex-col items-center justify-center h-full px-6 mt-20">
        {/* Dynamic Tagline */}
        <h1 className="text-4xl md:text-5xl font-semibold mb-8 tracking-tight leading-tight md:leading-snug">
          Your Code, Your Way
        </h1>

        {/* Short Descriptive Text */}
        <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed md:leading-tight" >
          Snipbucket is here to make your code snippets always accessible, organized, and easy to share — no matter where you are.
        </p>

        {/* Big Responsive Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative w-full max-w-4xl mb-10">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for your code snippets..."
            className="w-full py-4 px-6 text-lg rounded-lg bg-gray-800 text-white border-2 border-transparent focus:border-[#560090] focus:outline-none"
          />
          <button type="submit" className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <FaSearch className="text-[#560090] text-2xl" />
          </button>
        </form>

        {/* Features with Icons */}
        <div className="flex space-x-12 mt-8 mb-12 text-white justify-center">
          <div className="flex flex-col items-center">
            <FaCode className="text-3xl mb-4" />
            <p className="text-lg">Store & Organize</p>
          </div>
          <div className="flex flex-col items-center">
            <FaShareAlt className="text-3xl mb-4" />
            <p className="text-lg">Share with Ease</p>
          </div>
          <div className="flex flex-col items-center">
            <FaClipboardList className="text-3xl mb-4" />
            <p className="text-lg">Access Anywhere</p>
          </div>
        </div>

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
