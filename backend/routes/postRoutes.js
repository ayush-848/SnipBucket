const express = require("express");
const { createPost, getAllPosts, getPostsByUser, getTopPosts, getPostById } = require("../controllers/postController");
const router = express.Router();
const authenticated=require('../middlewares/authenticated')

// Routes
router.post("/create", authenticated, createPost);
router.get("/posts", getAllPosts);
router.get("/posts/top", getTopPosts);
router.get("/posts/:id", getPostById);
router.get("/:id/posts", authenticated, getPostsByUser);

module.exports = router;
