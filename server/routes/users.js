const express = require('express');
const authMiddleware = require('../middleware/auth');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/profile', authMiddleware, userController.getUser);
router.put('/profile', authMiddleware, userController.updateUser);
router.get('/analytics', authMiddleware, userController.getAnalytics);

module.exports = router;
