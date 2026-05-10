const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 20 * 1024 * 1024 } });
const controller = require('../controllers/summarizeController');

router.post('/', upload.single('file'), controller.handleSummarize);

module.exports = router;
