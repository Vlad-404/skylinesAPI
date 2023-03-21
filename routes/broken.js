const express = require('express');
const {
    getBroken,
    getOneBroken,
    addBroken,
    updateBroken,
    deleteBroken
 } = require('../controllers/broken');

// const Broken = require('../models/Broken')

const router = express.Router();

router
    .route('/')
    .get(getBroken)
    .post(addBroken)

router
    .route('/:id')
    .get(getOneBroken)
    .put(updateBroken)
    .delete(deleteBroken)

module.exports = router;
