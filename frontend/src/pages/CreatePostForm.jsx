import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Editor as MonacoEditor } from "@monaco-editor/react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { handleError, handleSuccess } from '../utils/messageHandler';

const CreatePostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("javascript");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const languageOptions = [
    "javascript", "python", "java", "ruby", "go", "c", "cpp",
    "html", "css", "sql", "typescript", "react", "node",
  ];

  // Fetch user data from protected route
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/protected`,
          {
            withCredentials: true,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.data.success) {
          setUserData(response.data.user);
        } else {
          handleError('Failed to fetch user data');
          navigate('/login');
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        handleError('Authentication required');
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userData) {
      handleError('Please login to create a post');
      navigate('/login');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/create`,
        {
          title,
          content,
          tag: String(tag),
          username: userData.username || userData.email // Fallback to email if username is not available
        },
        {
          withCredentials: true,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.data.success) {
        handleSuccess('Post created successfully!');
        setTitle("");
        setContent("");
        setTag("javascript");
        navigate('/');
      } else {
        handleError('Failed to create post');
      }
    } catch (err) {
      console.error("Error creating post:", err);
      if (err.response?.status === 403) {
        handleError('Please login to create a post');
        navigate('/login');
      } else {
        handleError(err.response?.data?.message || 'An error occurred while creating the post');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!userData) {
    return null; // Don't render the form if user data hasn't been fetched
  }

  return (
    <div className="bg-gray-950 min-h-screen">
      <Navbar />
      <div className="max-w-md mx-auto p-6 bg-gray-800 text-white rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>
        {userData && (
          <p className="text-gray-300 mb-4">
            Posting as: {userData.username || userData.email}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-semibold mb-1">
              Title
            </label>
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
            <label htmlFor="content" className="block text-sm font-semibold mb-1">
              Code Content
            </label>
            <MonacoEditor
              height="300px"
              language={tag}
              theme="vs-dark"
              value={content}
              onChange={setContent}
              options={{
                selectOnLineNumbers: true,
                wordWrap: "on",
                minimap: { enabled: false },
                automaticLayout: true,
              }}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="tag" className="block text-sm font-semibold mb-1">
              Tags
            </label>
            <select
              id="tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white rounded"
            >
              {languageOptions.map((language) => (
                <option key={language} value={language}>
                  {language.charAt(0).toUpperCase() + language.slice(1)}
                </option>
              ))}
            </select>
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
    </div>
  );
};

export default CreatePostForm;