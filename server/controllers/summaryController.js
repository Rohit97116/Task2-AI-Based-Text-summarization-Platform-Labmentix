const AIService = require('../services/aiService');
const Summary = require('../models/Summary');
const Analytics = require('../models/Analytics');
const { extractTextFromPDF } = require('../utils/pdfUtil');
const { extractTextFromImage } = require('../utils/ocrUtil');
const { validateFile } = require('../utils/fileValidator');

async function createSummary(req, res) {
  try {
    const userId = req.user?._id; // Optional - for public endpoint
    const { text, summaryModes = ['short', 'medium'], language = 'en', provider = 'openai' } = req.body;
    let extractedText = text || '';

    // Handle file upload
    if (req.file) {
      await validateFile(req.file);

      if (req.file.mimetype === 'application/pdf') {
        extractedText += '\n' + await extractTextFromPDF(req.file.buffer);
      } else if (['image/jpeg', 'image/png', 'image/webp'].includes(req.file.mimetype)) {
        extractedText += '\n' + await extractTextFromImage(req.file.buffer);
      }
    }

    extractedText = extractedText.trim();
    if (!extractedText) {
      return res.status(400).json({ error: 'No text content to summarize' });
    }

    // Generate summaries in different modes
    const summaries = {};
    for (const mode of summaryModes) {
      summaries[mode] = await AIService.summarize(extractedText, 'medium', provider, mode);
    }

    // Extract additional insights
    const keywords = await AIService.extractKeywords(extractedText);
    const keyInsights = await AIService.generateInsights(extractedText);
    const actionItems = await AIService.extractActionItems(extractedText);
    const sentiment = await AIService.analyzeSentiment(extractedText);

    // Create summary record (only save to DB if user exists)
    if (userId) {
      const summary = new Summary({
        userId,
        title: req.body.title || 'Untitled Summary',
        originalText: extractedText,
        summaries,
        keywords: keywords.split(',').map(k => k.trim()),
        keyInsights,
        actionItems,
        sentiment,
        language,
        aiProvider: provider,
        sourceFile: req.file ? {
          name: req.file.originalname,
          type: req.file.mimetype,
          size: req.file.size,
          uploadedAt: new Date()
        } : null
      });

      await summary.save();

      // Update analytics
      const updateObj = {
        $inc: {
          summariesCreated: 1
        }
      };

      if (summaryModes && summaryModes.length > 0) {
        updateObj.$inc[`summaryModeUsage.${summaryModes[0]}`] = 1;
      }

      if (req.file) {
        updateObj.$inc[`fileTypeUsage.${getFileType(req.file.mimetype)}`] = 1;
      }

      await Analytics.findOneAndUpdate(
        { userId, date: new Date().toDateString() },
        updateObj,
        { upsert: true }
      );

      return res.json({
        success: true,
        summary: summary.toObject()
      });
    }

    // For public endpoint - return summary without saving to DB
    return res.json({
      success: true,
      summary: {
        summaries,
        keywords: keywords.split(',').map(k => k.trim()),
        keyInsights,
        actionItems,
        sentiment,
        originalText: extractedText.substring(0, 500) // Return first 500 chars
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getSummaries(req, res) {
  try {
    const userId = req.user._id;
    const { skip = 0, limit = 10, search = '', filter = {} } = req.query;

    const query = { userId };
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const summaries = await Summary.find(query)
      .skip(Number(skip))
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Summary.countDocuments(query);

    res.json({
      summaries,
      total,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getSummaryById(req, res) {
  try {
    const summary = await Summary.findById(req.params.id);
    
    if (!summary || summary.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({ error: 'Summary not found' });
    }

    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateSummary(req, res) {
  try {
    const { id } = req.params;
    const { title, tags, isFavorite, isBookmarked } = req.body;

    const summary = await Summary.findByIdAndUpdate(
      id,
      { title, tags, isFavorite, isBookmarked, updatedAt: new Date() },
      { new: true }
    );

    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteSummary(req, res) {
  try {
    const { id } = req.params;
    await Summary.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

function getFileType(mimetype) {
  const typeMap = {
    'application/pdf': 'pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
    'text/plain': 'txt',
    'image/jpeg': 'image',
    'image/png': 'image',
    'image/webp': 'image',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx'
  };
  return typeMap[mimetype] || 'other';
}

module.exports = {
  createSummary,
  getSummaries,
  getSummaryById,
  updateSummary,
  deleteSummary
};
