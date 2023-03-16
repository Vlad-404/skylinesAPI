// const Broken = require('../models/Broken.js')

// @desc    Get all broken mods
// @route   GET /broken
// @access  Public
exports.getBroken = (req, res, next) => {
    // res.send("Route for broken mods controller works!")
    res.status(200).json({
        success: true,
        msg: 'Route to get all broken mods works!'
    })
}


// @desc    Add broken mod
// @route   POST /broken
// @access  Private
exports.addBroken = (req, res, next) => {
    // res.send("Route for broken mods controller works!")
    res.status(200).json({
        success: true,
        msg: 'Route for add a broken mod works!'
    })
}
