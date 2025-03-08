const express = require('express');
const router = express.Router();
const exampleController = require('../controllers/exampleController');

// Routes
router.get('/', exampleController.getAllExamples);

module.exports = router;