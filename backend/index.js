const express=require('express');

require('dotenv').config();

const port=8000||process.env.PORT;
const app=express();

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('This is Snipbucket Api');
})


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });

