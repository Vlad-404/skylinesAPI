const express = require('express')
const {
    registerUser,
    loginUser
} = require('../controllers/auth.js')

// const User = require('../models/User.js')
// const advancedResults = require('../middleware/advancedResults.js')

const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)

module.exports = router
