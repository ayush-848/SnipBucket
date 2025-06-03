const db = require("../utils/firebase");
const { GoogleGenerativeAI } = require('@google/generative-ai');
const admin = require('firebase-admin');

require('dotenv').config()


const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp", 
});


exports.createPost = async (req, res) => {
  try {
    const { title, content, tag, username, visibility = 'public' } = req.body; // Default visibility is 'public'
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
      visibility: visibility.toLowerCase(), // Always save as lowercase
      views: 0,  // Initial views count
      likes: 0,  // Initial likes count
      createdAt: new Date().toISOString(), // Timestamp for creation
    });

    // Only return the postId and success message
    res.status(201).json({
      success: true,
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
    const snapshot = await db.collection("posts")
      .where("visibility", "==", "public")
      .get();

    const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
};

exports.getPostsByUser = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log(userId)

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const userPostsQuery = db.collection("posts").where("authorId", "==", userId);
    const snapshot = await userPostsQuery.get();

    if (snapshot.empty) {
      return res.status(404).json({ message: "No posts found for this user" });
    }

    const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Error fetching posts" });
  }
};

exports.getPostOfUser = async (req, res) => {
  try {
    const { id } = req.params; // Get the post ID from URL params
    const userId = req.user._id; // Get user ID from authenticated request

    if (!id || !userId) {
      return res.status(400).json({ message: "Post ID and User ID are required" });
    }

    // Fetch the specific post that belongs to the authenticated user
    const postDoc = await db.collection("posts").doc(id).get();

    if (!postDoc.exists) {
      return res.status(404).json({ message: "Post not found" });
    }

    const postData = postDoc.data();

    // Ensure the post belongs to the authenticated user
    if (postData.authorId !== userId) {
      return res.status(403).json({ message: "Unauthorized: You cannot access this post" });
    }

    res.status(200).json({ id: postDoc.id, ...postData });
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Error fetching post" });
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





const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

exports.generateTitle = async (req, res) => {
  const { codeSnippet } = req.body;

  if (!codeSnippet) {
    return res.status(400).json({ error: 'Code snippet is required' });
  }

  try {
    // Start a new chat session with Gemini 2.0 model
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            { text: `Give **one** direct, proper and detailed title for the following code without any un-necessary prompt:\n\n${codeSnippet}` },
          ],
        },
      ],
    });

    // Send the message and get the response
    const result = await chatSession.sendMessage('Request for code title');
    
    // Extract the response text
    const responseText = result.response.text().trim();

    // Clean up the response to extract only the title
    const cleanedTitle = responseText
      .replace(/Okay, here's \*\*one\*\* proper and detailed title for the provided code:\n+/i, '') // Remove extra explanation
      .replace(/^["`]*|["`]*$/g, '') // Remove quotes or backticks if present
      .replace(/\n+/g, ' ') // Remove extra new lines
      .trim();

    if (!cleanedTitle) {
      return res.status(500).json({ error: 'Failed to generate title' });
    }

    res.json({ title: cleanedTitle,success:true });
  } catch (error) {
    console.error('Title generation error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate title', details: error.response?.data || error.message });
  }
};

exports.incrementView = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user ? req.user._id : req.ip; // fallback to IP for guests

  const viewDocId = `${postId}_${userId}`;
  const viewRef = db.collection('postViews').doc(viewDocId);

  const viewDoc = await viewRef.get();
  if (!viewDoc.exists) {
    // Add view record
    await viewRef.set({
      postId,
      userId,
      viewedAt: new Date().toISOString(),
    });
    // Increment view count on post
    await db.collection('posts').doc(postId).update({
      views: admin.firestore.FieldValue.increment(1),
    });
  }
  res.status(200).json({ success: true });
};

exports.toggleLike = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user._id;

  const likeDocId = `${postId}_${userId}`;
  const likeRef = db.collection('postLikes').doc(likeDocId);

  const likeDoc = await likeRef.get();
  if (!likeDoc.exists) {
    // Add like
    await likeRef.set({
      postId,
      userId,
      likedAt: new Date().toISOString(),
    });
    await db.collection('posts').doc(postId).update({
      likes: admin.firestore.FieldValue.increment(1),
    });
    return res.status(200).json({ liked: true });
  } else {
    // Remove like
    await likeRef.delete();
    await db.collection('posts').doc(postId).update({
      likes: admin.firestore.FieldValue.increment(-1),
    });
    return res.status(200).json({ liked: false });
  }
};

// Check if post is liked by the user
exports.isPostLiked = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user._id;
  const likeDocId = `${postId}_${userId}`;
  const likeRef = db.collection('postLikes').doc(likeDocId);
  const likeDoc = await likeRef.get();
  res.json({ liked: likeDoc.exists });
};


