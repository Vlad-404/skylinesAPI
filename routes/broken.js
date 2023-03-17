const express = require('express');
const broken = require('../controllers/broken');

// const Broken = require('../models/Broken')

const router = express.Router();

router
    .route('/')
    .get(broken.getBroken)
    .post(broken.addBroken)

router
    .route('/:id')
    .get(broken.getOneBroken)
    .put(broken.updateBroken)
    .delete(broken.deleteBroken)

module.exports = router;
