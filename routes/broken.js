const express = require('express');
const broken = require('../controllers/broken');

// const Broken = require('../models/Broken')

const router = express.Router();

router
    .route('/')
    .get(broken.getBroken)
    .post(broken.addBroken)

module.exports = router;
