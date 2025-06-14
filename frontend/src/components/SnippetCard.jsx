import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Calendar, Heart, Eye } from "lucide-react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import { isPostLiked, toggleLike } from "../utils/postActions";
import { AuthContext } from "../context/AuthContext"; // <-- import AuthContext

const SnippetCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const { user } = useContext(AuthContext); // <-- get user

  useEffect(() => {
    let mounted = true;
    const checkLiked = async () => {
      const liked = await isPostLiked(post.id);
      if (mounted) setLiked(liked);
    };
    checkLiked();
    return () => { mounted = false; };
  }, [post.id]);

  const handleLike = async (e) => {
    e.preventDefault();
    if (likeLoading || !user) return; // <-- block if not logged in
    setLikeLoading(true);
    const result = await toggleLike(post.id);
    setLiked(result);
    setLikeCount((prev) =>
      result ? prev + 1 : prev > 0 ? prev - 1 : 0
    );
    setLikeLoading(false);
  };

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
        <span className="inline-flex items-center rounded-md bg-transparent px-2 py-1 text-[0.7rem] font-medium text-green-500 ring-1 ring-green-500/20 ring-inset">
          {post.tag}
        </span>
      </div>

      {/* Code Snippet */}
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
              overflow: 'hidden'
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
            <button
              className="flex items-center space-x-2 transition-colors"
              onClick={handleLike}
              disabled={likeLoading || !user}
              style={{ cursor: likeLoading || !user ? "not-allowed" : "pointer", opacity: !user ? 0.6 : 1 }}
              title={!user ? "Login to like this post" : ""}
            >
              <Heart
                className="w-4 h-4"
                fill={liked ? "#ef4444" : "none"}
                color={liked ? "#ef4444" : "#9ca3af"}
              />
              <span className={liked ? "text-red-400 font-semibold" : ""}>
                {likeCount}
              </span>
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