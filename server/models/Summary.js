const mongoose = require('mongoose');

const summarySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  originalText: {
    type: String,
    required: true
  },
  summaries: {
    short: String,
    medium: String,
    long: String,
    bullet: String,
    academic: String,
    business: String
  },
  keyInsights: [String],
  keywords: [String],
  actionItems: [String],
  sentiment: {
    type: String,
    enum: ['positive', 'neutral', 'negative']
  },
  tone: String,
  readabilityScore: Number,
  language: {
    type: String,
    default: 'en'
  },
  sourceFile: {
    name: String,
    type: String,
    size: Number,
    uploadedAt: Date
  },
  aiProvider: {
    type: String,
    enum: ['openai', 'gemini', 'huggingface'],
    default: 'openai'
  },
  tokensUsed: Number,
  tags: [String],
  isFavorite: {
    type: Boolean,
    default: false
  },
  isBookmarked: {
    type: Boolean,
    default: false
  },
  exports: {
    pdf: String,
    docx: String,
    markdown: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Summary', summarySchema);
