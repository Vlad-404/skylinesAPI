const ErrorResponse = require('../utils/errorResponse.js')
const asyncHandler = require('../middleware/async.js')

const Broken = require('../models/Broken.js')

// @desc    Get all broken mods
// @route   GET /broken
// @access  Public
exports.getBroken = async (req, res, next) => {
    res.status(200).json(res.advancedResults);
};

// @desc    Get a single mod
// @route   GET /broken/:id
// @access  Public
exports.getOneBroken = asyncHandler(async (req, res, next) => {
    const mod = await Broken.findById(req.params.id)

    if(!mod) {
        return next(
            new ErrorResponse(
                `A mod with ID of '${req.params.id}' doesn't exist in this database. Please check your request.`,
                404
            )
        )
    }

    res.status(200).json({
        success: true,
        msg: 'Mod successfully fetched!',
        data: mod
    })
})

// @desc    Add broken mod
// @route   POST /broken
// @access  Private
exports.addBroken = asyncHandler(async (req, res, next) => {
    const modData = await req.body;

    const exists = await Broken.findById(modData._id)

    if(exists) {
        return next(
            new ErrorResponse(
                `Cannot add. A mod with ID of '${modData._id}' already exists. Try editing the data instead.`,
                409
            )
        )
    }

    const addedMod = await Broken.create(modData)

    res.status(201).json({
        success: true,
        msg: 'Mod successfully added',
        data: addedMod
    })
})

// @desc    Modify a broken mod
// @route   PUT /broken/:id
// @access  Private
exports.updateBroken = asyncHandler(async (req, res, next) => {
    const modData = await req.body
    const modId = req.params.id

    // Checks if the ID has changed and if ID is a number
    // if (modData._id) {
    //     return next(
    //         new ErrorResponse(
    //             `You cannot change the mod ID!`,
    //             400
    //         )
    //     )
    // }

    let mod = await Broken.findById(modId)

    if(!mod) {
        return next(
            new ErrorResponse(
                `A mod with ID of '${modId}' doesn't exist. Please check your request.`,
                404
            )
        )
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
})

// @desc    Delete broken mod
// @route   DELETE /broken/:id
// @access  Private
exports.deleteBroken = asyncHandler(async (req, res, next) => {    
    const modId = await req.params.id

    const mod = await Broken.findByIdAndDelete(modId)

    if(!mod) {
        return next(
            new ErrorResponse(
                `A mod with ID of '${modId}' doesn't exist. Please check your request.`,
                404
            )
        )
    }

    res.status(200).json({
        success: true,
        msg: `Mod ${modId} successfully deleted`
    })
})
