const express = require('express');
const getBroken = require('../controllers/broken');

// const Broken = require('../models/Broken')

const router = express.Router();

router.get(getBroken);

module.exports = router;
