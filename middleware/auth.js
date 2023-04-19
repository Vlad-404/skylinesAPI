const jwt = require ('jsonwebtoken');
const asyncHandler = require('./async.js');
const ErrorResponse = require('../utils/errorResponse.js');

const User = require('../models/User.js');

// Protect routes
exports.protect = asyncHandler(async(req, res, next) => {
    let token;

    // Using local storage for token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    // Using a cookie as a token
    // else if(req.cookies.token) {
    //     token = req.cookies.token;
    // }

    // Make sure token exists
    if(!token) {
        return next(new ErrorResponse(
            'Not authorized for this operation',
            401
        ));
    };

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log(decoded);

        req.user = await User.findById(decoded.id);

        next()
    } catch (err) {
        return next(new ErrorResponse(
            'Not authorized for this operation',
            401
        ));
    }
});
