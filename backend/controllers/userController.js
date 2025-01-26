const User=require('../models/User');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

const checkFormat = (name, email, password) => {
    // Validate all fields
    if (!name || !email || !password) {
        throw new Error("All fields are required");
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
        throw new Error("Invalid email format");
    }

    // Validate password strength
    if (password.length < 4) {
        throw new Error("Password must be at least 4 characters long");
    }
};


const signup = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      checkFormat(username, email, password);
      
      const isUser = await User.findOne({ email });
      const sameUsername = await User.findOne({ username });
      if (isUser || sameUsername) {
        return res.status(400).json({ success: false, error: true, message: "User already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new user
      const user = new User({
        username,
        email,
        password: hashedPassword,
      });
      await user.save();
  
      return res.status(201).json({
        success: true,
        message: "Account created successfully",
      });
    } catch (error) {
  
      let errorMessage = "Server error, please try again later";
      if (error.message.includes("All fields are required")) {
        errorMessage = "All fields are required";
      } else if (error.message.includes("Invalid email format")) {
        errorMessage = "Invalid email format";
      } else if (error.message.includes("Password must be at least")) {
        errorMessage = "Password must be at least 4 characters";
      }
  
      return res.status(500).json({
        success: false,
        error: true,
        message: errorMessage,
      });
    }
  };


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const errorMsg = 'Incorrect email or password';

        // Check if user exists
        if (!user) {
            return res.status(403).json({
                success: false,
                message: errorMsg,
            });
        }

        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403).json({
                success: false,
                message: errorMsg,
            });
        }

        // Generate JWT token
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        res.cookie('jwtToken', jwtToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', 
          sameSite: 'None',
          maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
        });

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            jwtToken,
            user
        })
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


const logout = async (req, res) => {
  try {
    res.clearCookie('jwtToken', {
      httpOnly: true, // Ensures the cookie can't be accessed by JavaScript
      sameSite: 'None', // Restrict cookie to same-site requests
      secure: process.env.NODE_ENV === 'production', // Set to true for secure cookies in production
    });
    return res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


module.exports = { signup, login, logout };