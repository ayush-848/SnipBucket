const db = require("../utils/firebase");
exports.createPost = async (req, res) => {
  try {
    const { title, content, tag,username,visibility='public' } = req.body; // Default visibility is 'public'
    const authorId = req.user._id; // From middleware (verified JWT)

    
    if (!authorId) {
      return res.status(400).json({ message: "Invalid author ID" });
    }

    // Reference to Firestore collection for posts
    const postsCollection = db.collection('posts');

    // Add the post to Firestore with initial views and likes set to 0
    const newPost = await postsCollection.add({
      title: title,
      content: content,
      authorId: authorId, // Link the post to the authenticated user
      username: username,  // Include the username
      tag: tag,       // Add the tag to the post
      visibility: visibility, // Use the visibility from the request body, default is 'public'
      views: 0,  // Initial views count
      likes: 0,  // Initial likes count
      createdAt: new Date().toISOString(), // Timestamp for creation
    });

    // Only return the postId and success message
    res.status(201).json({
      success:true,
      message: "Post created successfully 201",
      postId: newPost.id,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Error creating post" });
  }
};



// Get all posts (accessible to both authenticated and non-authenticated users)
exports.getAllPosts = async (req, res) => {
  try {
    const snapshot = await db.collection("posts").get(); // Get all posts
    const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(posts); // Return all posts
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
};

// Get posts by a specific user (only accessible to authenticated users)
exports.getPostsByUser = async (req, res) => {
  try {
    const userId = req.params.id; // User ID from URL parameter

    // Query to fetch posts by the specific user
    const userPostsQuery = db.collection("posts").where("authorId", "==", userId);

    const snapshot = await userPostsQuery.get(); // Get posts for the user
    const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    if (posts.length === 0) {
      return res.status(404).json({ message: "No posts found for this user" });
    }

    res.status(200).json(posts); // Return posts of the user
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
};


exports.getTopPosts = async (req, res) => {
  try {
    const postsCollection = db.collection("posts");
    const snapshot = await postsCollection.orderBy("likes", "desc").limit(4).get();

    const topPosts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(topPosts);
  } catch (error) {
    console.error("Error fetching top posts:", error);
    res.status(500).json({ message: "Error fetching top posts" });
  }
};

// Get post by ID
exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params; // Post ID from the route parameter

    // Fetch the specific post from Firestore
    const postDoc = await db.collection("posts").doc(id).get();

    if (!postDoc.exists) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Return the post data
    res.status(200).json({ id: postDoc.id, ...postDoc.data() });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ message: "Error fetching post details" });
  }
};
