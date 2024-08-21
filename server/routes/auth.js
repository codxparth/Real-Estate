const express = require('express');
const {signup , signin , google ,signout} = require('../controllers/auth')

const router = express.Router();

router.post('/signup' , signup);
router.post('/signin', signin);
router.post('/google',google);
router.get("/sign-out",signout);

module.exports = router