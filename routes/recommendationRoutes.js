const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { getRecommendations } = require('../controllers/recommendationController');

const router = express.Router();

// Route for getting pet recommendations
router.get('/', protect, getRecommendations);

module.exports = router;
