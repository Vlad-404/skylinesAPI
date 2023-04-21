const express = require('express');
const {
    getBroken,
    getOneBroken,
    addBroken,
    updateBroken,
    deleteBroken
 } = require('../controllers/broken');

const advancedResults = require('../middleware/advancedResults.js')
const Broken = require('../models/Broken')

const router = express.Router();

const { protect, authorize } = require('../middleware/auth.js');

router
    .route('/')
    .get(advancedResults(Broken, { path: 'addedBy', select: 'name role' }), getBroken)
    .post(protect, authorize('moderator', 'admin'), addBroken)

router
    .route('/:id')
    .get(getOneBroken)
    .put(protect, authorize('moderator', 'admin'), updateBroken)
    .delete(protect, authorize('moderator', 'admin'), deleteBroken)

module.exports = router;
