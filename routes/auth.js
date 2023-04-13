const express = require('express')
const {
    registerUser
} = require('../controllers/auth.js')

// const User = require('../models/User.js')
// const advancedResults = require('../middleware/advancedResults.js')

const router = express.Router()

router.route('/register').post(registerUser)

module.exports = router
