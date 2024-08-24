const express = require('express');
const { shortenUrl, redirectUrl, getAnalytics } = require('../../controllers/urlController');

const router = express.Router();

// POST request to shorten URL
router.post('/shorten', shortenUrl);

// GET request to redirect using the short code
router.get('/:shortCode', redirectUrl);

// GET request to retrieve analytics
router.get('/analytics/:shortCode', getAnalytics);

module.exports = router;
