const Url = require('../models/urlModel');
const Visit = require('../models/visitModel');

const processVisitData = async (shortCode, visitData) => {
  const url = await Url.findOne({ shortCode });
  if (!url) return;

  url.visitCount += 1;
  url.deviceBreakdown[visitData.deviceType] += 1;

  const uniqueVisitor = await Visit.findOne({ shortCode, ipAddress: visitData.ipAddress });
  if (!uniqueVisitor) {
    url.uniqueVisitors += 1;
  }

  await url.save();
};

async function getAnalyticsData(shortCode) {
  try {
    const visits = await Visit.find({ shortCode });
    if (!visits.length) return null;

    const totalVisits = visits.length;
    const uniqueVisitors = new Set(visits.map(v => v.ipAddress)).size;
    const deviceTypeCounts = visits.reduce((acc, visit) => {
      acc[visit.deviceType] = (acc[visit.deviceType] || 0) + 1;
      return acc;
    }, {});

    return {
      totalVisits,
      uniqueVisitors,
      deviceTypeCounts
    };
  } catch (err) {
    console.error('Error retrieving analytics data:', err);
    throw err;
  }
}

module.exports = { processVisitData, getAnalyticsData };
