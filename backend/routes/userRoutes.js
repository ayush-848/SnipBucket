const express = require("express");
const { registerUser, loggedinUser } = require("../controllers/userController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loggedinUser);

module.exports = router;
