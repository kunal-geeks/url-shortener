const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  shortCode: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  userAgent: { type: String, required: true },
  ipAddress: { type: String, required: true },
  deviceType: { type: String, required: true },
}, { timestamps: true });

const Visit = mongoose.model('Visit', visitSchema);
module.exports = Visit;
