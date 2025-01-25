const express=require('express');
const userRoutes=require('./routes/userRoutes');
const postRoutes=require('./routes/postRoutes');
const connectDB =require('./config/connectDb');
const cors=require('cors')

require('dotenv').config();
connectDB();

const port=8000||process.env.PORT;
const app=express();

app.use(express.json());
app.use(cors());
app.use("/auth", userRoutes);
app.use("/api", postRoutes);

app.get('/',(req,res)=>{
  res.send('This is ShipBucket API')
})


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });

