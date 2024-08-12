const mongoose = require('mongoose');
const User = require('../model/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate required fields
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required details",
            });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists",
            });
        }

        const hashedPassword = bcryptjs.hashSync(password, 10);

        // Create user
        const newUser = await User.create({ username, email, password: hashedPassword });

        // Send success response
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: newUser
        });
    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const validuser = await User.findOne({ email });
        if (!validuser) {
            return res.status(404).json({
                // message: "User not found",
                success: false,
            });
        }

        const validpassword = bcryptjs.compareSync(password, validuser.password);
        if (!validpassword) {
            return res.status(401).json({
                message: "Invalid password",
                success: false,
            });
        }

        const token = jwt.sign({ id: validuser._id }, process.env.JWT_SECRET);
        res.status(200).json({
            message: "User logged in successfully",
            success: true,
            validuser,
            token
        });
    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({
            success: false,
            message: "Server error occurred",
            error: error.message, // Include error message for easier debugging
        });
    }
};




exports.google = async (req,res) =>{
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