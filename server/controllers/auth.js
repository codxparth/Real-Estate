const mongoose = require('mongoose')
const user = require('../model/user')
const bcryptjs = require('bcryptjs')

exports.signup = async (req,res) =>{
    try{
        // first hum data fatch 
        const {username , email , password } = req.body;
        const hashedpassword =  bcryptjs.hashSync(password , 10)
        // second data create 
        const responce = await user.create({username, email, password:hashedpassword});

        
        console.log(hashedpassword)
        // data validation 
        if(!username || !email || !password){
                res.status(400).json({
                    sucess:false,
                    message:"please required all details",
                })
        }



        console.log(responce)
         // return responce 
      // data save in mongo
      res.status(200).json({
        sucess:true,
        message:"user created successfully",
        data:responce
    })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
    })
}
}