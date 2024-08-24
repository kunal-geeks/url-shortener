const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortCode: { type: String, unique: true, required: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date }, // Optional expiration
  visitCount: { type: Number, default: 0 },
  uniqueVisitors: { type: Number, default: 0 },
  deviceBreakdown: {
    desktop: { type: Number, default: 0 },
    mobile: { type: Number, default: 0 },
  },
}, { timestamps: true });

const Url = mongoose.model('Url', urlSchema);
module.exports = Url;
