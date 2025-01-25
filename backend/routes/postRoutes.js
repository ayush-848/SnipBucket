const express = require("express");
const { createPost, getAllPosts, getPostsByUser, getTopPosts, getPostById } = require("../controllers/postController");
const router = express.Router();
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("x-auth-token"); // Extract token from headers
  if (!token) return res.status(401).send("Access Denied");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the JWT using the secret key
    req.user = decoded; // Attach the decoded user data to req.user
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(400).send("Invalid Token"); // If token is invalid
  }
};

// Routes
router.post("/create", verifyToken, createPost);
router.get("/posts", getAllPosts);
router.get("/posts/top", getTopPosts);
router.get("/posts/:id", getPostById);
router.get("/:id/posts", verifyToken, getPostsByUser);

module.exports = router;
