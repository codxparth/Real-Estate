const mongoose = require('mongoose');
const User = require('../model/user');
const bcryptjs = require('bcryptjs');

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
