const logger = require('../utils/logger');
const Url = require('../models/urlModel');
const Visit = require('../models/visitModel');
const crypto = require('crypto');
const { processVisitData, getAnalyticsData } = require('../utils/analyticsHelper');
const cache = require('../services/cacheService');
const queue = require('../services/queueService');

exports.shortenUrl = async (req, res) => {
  try {
    const { originalUrl, customCode, expiration } = req.body;
    let shortCode = customCode || crypto.randomBytes(6).toString('hex');

    // Ensure shortCode is unique
    const existingUrl = await Url.findOne({ shortCode });
    if (existingUrl) {
      logger.warn(`Short code ${shortCode} already exists`);
      return res.status(409).json({ error: 'Short code already exists' });
    }

    const url = new Url({ originalUrl, shortCode });

    if (expiration) {
      url.expiresAt = new Date(Date.now() + expiration * 1000);
    }

    await url.save();
    logger.info(`URL shortened: ${shortCode}`);
    res.status(201).json({ shortCode });
  } catch (err) {
    logger.error('Server error: ' + err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.redirectUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const url = await Url.findOne({ shortCode });

    if (!url) {
      logger.warn(`URL not found for short code: ${shortCode}`);
      return res.status(404).json({ error: 'URL not found' });
    }

    if (url.expiresAt && new Date() > url.expiresAt) {
      logger.warn(`URL expired for short code: ${shortCode}`);
      return res.status(410).json({ error: 'URL expired' });
    }

    const userAgent = req.headers['user-agent'];
    const ipAddress = req.ip;
    const deviceType = userAgent.includes('Mobi') ? 'mobile' : 'desktop';

    const visit = new Visit({ shortCode, userAgent, ipAddress, deviceType });
    await visit.save();

    queue.add({ shortCode, visitData: { userAgent, ipAddress, deviceType } });

    logger.info(`Redirecting short code: ${shortCode} to ${url.originalUrl}`);
    res.redirect(302, url.originalUrl);
  } catch (err) {
    logger.error('Server error: ' + err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// src/controllers/urlController.js

exports.getAnalytics = async (req, res) => {
  try {
    console.log('Fetching analytics for:', req.params.shortCode);

    const { shortCode } = req.params;
    const cacheKey = `analytics:${shortCode}`;
    console.log('Cache key:', cacheKey);
    const cachedData = await cache.get(cacheKey);
    console.log('Cached data:', cachedData);
    if (cachedData) {
      console.log('Returning cached data');
      return res.status(200).json(JSON.parse(cachedData));
    }

    const analytics = await getAnalyticsData(shortCode);
    if (!analytics) {
      console.log('Analytics not found for shortCode:', shortCode);
      return res.status(404).json({ error: 'Short code not found' });
    }

    console.log('Caching and returning analytics');
    await cache.setex(cacheKey, 3600, JSON.stringify(analytics));
    res.status(200).json(analytics);
  } catch (err) {
    console.error('Error retrieving analytics data:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
