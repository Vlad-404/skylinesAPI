const ErrorResponse = require('../utils/errorResponse.js')

const User = require('../models/User.js')

// @desc    Register user
// @route   POST /auth/register
// @access  Public
exports.registerUser = async (req, res, next) => {
    // const newUser = await req.body
    const { name, email, password, role } = req.body

    // User.create(newUser)
    const user = await User.create({
        name,
        email,
        password,
        role
    })

    res.status(201).json({
        success: true,
        message: 'User created',
        data: user
    })
}
// Login User
// Log out
// Get current user(self)
// Update details
// Update password
// Forgot password
// Password reset