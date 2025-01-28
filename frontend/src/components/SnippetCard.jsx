import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Heart, Eye } from "lucide-react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-python";

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

  React.useEffect(() => {
    Prism.highlightAll();
  }, [post.content]);

  return (
    <div className="bg-gray-850 border border-gray-750 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 min-h-[400px] flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-750">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-100 truncate">
            <Link
              to={`/posts/${post.id}`}
              className="hover:text-green-400 transition-colors"
            >
              {post.title}
            </Link>
          </h2>
          <div className="text-sm text-gray-400">
            <span className="font-medium">by </span>
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
      <div className="px-6 pt-4 mb-2">
        <span className="inline-block px-3 py-1 text-xs font-medium bg-green-600 text-white rounded-full">
          {post.tag}
        </span>
      </div>

      {/* Code Snippet */}
      <div className="p-6 bg-gray-800 text-xs flex-grow overflow-x-auto max-w-full">
        <pre className={`language-${post.tag} whitespace-pre-wrap break-words`}>
          <code>{truncateContent(post.content)}</code>
        </pre>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-gray-750">
        <div className="flex justify-between items-center text-sm text-gray-400">
          <div className="flex items-center space-x-3">
            <Calendar size={16} className="text-gray-400" />
            <span>{formatDate(post.createdAt)}</span>
          </div>
          <div className="flex items-center space-x-6">
            <button className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-colors">
              <Heart size={16} />
              <span>{post.likes}</span>
            </button>
            <div className="flex items-center space-x-2">
              <Eye size={16} />
              <span>{post.views}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnippetCard;
