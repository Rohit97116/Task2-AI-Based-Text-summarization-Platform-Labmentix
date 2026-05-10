const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

const summarizerLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: 'Too many summarization requests. Please try again later.',
  skip: (req) => req.user?.plan === 'enterprise',
});

module.exports = { limiter, summarizerLimiter };
