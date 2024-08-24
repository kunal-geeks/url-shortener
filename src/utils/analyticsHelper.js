const Visit = require('../models/visitModel');

// Get detailed analytics
exports.getAnalyticsData = async (shortCode) => {
  const visits = await Visit.find({ shortCode });
  const totalVisits = visits.length;
  const uniqueVisitors = [...new Set(visits.map(v => v.ipAddress))].length;
  const deviceBreakdown = visits.reduce((acc, visit) => {
    acc[visit.deviceType] = (acc[visit.deviceType] || 0) + 1;
    return acc;
  }, {});

  return {
    totalVisits,
    uniqueVisitors,
    deviceBreakdown,
  };
};
