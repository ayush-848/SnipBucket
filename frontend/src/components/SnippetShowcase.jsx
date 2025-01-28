import React, { useEffect, useState } from "react";
import axios from "axios";
import SnippetCard from "./SnippetCard"; // Import SnippetCard component

const SnippetShowcase = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts from the API
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

  // Loading state while posts are being fetched
  if (loading) {
    return (
      <div className="text-center text-gray-500">
        <span className="text-xl">Loading posts...</span>
      </div>
    );
  }

  // Sort posts by likes in descending order and take top 6
  const topLikedPosts = posts
    .sort((a, b) => b.likes - a.likes) // Sort in descending order by likes
    .slice(0, 6); // Get the top 6 liked posts

  return (
    <div className=" bg-gray-950 text-white py-12 ">
      {/* Section Header */}
      <header className="mb-12 text-center mt-36">
        <h2 className="text-5xl font-bold text-white">Check out some snippets below</h2>
        <p className="text-gray-400 mt-2 text-lg">Explore the most liked snippets</p>
      </header>

      {/* Grid Layout for Displaying Snippet Cards */}
      <div className="items-center mx-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-12 mx-auto px-6">
          {topLikedPosts.map((post) => (
            <div className="w-full" key={post.id}>
              <SnippetCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SnippetShowcase;
