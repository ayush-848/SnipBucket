import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Editor as MonacoEditor } from "@monaco-editor/react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { handleError, handleSuccess } from '../utils/messageHandler';
import { ArrowLeftIcon, CheckCircleIcon, ChevronDownIcon, SparklesIcon } from "@heroicons/react/24/outline";


const CreatePostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("javascript");
  const [loading, setLoading] = useState(false);
  const [visibility, setVisibility] = useState('public');
  const [generatingTitle, setGeneratingTitle] = useState(false);
  const [generatedTitle, setGeneratedTitle] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const languageOptions = [
    "javascript", "python", "java", "ruby", "go", "c", "cpp",
    "html", "css", "sql", "typescript", "react",
  ];

  const generateTitle = async () => {
    if (!content) {
      handleError("Please add content first to generate a title.");
      return;
    }
    setGeneratingTitle(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/generate-title`,
        { codeSnippet: content },
        {
          withCredentials: true,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        setGeneratedTitle(response.data.title);
        setTitle(response.data.title);
      } else {
        handleError(response.data.error);
      }
    } catch (err) {
      console.error("Error generating title:", err);
      handleError('An error occurred while generating the title');
    } finally {
      setGeneratingTitle(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
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
          username: user.username,
          visibility:visibility
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
        setGeneratedTitle(null);
        setTimeout(() => {
          navigate("/"); 
        }, 2000);
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

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden">
      {/* Enhanced Premium Dark Background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-r from-blue-900/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-gradient-to-l from-blue-900/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-soft-light" />
      </div>

      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Animated Header */}
        <div className="mb-20 text-center space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-gray-200 animate-text-shine">
            Craft New Snippet
          </h1>
          <p className="text-xl text-gray-400 font-light">
            Share your technical mastery with the developer elite
          </p>
        </div>

        {/* Glassmorphic Form Container */}
        <div className="bg-gray-900/40 backdrop-blur-2xl rounded-3xl border border-gray-800/50 shadow-2xl overflow-hidden transform transition-all hover:shadow-3xl">
          {/* User Status Ribbon */}
          {user && (
            <div className="px-8 py-4 border-b border-gray-800/50 bg-gradient-to-r from-gray-900/60 to-gray-900/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse ring-4 ring-green-300/30" />
                    <div className="absolute inset-0 rounded-full bg-blue-500/30 animate-ping" />
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-300">
                      Authoring as 
                    </span>
                    <div className="flex items-center space-x-2 bg-gray-800/50 px-3 py-1.5 rounded-lg">
                      <span className="text-green-500 font-semibold">{user.username}</span>
                      <span className="text-gray-500">|</span>
                      <span className="text-gray-400 text-sm">Senior Developer</span>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-blue-400 font-medium bg-gray-900/50 px-3 py-1.5 rounded-lg">
                  {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit'
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-10 space-y-10">
            {/* Title Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  Snippet Title
                </label>
                <button
                  type="button"
                  onClick={generateTitle}
                  disabled={generatingTitle || generatedTitle || !content}
                  className={`inline-flex items-center space-x-3 px-5 py-2.5 rounded-xl border transition-all 
                    ${generatingTitle || generatedTitle || !content
                      ? 'border-blue-400 text-gray-200 bg-transparent cursor-not-allowed'
                      : 'border-blue-500/30 text-blue-400 hover:bg-blue-500/10 hover:border-blue-500/50 hover:shadow-blue-500/10 hover:cursor-pointer'
                    }`}
                >
                  {generatingTitle ? (
                    <>
                      <div className="flex space-x-2 items-center">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" />
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-100" />
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-200" />
                      </div>
                      <span className="text-sm font-medium">Crafting Title...</span>
                    </>
                  ) : generatedTitle ? (
                    <div className="flex items-center space-x-2 text-emerald-400">
                      <CheckCircleIcon className="w-5 h-5" />
                      <span className="text-sm font-medium">Title Perfected</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <SparklesIcon className="w-5 h-5 text-blue-400" />
                      <span className="text-sm font-medium">Enhance with AI</span>
                    </div>
                  )}
                </button>
              </div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-8 py-3 bg-gray-900/50 border-2 border-gray-800/50 rounded-2xl text-xl font-medium text-gray-200
                         focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 placeholder-gray-600
                         hover:border-gray-700 transition-all duration-300 shadow-inner"
                placeholder="Advanced Asynchronous Pattern Implementation in TypeScript..."
                required
              />
            </div>

            {/* Code Editor Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  Your Snippet Code
                </label>
                <div className="text-sm text-green-600 font-mono bg-gray-900/50 px-3 py-1.5 rounded-lg">
                  {`${tag.toUpperCase()} MODE`}
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden border-2 border-gray-800/50 shadow-xl hover:border-blue-500/30 transition-all">
                <MonacoEditor
                  height="600px"
                  language={tag}
                  theme="vs-dark"
                  value={content}
                  onChange={setContent}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 15,
                    lineHeight: 26,
                    fontLigatures: true,
                    fontFamily: 'JetBrains Mono, Menlo, Monaco, Consolas, monospace',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    padding: { top: 25, bottom: 25 },
                    renderLineHighlight: 'line',
                    guides: { indentation: true },
                    smoothScrolling: true,
                    mouseWheelZoom: true
                  }}
                />
              </div>
            </div>

            {/* Language & Visibility Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  Primary Technology
                </label>
                <div className="relative group">
                  <select
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    className="w-full px-8 py-5 bg-gray-900/50 border-2 border-gray-800/50 rounded-2xl text-gray-300 
                             appearance-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500
                             hover:border-gray-700 transition-all duration-300 shadow-inner"
                  >
                    {languageOptions.map((lang) => (
                      <option 
                        key={lang} 
                        value={lang}
                        className="bg-gray-900 text-gray-100"
                      >
                        {lang.charAt(0).toUpperCase() + lang.slice(1)}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none">
                    <ChevronDownIcon className="w-6 h-6 text-gray-500 group-hover:text-blue-400 transition-colors" />
                  </div>
                </div>
              </div>
              
              {/* Visibility Section */}
              <div className="space-y-6">
                <label className="block text-sm font-semibold text-gray-400 tracking-wider">
                  Post Visibility:- <span className="text-green-600">{visibility}</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
      {['public', 'private'].map((vis) => (
        <button
          key={vis}
          type="button"
          onClick={() => setVisibility(vis)}
          className={`px-6 py-3 text-center rounded-xl cursor-pointer border-2 transition-all
            ${visibility === vis
              ? 'border-blue-500 bg-blue-500/20 text-blue-500 font-semibold' // Active state styles
              : 'border-gray-300 text-gray-500' // Inactive state styles
            }`}
        >
          {vis}
        </button>
      ))}
    </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-12 border-t border-gray-800/50">
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-10 py-4 rounded-2xl font-medium text-gray-400 hover:text-gray-300 hover:bg-gray-900/50 transition-all flex items-center space-x-3"
                >
                  <ArrowLeftIcon className="w-5 h-5" />
                  <span>Return to Dashboard</span>
                </button>
                <div className="flex items-center space-x-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`px-12 py-4 rounded-2xl font-semibold transition-all relative overflow-hidden group
                      ${loading 
                        ? 'bg-blue-600/30 text-blue-300 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-600/80 hover:to-blue-700/80 text-white shadow-2xl hover:shadow-blue-500/30'
                      }`}
                  >
                    <span className="relative z-10 flex items-center space-x-3">
                      {loading && (
                        <div className="flex space-x-1.5">
                          <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                          <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-100" />
                          <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-200" />
                        </div>
                      )}
                      <span>{loading ? 'Finalizing Publication...' : 'Publish'}</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );


};

export default CreatePostForm;
