const ErrorResponse = require('../utils/errorResponse.js')
const asyncHandler = require('../middleware/async.js')

const User = require('../models/User.js')

// @desc    Register user
// @route   POST /auth/register
// @access  Public
exports.registerUser = asyncHandler(async(req, res, next) => {
    const newUser = await req.body;

    // Create a user
    const user = await User.create(newUser);

    // Create token
    const token = user.getSignedJwtToken();

    res.status(201).json({
        success: true,
        message: `User '${user.name}' created`,
        token
    });
});

// @desc    Login user
// @route   POST /auth/login
// @access  Public
exports.loginUser = asyncHandler(async(req, res, next) => {
    const { email, password } = await req.body;

    // Validate email and password
    if (!email || !password) {
        return next(
            new ErrorResponse(
                'Please add both email AND password!',
                400
            )
        );
        
    };

    // Check if user exists
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
        return next(
            new ErrorResponse(
                `Wrong login details. Please check your email and/or password.`,
                401
            )
        );
    };

    // Check if the password matches
    const matches = await user.matchPassword(password);

    if(!matches) {
        return next(
            new ErrorResponse(
                `Wrong login details. Please check your email and/or password.`,
                401
            )
        );
    };

    // Create token
    const token = user.getSignedJwtToken();

    res.status(201).json({
        success: true,
        message: `User '${user.name}' logged in`,
        token
    });
});

// Log out
// Get current user(self)
// Update details
// Update password
// Forgot password
// Password reset
