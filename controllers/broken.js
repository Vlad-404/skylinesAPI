const Broken = require('../models/Broken.js')

// @desc    Get all broken mods
// @route   GET /broken
// @access  Public
exports.getBroken = async (req, res, next) => {
    const mods = await Broken.find()

    res.status(200).json({
        success: true,
        msg: 'Successfully fetched the list of broken mods!',
        count: mods.length,
        data: mods
    })
}

// @desc    Get a single mod
// @route   GET /broken/:id
// @access  Public
exports.getOneBroken = async (req, res, next) => {
    const mod = await Broken.findById(req.params.id)

    if(!mod) {
        return res.status(404).json({
            success: false,
            msg: `A mod with ID of '${req.params.id}' doesn't exist. Please check your request.`
        })
    }

    res.status(200).json({
        success: true,
        msg: 'Mod successfully fetched!',
        data: mod
    })
}

// @desc    Add broken mod
// @route   POST /broken
// @access  Private
exports.addBroken = async (req, res, next) => {
    const modData = await req.body;

    const exists = await Broken.findById(modData._id)

    if(exists) {
        return res.status(409).json({
            success: false,
            msg: `Cannot add. A mod with ID of '${modData._id}' already exists. Try editing the data instead.`
        })
    }

    const mod = await Broken.create(modData)

    res.status(201).json({
        success: true,
        msg: 'Mod successfully added',
        data: modData
    })
}

// @desc    Modify a broken mod
// @route   PUT /broken/:id
// @access  Private
exports.updateBroken = async (req, res, next) => {
    const modData = await req.body
    const modId = req.params.id
    let mod = await Broken.findById(modId)

    if(!mod) {
        return res.status(404).json({
            success: false,
            msg: `A mod with ID of '${modId}' doesn't exist. Please check your request.`
        })
    }

    mod = await Broken.findByIdAndUpdate(modId, modData, {
        new: true,
        runValidators: true
    })
    
    res.status(200).json({
        success: true,
        msg: `Mod with ID of '${modId}' successfully updated!`,
        data: mod
    })
}

// @desc    Delete broken mod
// @route   DELETE /broken/:id
// @access  Private
exports.deleteBroken = async (req, res, next) => {
    const modId = await req.params.id

    const mod = await Broken.findByIdAndDelete(modId)

    if(!mod) {
        return res.status(404).json({
            success: false,
            msg: `A mod with ID of '${modId}' doesn't exist. Please check your request.`
        })
    }

    res.status(200).json({
        success: true,
        msg: `Mod ${modId} successfully deleted`
    })
}
