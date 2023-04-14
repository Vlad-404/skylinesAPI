const ErrorResponse = require('../utils/errorResponse.js')
const asyncHandler = require('../middleware/async.js')

const User = require('../models/User.js')

// @desc    Register user
// @route   POST /auth/register
// @access  Public
exports.registerUser = asyncHandler(async(req, res, next) => {
    const newUser = await req.body

    const user = await User.create(newUser)

    // Create token
    const token = user.getSignedJwtToken();

    res.status(201).json({
        success: true,
        message: `User '${user.name}' created`,
        token
    })
})
// Login User
// Log out
// Get current user(self)
// Update details
// Update password
// Forgot password
// Password reset
