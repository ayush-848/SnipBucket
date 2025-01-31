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

const port=process.env.PORT;

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser())
app.use(
  cors({
    origin: [
      "https://snip-bucket.vercel.app",
      `http://localhost:5173`,
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

