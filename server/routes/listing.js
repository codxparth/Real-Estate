const express = require('express');
const {createlisting} = require('../controllers/listing')

const router = express.Router();



router.post('/create' , createlisting)


module.exports = router