const express = require("express");
const { createPost, getAllPosts, getPostsByUser, getPostById,generateTitle,getPostOfUser } = require("../controllers/postController");
const router = express.Router();
const authenticated=require('../middlewares/authenticated')



// Routes
router.post("/create", authenticated, createPost);
router.get("/posts", getAllPosts);
router.get("/posts/:id",getPostById);
router.post('/generate-title',authenticated,generateTitle);
router.get("/user/posts", authenticated, getPostsByUser);
router.get("/user/posts/:id", authenticated, getPostOfUser);

module.exports = router;
