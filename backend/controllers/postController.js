const db = require("../utils/firebase");
const axios=require('axios');
require('dotenv').config()

const HUGGING_FACE_API_KEY=process.env.HUGGING_FACE_API_KEY;
const API_URL = 'https://api-inference.huggingface.co/models';

// Model endpoints
const MODELS = {
  CODE_IMPROVEMENT: 'microsoft/codereviewer',
  CODE_TITLE: 'microsoft/codebert-base'  // Better for code understanding
};

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


async function callHuggingFaceAPI(model, input) {
  try {
    const response = await axios.post(
      `${API_URL}/${model}`,
      { inputs: input },
      {
        headers: {
          Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 30000 // 30 second timeout
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error calling ${model}:`, error.response?.data || error.message);
    throw error;
  }
}

exports.improveSnippet = async (req, res) => {
  const { codeSnippet } = req.body;

  if (!codeSnippet) {
    return res.status(400).json({ error: 'Code snippet is required' });
  }

  try {
    // Format the prompt for better results
    const prompt = `Review and improve this code:\n${codeSnippet}\n\nImproved version:`;
    
    const response = await callHuggingFaceAPI(MODELS.CODE_IMPROVEMENT, prompt);
    
    const improvedSnippet = response[0]?.generated_text?.trim() || response[0]?.summary_text?.trim();
    
    if (!improvedSnippet) {
      throw new Error('No improvement generated');
    }

    res.json({ 
      improvedSnippet,
      original: codeSnippet 
    });

  } catch (error) {
    console.error('Code improvement error:', error);
    res.status(500).json({ 
      error: 'Failed to improve the code snippet',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};




const { GoogleGenerativeAI } = require('@google/generative-ai');
const apiKey = process.env.GEMINI_API_KEY; // Set your Gemini API key here
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp", // Correct model for Gemini 2.0
});

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


