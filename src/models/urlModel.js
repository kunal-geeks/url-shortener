const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now, expires: '7d' }, // URL expiration
});

module.exports = mongoose.model('Url', UrlSchema);
