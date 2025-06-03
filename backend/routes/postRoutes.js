const express = require("express");
const { createPost, getAllPosts, getPostsByUser, getPostById, generateTitle, getPostOfUser, incrementView, toggleLike,isPostLiked } = require("../controllers/postController");
const router = express.Router();
const authenticated = require('../middlewares/authenticated');

// Routes
router.post("/create", authenticated, createPost);
router.get("/posts", getAllPosts);
router.get("/posts/:id", getPostById);
router.post('/generate-title', authenticated, generateTitle);
router.get("/user/posts", authenticated, getPostsByUser);
router.get("/user/posts/:id", authenticated, getPostOfUser);

// Unique view and like routes
router.post("/posts/:postId/view", authenticated, incrementView);
router.post("/posts/:postId/like", authenticated, toggleLike);
router.get("/posts/:postId/is-liked", authenticated, isPostLiked);

module.exports = router;
