import React, { useEffect, useState } from "react";
import axios from "axios";
import SnippetCard from "../components/SnippetCard";
import Navbar from "../components/Navbar";

const Explore = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/posts`
        );
        console.log("Fetched posts:", response.data); // Debug: See what you get
        // Only public posts
        const publicPosts = response.data.filter(
          (post) => post.visibility === "public"
        );
        // Sort by likes descending
        const sorted = publicPosts.slice().sort((a, b) => b.likes - a.likes);
        setPosts(sorted);
        setFilteredPosts(sorted); // Show all by default
      } catch (error) {
        setPosts([]);
        setFilteredPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredPosts(posts);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(term) ||
          (post.tag && post.tag.toLowerCase().includes(term))
      );
      setFilteredPosts(filtered);
    }
  }, [searchTerm, posts]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Explore Snippets
        </h1>
        {/* Search Box */}
        <div className="flex flex-col items-center mb-10">
          <input
            type="text"
            placeholder="Search by title or tag..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 text-lg placeholder-gray-400 bg-white"
            // Added placeholder-gray-400 and bg-white for better visibility
          />
        </div>
        {loading ? (
          <div className="text-center text-gray-400">Loading...</div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center text-gray-400">No results found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <SnippetCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
