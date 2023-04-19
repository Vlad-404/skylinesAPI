const express = require('express');
const {
    registerUser,
    loginUser,
    getMe
} = require('../controllers/auth.js');

// const User = require('../models/User.js')
// const advancedResults = require('../middleware/advancedResults.js')

const router = express.Router();

const { protect } = require('../middleware/auth.js');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.get('/me', protect, getMe);

module.exports = router;
