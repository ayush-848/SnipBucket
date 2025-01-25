const User = require("../models/User");
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPassword });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error registering user" });
  }
};

exports.loggedinUser=async(req,res)=>{
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("Invalid credentials");
  
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid credentials");
  
    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email, username: user.username }, `${process.env.JWT_SECRET}`, {
      expiresIn: "24h",
    });
  
    res.status(200).json({ token });
}