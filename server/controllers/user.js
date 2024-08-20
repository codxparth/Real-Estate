const mongoose = require('mongoose');
const User = require('../model/user')
const bcryptjs = require('bcryptjs');
const { errorHandler } = require('../utils/error');



exports.test = (req,res) =>{
    res.json({
        message:"api route is working"
    })
}



exports.updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id)
      return next(errorHandler(401, 'You can only update your own account!'));
    try {
      if (req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar,
          },
        },
        { new: true }
      );
  
      const { password, ...rest } = updatedUser._doc;
  
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };



exports.deleteUser = async (req,res,next)=>{
  if (req.user.id !== req.params.id)
  
    return next(errorHandler(401 , "you can  only delete your own account"))
  
  try{
    await User.findByIdAndDelete(req.params.id)
    res.clearCookie('access_token')
    return res.status(200).json({
      sucess:true,
      message:"user deleted successfully"
    })
  }
  catch(error){
    next(error)
  }
}