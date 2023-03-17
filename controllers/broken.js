const Broken = require('../models/Broken.js')

// @desc    Get all broken mods
// @route   GET /broken
// @access  Public
exports.getBroken = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: 'Route to get all broken mods works!'
    })
}


// @desc    Add broken mod
// @route   POST /broken
// @access  Private
exports.addBroken = async (req, res, next) => {
    // const modData = await req.body;

    const mod = await Broken.create(req.body)

    res.status(200).json({
        success: true,
        msg: 'Mod successfully added',
        data: mod
    })
}
