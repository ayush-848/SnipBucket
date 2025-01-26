import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { 
  Share2Icon, 
  DownloadIcon, 
  ArrowLeftIcon, 
  ThumbsUpIcon, 
  EyeIcon, 
  TagIcon 
} from "lucide-react";
import Editor from '@monaco-editor/react';
import Navbar from '../components/Navbar'

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [formattedCode, setFormattedCode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied");
  };

  const handleDownload = () => {
    const blob = new Blob([post.content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${post.title}.txt`;
    link.click();
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts/${id}`);
        const post = response.data;
        setPost(post);
  
        // Fetch formatted code asynchronously
        if (post.content && post.tag) {
          const formatResponse = await axios.post(
            `${import.meta.env.VITE_API_URL}/format-code`,
            {
              code: post.content,
              options: { semi: true, singleQuote: true },
              tag: post.tag, // Send the post.tag along with content and options
            },
            {
              headers: {
                'Content-Type': 'application/json', // Ensure server understands you're sending JSON
              }
            }
          );
  
          // Assuming the response contains the formatted code in `formattedCode`
          setFormattedCode(formatResponse.data.formattedCode);
        } else {
          console.error('No content or tag found in the post');
        }
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
  };

  if (error) {
    return <div className="text-center py-10 text-rose-600">{error}</div>;
  };

  if (!post) {
    return <div className="text-center py-10 text-slate-600">No post found</div>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0c0118] via-gray-900 to-[#0c0118]">
      <Navbar/>
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
            <Editor
              height="300px"
              language={post.tag || 'javascript'}
              value={formattedCode || post.content}
              options={{
                readOnly: true,
                minimap: { enabled: false },
                wordWrap: 'on',
                scrollBeyondLastLine: false,
              }}
            />
          </div>

          <div className="grid grid-cols-3 gap-4 text-sm text-slate-400">
            <div className="bg-white/10 p-4 rounded-lg flex items-center space-x-2">
              <ThumbsUpIcon className="h-5 w-5 text-sky-500" />
              <span>Likes: <span className="text-sky-300">{post.likes}</span></span>
            </div>
            <div className="bg-white/10 p-4 rounded-lg flex items-center space-x-2">
              <EyeIcon className="h-5 w-5 text-emerald-500" />
              <span>Views: <span className="text-emerald-300">{post.views}</span></span>
            </div>
            {post.tag && (
              <div className="bg-white/10 p-4 rounded-lg flex items-center space-x-2">
                <TagIcon className="h-5 w-5 text-violet-500" />
                <span>Tag: <span className="text-violet-300">{post.tag}</span></span>
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
                Share Post
              </button>
              <button 
                onClick={handleDownload}
                className="px-4 py-2 text-sm border rounded text-emerald-300 border-emerald-500 hover:bg-emerald-500/10 transition flex items-center cursor-pointer"
              >
                <DownloadIcon className="h-4 w-4 mr-2" />
                Download
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
