const express = require("express");
const { createPost, getAllPosts, getPostsByUser } = require("../controllers/postController");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access Denied");

  try {
    const decoded = jwt.verify(token, "secret_key");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};

router.post("/create", verifyToken, createPost);
router.get("/posts", getAllPosts);
router.get("/:id/posts", verifyToken, getPostsByUser);

module.exports = router;
