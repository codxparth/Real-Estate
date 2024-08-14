const express = require('express');

const {test ,updateUser} = require('../controllers/user')
// const {updateUser} = require('../controllers/user')
const {verifyToken }= require('../utils/verifyuser')

const router = express.Router();


router.get('/test' , test)
router.post('/update/:id' , verifyToken ,updateUser)




module.exports = router
