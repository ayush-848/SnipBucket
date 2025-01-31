import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";


const UserSnippets = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editPost, setEditPost] = useState(null); // State to hold the post being edited
  const [updatedContent, setUpdatedContent] = useState(""); // State for updated post content
  const { user } = useContext(AuthContext);

  const truncateContent = (content, maxLines = 6) => {
    const lines = content.split("\n");
    return lines.slice(0, maxLines).join("\n");
  };

  useEffect(() => {
    const fetchPosts = async () => {
      if (!user) return;

      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/posts`, {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        setPosts(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user]);

  // Delete Post
  const handleDelete = async (postId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/posts/${postId}`, {
        withCredentials: true,
      });
      setPosts(posts.filter((post) => post.id !== postId)); // Remove deleted post from state
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting post");
    }
  };

  // Open Edit Modal
  const handleEdit = (post) => {
    setEditPost(post);
    setUpdatedContent(post.content);
  };

  // Save Edited Post
  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/posts/${editPost.id}`,
        { content: updatedContent },
        { withCredentials: true }
      );

      setPosts(posts.map((post) => (post.id === editPost.id ? { ...post, content: updatedContent } : post)));
      setEditPost(null); // Close edit modal
    } catch (err) {
      setError(err.response?.data?.message || "Error updating post");
    }
  };

  if (loading) return <p className="text-center text-gray-500 text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500 font-semibold">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <div className="w-full bg-gray-800 shadow-md">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="max-w-lg mx-auto p-6">
        <div className="bg-gray-800 shadow-md rounded-lg p-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="mb-6 border-b pb-4">
                <Link to={`/user/${post.id}`} className="hover:text-blue-400 transition-colors">
  {post.title}
</Link>

                <div className="px-6 flex-1 overflow-hidden">
        <div className="h-full rounded-lg">
          <SyntaxHighlighter
            language={post.tag.toLowerCase()}
            style={nightOwl}
            customStyle={{
              padding: '16px',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              background: 'rgb(1, 22, 39)',
              margin: 0,
              height: '100%',
              overflow: 'hidden'  // Changed from 'auto' to 'hidden'
            }}
            wrapLines={true}
            wrapLongLines={true}
          >
            {truncateContent(post.content)}
          </SyntaxHighlighter>
        </div>
      </div>
                <p className="text-sm text-gray-400 mt-2">Author: {post.author}</p>

                {/* Buttons */}
                <div className="mt-4 flex space-x-3">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded"
                    onClick={() => handleEdit(post)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center">No posts found.</p>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-3">Edit Post</h2>
            <textarea
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
              value={updatedContent}
              onChange={(e) => setUpdatedContent(e.target.value)}
            />
            <div className="mt-4 flex justify-end space-x-3">
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white px-3 py-1 rounded"
                onClick={() => setEditPost(null)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSnippets;
