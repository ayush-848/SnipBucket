import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { 
  Share2Icon, 
  DownloadIcon, 
  ArrowLeftIcon, 
  ThumbsUpIcon, 
  EyeIcon, 
  TagIcon, 
  CopyIcon 
} from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import Navbar from "../components/Navbar";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for button text
  const [shareButtonText, setShareButtonText] = useState("Share Post");
  const [copyButtonText, setCopyButtonText] = useState("Copy Code");

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareButtonText("Copied!");
    setTimeout(() => setShareButtonText("Share Post"), 2000); // Reset after 2 seconds
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
    setTimeout(() => setCopyButtonText("Copy Code"), 2000); // Reset after 2 seconds
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts/${id}`);
        const post = response.data;
        setPost(post);
      } catch (error) {
        setError("Unable to retrieve post details.");
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <div className="text-center py-10 text-slate-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-rose-600">{error}</div>;
  }

  if (!post) {
    return <div className="text-center py-10 text-slate-600">No post found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0c0118] via-gray-900 to-[#0c0118]">
      <Navbar />
      <div className="relative min-h-screen bg-gradient-to-b from-[#0c0118] via-gray-900 to-[#0c0118] overflow-hidden font-montserrat flex items-center justify-center p-4">
        <article className="w-full max-w-4xl bg-white/5 backdrop-blur-lg rounded-xl shadow-2xl border border-white/10 overflow-hidden">
          <div className="p-8 space-y-6">
            <h1 className="text-4xl font-bold text-sky-300 border-b pb-3 border-slate-700">
              {post.title}
            </h1>

            <div className="flex justify-between items-center text-sm text-slate-400">
              <div className="flex items-center space-x-3">
                <span className="text-sky-500">Author:</span>
                <span className="font-medium text-slate-200 bg-white/10 px-2 py-1 rounded">
                  {post.username}
                </span>
                <span className="text-slate-500">
                  Published: {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="prose prose-invert max-w-none bg-white/5 p-4 rounded-lg border border-white/10">
            <SyntaxHighlighter
  language={post.tag || "javascript"}
  wrapLongLines
  showLineNumbers
  style={nightOwl}
  customStyle={{
    width: "100%",          // Ensure it takes up full width
    maxWidth: "100%",       // Prevent it from exceeding the screen width
    height: "auto",         // Allow the height to adjust automatically
    borderRadius: "0.5rem",
    padding: "1rem",
    overflowX: "auto",      // Ensure horizontal scroll when needed
  }}
>
  {post.content}
</SyntaxHighlighter>

            </div>

            <div className="grid grid-cols-3 gap-4 text-sm text-slate-400">
              <div className="bg-white/10 p-4 rounded-lg flex items-center space-x-2">
                <ThumbsUpIcon className="h-5 w-5 text-sky-500" />
                <span>
                  Likes: <span className="text-sky-300">{post.likes}</span>
                </span>
              </div>
              <div className="bg-white/10 p-4 rounded-lg flex items-center space-x-2">
                <EyeIcon className="h-5 w-5 text-emerald-500" />
                <span>
                  Views: <span className="text-emerald-300">{post.views}</span>
                </span>
              </div>
              {post.tag && (
                <div className="bg-white/10 p-4 rounded-lg flex items-center space-x-2">
                  <TagIcon className="h-5 w-5 text-violet-500" />
                  <span>
                    Tag: <span className="text-violet-300">{post.tag}</span>
                  </span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center border-t pt-4 border-slate-700">
              <div className="flex space-x-2">
                <button
                  onClick={handleShare}
                  className="px-4 py-2 text-sm border rounded text-sky-300 border-sky-500 hover:bg-sky-500/10 transition flex items-center cursor-pointer"
                >
                  <Share2Icon className="h-4 w-4 mr-2" />
                  {shareButtonText}
                </button>
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 text-sm border rounded text-emerald-300 border-emerald-500 hover:bg-emerald-500/10 transition flex items-center cursor-pointer"
                >
                  <DownloadIcon className="h-4 w-4 mr-2" />
                  Download
                </button>
                <button
                  onClick={handleCopyCode}
                  className="px-4 py-2 text-sm border rounded text-amber-300 border-amber-500 hover:bg-amber-500/10 transition flex items-center cursor-pointer"
                >
                  <CopyIcon className="h-4 w-4 mr-2" />
                  {copyButtonText}
                </button>
              </div>
            </div>
          </div>
        </article>

        <div className="mt-4 text-center absolute bottom-6">
          <Link
            to="/"
            className="text-sm text-sky-300 hover:text-sky-500 transition flex items-center justify-center cursor-pointer"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Return to Posts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
