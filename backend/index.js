const express=require('express');
const userRoutes=require('./routes/userRoutes');
const postRoutes=require('./routes/postRoutes');
const bodyParser = require('body-parser');
const connectDB =require('./config/connectDb');
const cors=require('cors')

const app=express();
require('dotenv').config();
connectDB();

const port=8000||process.env.PORT;

app.use(express.json());
app.use(bodyParser.json());
app.use(
  cors({
    origin: [
      "https://snip-bucket.vercel.app/",
      "http://localhost:5174",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use("/auth", userRoutes);
app.use("/api", postRoutes);

app.get('/',(req,res)=>{
  res.send('This is ShipBucket API')
})


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });

