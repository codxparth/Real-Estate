const mongoose = require('mongoose');



exports.test = (req,res) =>{
    res.json({
        message:"api route is working"
    })
}