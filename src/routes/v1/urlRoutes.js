const express = require('express');
const { shortenUrl, redirectUrl, getAnalytics } = require('../../controllers/urlController');

const router = express.Router();

router.post('/shorten', shortenUrl);
router.get('/:shortCode', redirectUrl);
router.get('/analytics/:shortCode', getAnalytics);

module.exports = router;
