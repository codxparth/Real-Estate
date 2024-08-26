const express = require('express');

const {test ,updateUser,deleteUser,getuserlistings} = require('../controllers/user')
// const {updateUser} = require('../controllers/user')
const {verifyToken }= require('../utils/verifyuser')
 

const router = express.Router();


router.get('/test' , test)
router.post('/update/:id' , verifyToken ,updateUser)
router.delete('/delete/:id' , verifyToken ,deleteUser)
router.get('/listings/:id' , verifyToken ,getuserlistings)




module.exports = router
