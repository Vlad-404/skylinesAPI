const ErrorResponse = require('../utils/errorResponse.js')
const asyncHandler = require('../middleware/async.js')

const User = require('../models/User.js')

// @desc    Register user
// @route   POST /auth/register
// @access  Public
exports.registerUser = asyncHandler(async(req, res, next) => {
    const newUser = await req.body;

    if(newUser.name.length > 50) {
        return next(
            new ErrorResponse(
                'The name cannot be longer than 50 characters',
                400
            )
        )
    };

    // Create a user
    const user = await User.create(newUser);

    sendTokenResponse(user, 201, res, 'registered.');
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

    sendTokenResponse(user, 200, res, 'logged in.');
});

// @desc    Logout current user
// @route   GET /auth/logout
// @access  Private
exports.logout = asyncHandler(async(req, res, next) => {
    // Removes the cookie to log out the user
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: `User logged out.`,
        data: {}
    });
})
// Get current user(self)
// @desc    Get current user(self)
// @route   GET /auth/me
// @access  Private
exports.getMe = asyncHandler(async(req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        message: `Currently logged in user: ${req.user.name}`,
        data: user
    });
});
// Update details
// Update password
// Forgot password
// Password reset

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res, message) => {
    // Create token
    const token = user.getSignedJwtToken();

    const options = {
    expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true
    };

    if(process.env.NODE_ENV === 'production') {
        options.secure = true
    }

    res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
        success: true,
        message: 'User ' + message,
        token
    });

};