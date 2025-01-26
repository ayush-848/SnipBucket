import React, { useState } from "react";
import axios from "axios";

const CreatePostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/posts`, {
        title,
        content: content.replace(/\n/g, "\\n"), // Escape newlines for code content
        tag,
      });

      // Clear the form after successful submission
      setTitle("");
      setContent("");
      setTag("");
      console.log("Post created:", response.data);
    } catch (err) {
      console.error("Error creating post:", err);
      setError("There was an error creating the post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 text-white rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-semibold mb-1">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 bg-gray-700 text-white rounded"
            placeholder="Enter the title of the code post"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-semibold mb-1">Code Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows="8"
            className="w-full px-4 py-2 bg-gray-700 text-white font-mono rounded"
            placeholder="Enter your code here..."
          />
        </div>

        <div className="mb-4">
          <label htmlFor="tag" className="block text-sm font-semibold mb-1">Tags</label>
          <input
            id="tag"
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            required
            className="w-full px-4 py-2 bg-gray-700 text-white rounded"
            placeholder="e.g., JavaScript, React, Python"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 text-white font-semibold rounded ${
            loading ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Creating Post..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePostForm;
