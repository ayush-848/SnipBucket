import React, { useEffect, useState } from "react";
import axios from "axios";
import SnippetCard from "./SnippetCard"; // Import SnippetCard

const SnippetShowcase = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts from the API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts`);
        setPosts(response.data); // Save posts to state
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Loading state
  if (loading) {
    return <p className="text-center text-gray-500">Loading posts...</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {posts.map((post) => (
        // Pass the post data as props to SnippetCard
        <SnippetCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default SnippetShowcase;
