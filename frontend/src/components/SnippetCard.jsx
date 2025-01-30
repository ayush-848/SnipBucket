import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Heart, Eye } from "lucide-react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";

const SnippetCard = ({ post }) => {
  const truncateContent = (content, maxLines = 6) => {
    const lines = content.split("\n");
    return lines.slice(0, maxLines).join("\n");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="group bg-[#1a1b26] rounded-xl overflow-hidden border border-gray-800 h-[320px] flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-800">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-100 truncate max-w-[70%]">
            <Link
              to={`/posts/${post.id}`}
              className="hover:text-blue-400 transition-colors"
            >
              {post.title}
            </Link>
          </h2>
          <div className="text-sm text-gray-400">
            <span>by </span>
            <Link
              to={`/user/${post.username}`}
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              {post.username}
            </Link>
          </div>
        </div>
      </div>

      {/* Tag */}
      <div className="px-6 py-2">
        <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-blue-900/30 text-blue-300 rounded-full">
          {post.tag}
        </span>
      </div>

      {/* Code Snippet - Fixed height with no scrollbar */}
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

      {/* Footer */}
      <div className="px-6 py-3 border-t border-gray-800 bg-[#1a1b26]">
        <div className="flex justify-between items-center text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(post.createdAt)}</span>
          </div>
          <div className="flex items-center space-x-6">
            <button className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
              <Heart className="w-4 h-4" />
              <span>{post.likes}</span>
            </button>
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>{post.views}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnippetCard;