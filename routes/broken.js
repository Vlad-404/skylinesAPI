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

const { protect } = require('../middleware/auth.js');

router
    .route('/')
    .get(advancedResults(Broken), getBroken)
    .post(protect, addBroken)

router
    .route('/:id')
    .get(getOneBroken)
    .put(protect, updateBroken)
    .delete(protect, deleteBroken)

module.exports = router;
