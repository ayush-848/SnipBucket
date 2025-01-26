const express=require('express');
const userRoutes=require('./routes/userRoutes');
const postRoutes=require('./routes/postRoutes');
const bodyParser = require('body-parser');
const cookieParser=require('cookie-parser')
const connectDB =require('./config/connectDb');
const prettier = require('prettier');
const cors=require('cors')
const User=require('./models/User');
const authenticated=require('./middlewares/authenticated')

const app=express();
require('dotenv').config();
connectDB();

const port=8000||process.env.PORT;

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser())
app.use(
  cors({
    origin: [
      "https://snip-bucket.vercel.app",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use("/auth", userRoutes);
app.use("/api", postRoutes);

app.get('/',(req,res)=>{
  res.send('This is SniBucket API')
})


app.post('/format-code', async (req, res) => {
  try {
    // Extract code, options, and tag from the request body
    const { code, options, tag } = req.body;

    // Validate the 'code' input
    if (!code || typeof code !== 'string' || !code.trim()) {
      return res.status(400).json({ error: 'Code must be a non-empty string!' });
    }

    // Log the incoming request body
    console.log('Request Body:', req.body);

    // Define a function to get the appropriate parser based on the tag
    const getParserForTag = (tag) => {
      switch (tag.toLowerCase()) {
        case 'javascript':
        case 'js':
          return 'babel'; // JavaScript parser
        case 'typescript':
        case 'ts':
          return 'typescript'; // TypeScript parser
        case 'html':
          return 'html'; // HTML parser
        case 'css':
          return 'css'; // CSS parser
        case 'scss':
          return 'scss'; // SCSS parser
        case 'json':
          return 'json'; // JSON parser
        case 'markdown':
          return 'markdown'; // Markdown parser
        default:
          return 'babel'; // Default to 'babel' for JS if the tag is unknown
      }
    };

    // Get the parser based on the tag
    const parser = getParserForTag(tag);

    // Wrap Prettier formatting in a Promise to use async/await
    const formattedCode = await new Promise((resolve, reject) => {
      try {
        const result = prettier.format(code, {
          ...options,
          parser: parser, // Use the determined parser
        });
        resolve(result); // Resolve with the formatted code
      } catch (error) {
        reject(error); // Reject if formatting fails
      }
    });

    // Log the formatted code
    console.log('Formatted Code:', formattedCode);

    // Send the formatted code in the response
    return res.status(200).json({ formattedCode });
  } catch (error) {
    // Handle and log errors
    console.error('Error formatting code:', error.message);
    return res.status(500).json({
      error: 'Failed to format code',
      details: error.message,
    });
  }
});

app.get('/protected', authenticated, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password'); // Exclude sensitive fields
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  res.status(200).json({
    success: true,
    message: 'User authenticated',
    user,
  });
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });

