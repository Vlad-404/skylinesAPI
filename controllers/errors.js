const ErrorResponse = require('../utils/errorResponse.js')

// @desc    Check if ID is properly formatted
// @route   ALL /broken/:id
// @access  Private
exports.checkId = (req, res, next) => {
    if(req.params.id && isNaN(req.params.id)) {
        return next(
            new ErrorResponse(
                `A mod with ID of '${req.params.id}' isn't properly formatted!`,
                400
            )
        )
    }

    next();
}