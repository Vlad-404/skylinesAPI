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

router
    .route('/')
    .get(advancedResults(Broken), getBroken)
    .post(addBroken)

router
    .route('/:id')
    .get(getOneBroken)
    .put(updateBroken)
    .delete(deleteBroken)

module.exports = router;
