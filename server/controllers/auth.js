const mongoose = require('mongoose');
const User = require('../model/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
      await newUser.save();
      res.status(201).json('User created successfully!');
    } catch (error) {
      next(error);
    }
  };


  exports.signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const validUser = await User.findOne({ email });
      if (!validUser) return next(errorHandler(404, 'User not found!'));
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = validUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } catch (error) {
      next(error);
    }
  };




exports.google = async (req,res,next) =>{
    try{
        const user = await User.findOne({email : req.body.email})

        // agar email mil gaya 
        if(user){
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
            console.log(token)

           return res.cookie("access token" , token, {httpsOnly :true}).status(200).json({success:true})
        }

        else{
            const generatedPassword =  Math.random().toString(36).slice(-8) +  Math.random().toString(36).slice(-8)  
            const hashedPassword = bcryptjs.hashSync(generatedPassword , 10)
            const newUser = new User({username:req.body.name.split(" ").join("").toLowerCase() +  Math.random().toString(36).slice(-4),   email:req.body.email, password:hashedPassword , avatar:req.body.photo})
            await newUser.save()
            const token = jwt.sign({id: newUser._id} , process.env.JWT_SECRET)

            return res.cookie("access token" , token, {httpsOnly :true}).status(200).json({success:true})
            console.log(newUser)

        }

    }
    catch(error){
        console.error('Server Error:', error);
        res.status(500).json({
            success: false,
            message: "something went wrong"
        });
    }
}


exports.signout = async (req,res,next) =>{
  try{
    res.clearCookie("access_token");
    res.status(200).json({
      sucess:true,
      message:"user has been log-out"
    })
  }
  catch(error){
    next(error);
  }
}