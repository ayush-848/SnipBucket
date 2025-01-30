import React, { useEffect, useState } from "react";
import axios from "axios";
import SnippetCard from "./SnippetCard";

const SnippetShowcase = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts`);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xl text-gray-400">Loading posts...</span>
        </div>
      </div>
    );
  }

  const topLikedPosts = posts
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 6);

  return (
    <section className="bg-gray-950 text-white py-12 sm:py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <header className="mb-8 sm:mb-16 text-center px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Check out some snippets below
          </h2>
          <p className="text-gray-400 text-base sm:text-lg md:text-xl">
            Explore the most liked snippets
          </p>
        </header>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 px-4 sm:px-8 lg:px-12">
          {topLikedPosts.map((post) => (
            <div 
              key={post.id}
              className="w-full"
            >
              <SnippetCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SnippetShowcase;