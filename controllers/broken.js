const Broken = require('../models/Broken.js')

// @desc    Get all broken mods
// @route   GET /broken
// @access  Public
exports.getBroken = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: 'Route for broken mods controller works!'
    })
}