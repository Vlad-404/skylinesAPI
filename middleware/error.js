const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    let error = { ...err };

    error.message = err.message;

    console.log('Console log of the error: ', err.message, 'For full error report, change middleware/error.js!')

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        const message = `Resource not found`;
        error = new ErrorResponse(message, 404);
    };
    
    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Server error'
    })
};

module.exports = errorHandler;
