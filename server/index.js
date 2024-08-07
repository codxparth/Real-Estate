const express = require('express')
const app = express()

const database = require('./config/database')
const userRoutes = require('./routes/user')
const authRoutes = require('./routes/auth')

const dotenv = require("dotenv")
dotenv.config()

app.use(express.json())

database.connect()


app.use('/api/user' , userRoutes)
app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




app.get("/test" , (req,res)=>{
    return res.json({
        sucess:true,
        message:"your server is up  and running... "
    })
})


