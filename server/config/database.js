const mongoose = require('mongoose');
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGO_DB_URL,{

    })
    .then(() => console.log("db connection succesfully"))
    .catch((error)=>{
        console.log("db connect issue")
        console.log(error)
        return process.exit(1);
    })

}