const mongoose = require('mongoose');

const VisitSchema = new mongoose.Schema({
  shortCode: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  userAgent: { type: String },
  ipAddress: { type: String },
  deviceType: { type: String }, // e.g., 'desktop' or 'mobile'
});

module.exports = mongoose.model('Visit', VisitSchema);
