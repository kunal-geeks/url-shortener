const Url = require('../models/urlModel');
const Visit = require('../models/visitModel');
const crypto = require('crypto');
const { processVisitData, getAnalyticsData } = require('../utils/analyticsHelper');
const cache = require('../services/cacheService');
const queue = require('../services/queueService');

// Shorten URL
exports.shortenUrl = async (req, res) => {
  try {
    const { originalUrl, customCode } = req.body;
    const shortCode = customCode || crypto.randomBytes(6).toString('hex');
    const url = new Url({ originalUrl, shortCode });
    await url.save();
    res.status(201).json({ shortCode });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Redirect URL
exports.redirectUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const url = await Url.findOne({ shortCode });
    if (!url) return res.status(404).json({ error: 'URL not found' });

    const userAgent = req.headers['user-agent'];
    const ipAddress = req.ip;
    const deviceType = req.headers['user-agent'].includes('Mobi') ? 'mobile' : 'desktop';

    const visit = new Visit({ shortCode, userAgent, ipAddress, deviceType });
    await visit.save();

    queue.add({ shortCode, visitData: { userAgent, ipAddress, deviceType } });

    res.redirect(302, url.originalUrl);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get Analytics
exports.getAnalytics = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const cacheKey = `analytics:${shortCode}`;
    const cachedData = await cache.get(cacheKey);

    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }

    const analytics = await getAnalyticsData(shortCode);
    await cache.setex(cacheKey, 3600, JSON.stringify(analytics));
    res.status(200).json(analytics);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
