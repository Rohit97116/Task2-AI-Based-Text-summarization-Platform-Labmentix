const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  summariesCreated: {
    type: Number,
    default: 0
  },
  tokensUsed: {
    type: Number,
    default: 0
  },
  filesProcessed: {
    type: Number,
    default: 0
  },
  aiProviderUsage: {
    openai: { type: Number, default: 0 },
    gemini: { type: Number, default: 0 },
    huggingface: { type: Number, default: 0 }
  },
  fileTypeUsage: {
    pdf: { type: Number, default: 0 },
    docx: { type: Number, default: 0 },
    txt: { type: Number, default: 0 },
    image: { type: Number, default: 0 },
    pptx: { type: Number, default: 0 }
  },
  summaryModeUsage: {
    short: { type: Number, default: 0 },
    medium: { type: Number, default: 0 },
    long: { type: Number, default: 0 },
    bullet: { type: Number, default: 0 },
    academic: { type: Number, default: 0 },
    business: { type: Number, default: 0 }
  },
  averageProcessingTime: Number,
  exports: {
    pdf: { type: Number, default: 0 },
    docx: { type: Number, default: 0 }
  }
});

module.exports = mongoose.model('Analytics', analyticsSchema);
