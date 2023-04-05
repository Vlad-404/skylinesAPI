const express = require('express');

const { checkId } = require('../controllers/errors.js');

const router = express.Router();

router
    .route('/:id')
    .get(checkId)
    .put(checkId)
    .delete(checkId)

module.exports = router;
