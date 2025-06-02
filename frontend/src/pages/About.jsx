import React from 'react';
import '../App.css';
import Navbar from '../components/Navbar';

const About = () => (
  <>
    <Navbar />
    <div className="bg-gradient-to-b from-gray-950 via-slate-900 to-gray-950 text-white min-h-screen py-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-3xl mx-auto bg-gray-900 rounded-xl border border-gray-800 shadow-lg p-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-blue-400">About SnipBucket</h1>
        <p className="text-gray-300 text-lg mb-6">
          SnipBucket is your go-to platform for sharing, discovering, and managing code snippets.
          Whether you're a developer looking to showcase your work or searching for inspiration,
          SnipBucket makes it easy to explore and contribute to a vibrant coding community.
        </p>
        <ul className="mb-6 space-y-3">
          <li className="flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-blue-400 mr-3"></span>
            <span className="text-white">Store your favorite code snippets instantly</span>
          </li>
          <li className="flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-3"></span>
            <span className="text-white">Organize with tags and languages</span>
          </li>
          <li className="flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-purple-400 mr-3"></span>
            <span className="text-white">Share and collaborate with others</span>
          </li>
        </ul>
        <p className="text-gray-400">
          Join us and make coding more collaborative and fun!
        </p>
      </div>
    </div>
  </>
);

export default About;