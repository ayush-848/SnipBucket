const express=require('express');
const userRoutes=require('./routes/userRoutes');
const postRoutes=require('./routes/postRoutes');
const connectDB =require('./config/connectDb')

require('dotenv').config();
connectDB();

const port=8000||process.env.PORT;
const app=express();

app.use(express.json());

app.use("/auth", userRoutes);
app.use("/api", postRoutes);


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });

