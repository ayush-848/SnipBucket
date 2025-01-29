const express = require("express");
const { createPost, getAllPosts, getPostsByUser, getTopPosts, getPostById,improveSnippet,generateTitle } = require("../controllers/postController");
const router = express.Router();
const authenticated=require('../middlewares/authenticated')



// Routes
router.post("/create", authenticated, createPost);
router.get("/posts", getAllPosts);
router.get("/posts/top", getTopPosts);
router.get("/posts/:id", getPostById);

router.post('/improveSnippet',authenticated,improveSnippet);
router.post('/generate-title',authenticated,generateTitle);
router.get("/:id/posts", authenticated, getPostsByUser);

module.exports = router;
