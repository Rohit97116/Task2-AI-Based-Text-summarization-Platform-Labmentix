const express = require('express');
const multer = require('multer');
const authMiddleware = require('../middleware/auth');
const { summarizerLimiter } = require('../middleware/rateLimit');
const summaryController = require('../controllers/summaryController');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Public endpoint for landing page summarization (no auth required)
router.post(
  '/public',
  summarizerLimiter,
  upload.single('file'),
  summaryController.createSummary
);

// Protected endpoints
router.post(
  '/',
  authMiddleware,
  summarizerLimiter,
  upload.single('file'),
  summaryController.createSummary
);

router.get('/', authMiddleware, summaryController.getSummaries);
router.get('/:id', authMiddleware, summaryController.getSummaryById);
router.put('/:id', authMiddleware, summaryController.updateSummary);
router.delete('/:id', authMiddleware, summaryController.deleteSummary);

module.exports = router;
