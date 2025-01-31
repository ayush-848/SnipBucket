import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { 
  Share2Icon, 
  DownloadIcon, 
  ArrowLeftIcon,
  CopyIcon,
  CodeIcon,
  CalendarIcon,
  UserIcon,
  EyeIcon,
  ThumbsUpIcon
} from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import Navbar from "../components/Navbar";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copyButtonText, setCopyButtonText] = useState("Copy Code");
  const [minimumLoadTimePassed, setMinimumLoadTimePassed] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const handleDownload = () => {
    const blob = new Blob([post.content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${post.title}.txt`;
    link.click();
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(post.content);
    setCopyButtonText("Copied!");
    setTimeout(() => setCopyButtonText("Copy Code"), 2000);
  };

  

  const SkeletonLoader = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <Navbar />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8 animate-pulse">
          <div className="h-5 w-24 bg-gray-800 rounded-full"></div>
        </div>
  
        <div className="bg-gray-900/40 backdrop-blur-2xl rounded-3xl border border-gray-800/50 shadow-2xl overflow-hidden">
          <div className="px-10 py-8 border-b border-gray-800/50">
            <div className="h-10 bg-gray-800 rounded-xl w-3/4 mb-6"></div>
            <div className="flex space-x-6">
              <div className="h-9 bg-gray-800 rounded-lg w-32"></div>
              <div className="h-9 bg-gray-800 rounded-lg w-32"></div>
              <div className="h-9 bg-gray-800 rounded-lg w-32"></div>
            </div>
          </div>
  
          <div className="p-10">
            <div className="h-96 bg-gray-800 rounded-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-900/50 to-transparent animate-shimmer" />
            </div>
          </div>
  
          <div className="px-10 pb-8">
            <div className="flex justify-between">
              <div className="flex space-x-4">
                <div className="h-12 bg-gray-800 rounded-xl w-32"></div>
                <div className="h-12 bg-gray-800 rounded-xl w-32"></div>
              </div>
              <div className="h-12 bg-gray-800 rounded-xl w-32"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );




  useEffect(() => {
    const timer = setTimeout(() => {
      setMinimumLoadTimePassed(true);
    }, 2000);
  
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        setError("Unable to retrieve post details.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchPost();
  
    return () => clearTimeout(timer);
  }, [id]);
  
  // New effect to scroll after post is set
  useEffect(() => {
    if (post) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [post]);
  

  if ((loading || !minimumLoadTimePassed) && !error) {
    return <SkeletonLoader />;
    
  }

  if (error) return <div className="text-center py-20 text-red-400">{error}</div>;
  if (!post) return <div className="text-center py-20 text-gray-500">No snippet found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <Navbar />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back Button */}
        <div className="mb-4">
          <Link
            to="/"
            className="inline-flex items-center text-gray-400 hover:text-blue-400 transition-colors group"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
            Back 
          </Link>
        </div>
  
        {/* Main Content */}
        <div className="bg-gray-900/40 backdrop-blur-2xl rounded-3xl border border-gray-800/50 shadow-2xl overflow-hidden ">
          {/* Header Section */}
          <div className="px-10 py-8 border-b border-gray-800/50 bg-gradient-to-r from-gray-900/60 to-gray-900/30">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500">
              {post.title}
            </h1>
            <div className="mt-4 flex items-center space-x-6 text-gray-400">
              <div className="flex items-center space-x-2 bg-gray-800/20 px-3 py-1.5 rounded-lg border border-gray-700/50">
                <UserIcon className="h-5 w-5 text-green-400" />
                <span className="font-medium">{post.username}</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-800/20 px-3 py-1.5 rounded-lg border border-gray-700/50">
                <CalendarIcon className="h-5 w-5 text-purple-400" />
                <span>
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit'
                  })}
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-800/20 px-3 py-1.5 rounded-lg border border-gray-700/50">
                <CodeIcon className="h-5 w-5 text-red-400" />
                <span className="font-mono">{post.tag}</span>
              </div>
            </div>
          </div>
  
          {/* Code Display */}
          <div className="p-4">
            <div className="relative group rounded-2xl overflow-hidden border-2 border-gray-800/50 shadow-xl hover:border-blue-500/30 transition-all">
              <SyntaxHighlighter
                language={post.tag || "javascript"}
                style={nightOwl}
                customStyle={{
                  overflow: "hidden", // No scrollbars
                  padding: "1.5rem",
                  background: "#0A0A0A",
                  borderRadius: "0.75rem",
                  fontSize: "0.82rem", // Slightly smaller text for better fit
                  lineHeight: "1.5", // Adjusted for compact display
                  width: "100%",
                  maxWidth: "100%",
                  whiteSpace: "pre-wrap", // Wraps text properly
                  wordBreak: "break-word",
                }}
                wrapLines={true}
                showLineNumbers
              >
                {post.content}
              </SyntaxHighlighter>
              
              {/* Floating Actions */}
              <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={handleCopyCode}
                  className="flex items-center space-x-2 bg-gray-900/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-gray-800/50 hover:border-yellow-400/30 transition-colors cursor-pointer"
                >
                  <CopyIcon className="h-5 w-5 text-yellow-400" />
                  <span className="text-sm text-gray-300">{copyButtonText}</span>
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center space-x-2 bg-gray-900/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-gray-800/50 hover:border-teal-400/30 transition-colors cursor-pointer"
                >
                  <DownloadIcon className="h-5 w-5 text-teal-400" />
                  <span className="text-sm text-gray-300">Download</span>
                </button>
              </div>
            </div>
          </div>
  
          {/* Stats & Share */}
          <div className="px-10 pb-8">
  <div className="flex justify-between items-center">
    <div className="flex space-x-4 text-gray-400">
      <div className="flex items-center space-x-2 bg-gray-900/50 px-4 py-2 rounded-xl border border-gray-700/50">
        <EyeIcon className="h-5 w-5 text-white" /> {/* Views Icon */}
        <span className="text-blue-400">Views:-</span>
        <span className="font-mono">{post.views}</span>
      </div>
      <div className="flex items-center space-x-2 bg-gray-900/50 px-4 py-2 rounded-xl border border-gray-700/50">
        <ThumbsUpIcon className="h-5 w-5 text-white" /> {/* Likes Icon */}
        <span className="text-blue-400">Likes:-</span>
        <span className="font-mono">{post.likes}</span>
      </div>
    </div>
    
    <button
      onClick={handleShare}
      className="flex items-center space-x-2 bg-gray-900/50 px-4 py-2 rounded-xl border border-gray-800/50 hover:border-orange-400/30 transition-colors"
    >
      <Share2Icon className="h-5 w-5 text-blue-400" />
      <span className="text-gray-300">Share</span>
    </button>
  </div>
</div>

        </div>
      </div>
    </div>
  );
  
};

export default PostDetails;