const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    let error = { ...err };

    error.message = err.message;

    console.log('Console log of the error: ', err.message, 'For full error report, change middleware/error.js!')

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        const message = 'One of your values is not formatted properly! Please check the fields.';
        error = new ErrorResponse(message, 404);
    };

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400);
    }
    
    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Server error'
    });
};

module.exports = errorHandler;
