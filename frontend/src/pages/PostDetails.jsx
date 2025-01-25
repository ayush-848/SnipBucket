import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const PostDetails = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        setError("Error fetching post details. Please try again.");
        console.error("Error fetching post details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Post link copied to clipboard!");
  };

  const handleDownload = () => {
    const blob = new Blob([post.content], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${post.title}.txt`;
    link.click();
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(post.content);
    alert("Post content copied to clipboard!");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-center text-gray-500 text-xl">Loading post...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-center text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-center text-red-500 text-xl">Post not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-900 text-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold mb-4">{post.title}</h1>
      <p className="text-lg text-gray-300 mb-6">{post.content}</p>

      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-500">By: <span className="text-gray-300">{post.username}</span></p>
        <p className="text-gray-500">Tags: 
          {post.tag ? (
            <span className="text-gray-300">{post.tag}</span>
          ) : (
            <span className="text-gray-500">No tags</span>
          )}
        </p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-500">Likes: <span className="text-gray-300">{post.likes}</span></p>
        <p className="text-gray-500">Views: <span className="text-gray-300">{post.views}</span></p>
      </div>

      <div className="flex justify-center space-x-4 mt-6">
        <button
          onClick={handleShare}
          className="py-2 px-6 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition duration-300"
        >
          Share Post
        </button>

        <button
          onClick={handleDownload}
          className="py-2 px-6 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition duration-300"
        >
          Download Post
        </button>

        <button
          onClick={handleCopyCode}
          className="py-2 px-6 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300"
        >
          Copy Content
        </button>
      </div>

      <div className="mt-6 text-center">
        <Link
          to="/"
          className="inline-block py-2 px-6 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition duration-300"
        >
          Back to Posts
        </Link>
      </div>
    </div>
  );
};

export default PostDetails;
