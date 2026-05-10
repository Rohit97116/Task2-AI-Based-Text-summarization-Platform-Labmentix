const User = require('../models/User');
const Analytics = require('../models/Analytics');

async function getUser(req, res) {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateUser(req, res) {
  try {
    const { preferences, name } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { preferences, name, updatedAt: new Date() },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAnalytics(req, res) {
  try {
    const userId = req.user._id;
    const { startDate, endDate } = req.query;

    const query = { userId };
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const analytics = await Analytics.find(query).sort({ date: -1 });
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getUser,
  updateUser,
  getAnalytics
};
