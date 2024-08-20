const express = require('express');

const {test ,updateUser,deleteUser} = require('../controllers/user')
// const {updateUser} = require('../controllers/user')
const {verifyToken }= require('../utils/verifyuser')
 

const router = express.Router();


router.get('/test' , test)
router.post('/update/:id' , verifyToken ,updateUser)
router.delete('/delete/:id' , verifyToken ,deleteUser)





module.exports = router
