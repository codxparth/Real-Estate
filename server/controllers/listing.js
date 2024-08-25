const mongoose = require('mongoose')
const Listing = require('../model/listing')

exports.createlisting = async (req,res,next) =>{
    try{
        const listing = await Listing.create(req.body)
        return res.status(200).json({
            sucess:true,
            message:"listing created sucessfully",
            data:listing
        })
        
    }
    catch(error){
        next(error)
    }
}