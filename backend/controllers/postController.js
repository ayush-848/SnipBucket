const db = require("../utils/firebase");  // Use Firebase Admin's Firestore

// Create a reference to the posts collection
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Ensure authorId is taken from the authenticated user (from JWT)
    const authorId = req.user.id;

    // Reference to Firestore collection
    const postsCollection = db.collection("posts");  // Use Admin SDK Firestore instance

    // Add the post to Firestore
    const newPost = await postsCollection.add({
      title,
      content,
      authorId: authorId,  // Link the post to the authenticated user
    });

    res.status(201).json({ message: "Post created", postId: newPost.id });
  } catch (error) {
    console.error(error);  // Log the error for debugging
    res.status(500).json({ message: "Error creating post" });
  }
};

// Get all posts (accessible to both authenticated and non-authenticated users)
exports.getAllPosts = async (req, res) => {
  try {
    const snapshot = await db.collection("posts").get();  // Get all posts
    const posts = snapshot.docs.map(doc => doc.data());
    res.status(200).json(posts);  // Return all posts
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
};

// Get posts by a specific user (only accessible to authenticated users)
exports.getPostsByUser = async (req, res) => {
  try {
    const userId = req.params.id;  // User ID from URL parameter

    // Query to fetch posts by the specific user
    const userPostsQuery = db.collection("posts").where("authorId", "==", userId);

    const snapshot = await userPostsQuery.get();  // Get posts for the user
    const posts = snapshot.docs.map(doc => doc.data());

    if (posts.length === 0) {
      return res.status(404).json({ message: "No posts found for this user" });
    }

    res.status(200).json(posts);  // Return posts of the user
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
};
