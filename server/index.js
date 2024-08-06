const express = require('express')
const app = express()

const database = require('./config/database')
const userRoutes = require('./routes/user')
const authRoutes = require('./routes/auth')

const dotenv = require("dotenv")
dotenv.config()

app.use(express.json())

database.connect()


app.use('/api/v1/user' , userRoutes)
app.use('/api/v1/auth', authRoutes)

app.listen(3000 , () =>{
    console.log("server is running on port no 3000")
})




app.get("/test" , (req,res)=>{
    return res.json({
        sucess:true,
        message:"your server is up  and running... "
    })
})


