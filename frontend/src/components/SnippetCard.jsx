import React from "react";
import { Link } from "react-router-dom";

// Helper function to truncate long content
const truncateContent = (content, maxLength = 100) => {
  return content.length > maxLength ? content.substring(0, maxLength) + "..." : content;
};

const SnippetCard = ({ post }) => {
  return (
    <div className="p-4 border rounded-lg bg-gray-900 text-white shadow-lg">
      <h2 className="text-xl font-bold mb-2">{post.title}</h2>
      <p className="text-gray-300 mb-4">{truncateContent(post.content)}</p>

      {/* Display views, likes, username, and tag */}
      <div className="flex justify-between text-sm text-gray-400 mt-2">
        <span>Views: {post.views}</span>
        <span>Likes: {post.likes}</span>
      </div>
      <div className="text-gray-500 mt-1">
        <span>Posted by: {post.username}</span>
      </div>
      <div className="text-sm text-blue-400 mt-1">
        <span>Tag: {post.tag}</span>
      </div>

      <Link
        to={`/posts/${post.id}`}
        className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded inline-block"
      >
        Read More
      </Link>
    </div>
  );
};

export default SnippetCard;
