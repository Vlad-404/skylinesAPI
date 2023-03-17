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
    const modData = await req.body;

    const exists = await Broken.findById(modData._id)

    if(exists) {
        res.status(409).json({
            success: false,
            msg: `A mod with ID of '${modData._id}' already exists. Try editing the data instead.`
        })
    }

    const mod = await Broken.create(modData)

    res.status(201).json({
        success: true,
        msg: 'Mod successfully added',
        data: modData
    })
}

// @desc    Delete broken mod
// @route   DELETE /broken/:id
// @access  Private
exports.deleteBroken = async (req, res, next) => {
    const modId = await req.params.id

    const mod = await Broken.findByIdAndDelete(modId)

    res.status(200).json({
        success: true,
        msg: `Mod ${modId} successfully deleted`
    })
}
