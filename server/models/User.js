const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: String,
  avatar: String,
  plan: {
    type: String,
    enum: ['free', 'pro', 'enterprise'],
    default: 'free'
  },
  tokensUsed: {
    type: Number,
    default: 0
  },
  tokenLimit: {
    type: Number,
    default: 10000
  },
  summariesCreated: {
    type: Number,
    default: 0
  },
  preferences: {
    defaultAIProvider: {
      type: String,
      enum: ['openai', 'gemini', 'huggingface'],
      default: 'openai'
    },
    defaultSummaryLength: {
      type: String,
      enum: ['short', 'medium', 'long'],
      default: 'medium'
    },
    defaultLanguage: {
      type: String,
      default: 'en'
    },
    theme: {
      type: String,
      enum: ['dark', 'light'],
      default: 'dark'
    }
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

module.exports = mongoose.model('User', userSchema);
