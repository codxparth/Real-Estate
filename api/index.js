const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();
mongoose.connect(process.env.MONGODBURL).then(()=>{
    console.log("connected to mongodb database")
}).catch((err) =>{
    console.log("not connected to mongodb database ")
    console.log(err)
});


const app = express();


app.listen(3000, () =>{
    console.log(`app is running on port no ${3000}`)
})

