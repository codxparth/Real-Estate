const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
        default:"https://th.bing.com/th?id=OIP.hmLglIuAaL31MXNFuTGBgAHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
    }
}, {timestamps:true})

module.exports = mongoose.model("User",userSchema);