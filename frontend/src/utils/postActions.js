import axios from "axios";

export const incrementView = async (postId) => {
  try {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/posts/${postId}/view`,
      {},
      { withCredentials: true }
    );
  } catch (error) {
    console.error("Error incrementing view:", error);
  }
};

export const toggleLike = async (postId) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/posts/${postId}/like`,
      {},
      { withCredentials: true }
    );
    return res.data.liked;
  } catch (error) {
    console.error("Error toggling like:", error);
    return null;
  }
};

export const isPostLiked = async (postId) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/posts/${postId}/is-liked`,
      { withCredentials: true }
    );
    return res.data.liked;
  } catch {
    return false;
  }
};