import React from 'react';
import { Link } from 'react-router-dom';
import { MoreVertical, Eye, Heart, Calendar } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-python';

const SnippetCard = ({ post }) => {
  const truncateContent = (content, maxLines = 4) => {
    const lines = content.split("\n");
    const truncated = lines.slice(0, maxLines).join("\n");
    return truncated;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  React.useEffect(() => {
    Prism.highlightAll();
  }, [post.content]);

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
      {/* Header with title and menu */}
      <div className="border-b border-gray-800 p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">
            <Link to={`/posts/${post.id}`} className="hover:text-green-400 transition-colors">
              {post.title}
            </Link>
          </h2>
        </div>

        {/* Tag below title */}
        <div className="mt-2">
          <span className="px-2.5 py-1 text-xs font-medium bg-green-700 text-white rounded-md">
            {post.tag}
          </span>
        </div>
      </div>

      {/* Code section - keeping it exactly as original */}
      <div className="bg-gray-800 p-4 overflow-hidden text-xs">
        <pre className="language-javascript">
          <code className={`language-${post.tag || 'javascript'}`}>
            {truncateContent(post.content)}
          </code>
        </pre>
      </div>

      {/* Enhanced metadata footer */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex flex-col space-y-3">
          {/* Author info and date */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3 text-sm">
              <span className="text-gray-500">Posted by:
              <Link 
                className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
              >
                &nbsp;{post.username}
              </Link></span>
            </div>
            <div className="flex items-center space-x-1.5 text-gray-400">
              <Calendar size={14} />
              <span>{formatDate(post.createdAt)}</span>
            </div>
          </div>

          {/* Engagement metrics */}
          <div className="flex items-center space-x-4 text-sm">
            <button className="flex items-center space-x-1.5 text-gray-400 hover:text-green-400 transition-colors">
              <Heart size={14} />
              <span>{post.likes}</span>
            </button>
            <div className="flex items-center space-x-1.5 text-gray-400">
              <Eye size={14} />
              <span>{post.views}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnippetCard;
