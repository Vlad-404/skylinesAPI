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
    } else if(req.cookies.token) {
        token = req.cookies.token;
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id);

        next();
    } catch (err) {
        // If no user logged in
        if(!req.user) {
            return next(
                new ErrorResponse(
                    'Please log in',
                    400
                )
            );
        } else {
            return next(
                new ErrorResponse(
                    'Account not authorized for this operation',
                    403
            ));
        }
    }
});

// Grant access to specific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorResponse(
                    `Account role of '${req.user.role}' not authorized for this operation`,
                    403
                )
            );
        }
        next();
    }
};
