const Queue = require('bull');
const logger = require('../utils/logger');
const processVisitData = require('../utils/analyticsHelper');

const visitQueue = new Queue('visitQueue', process.env.REDIS_URL);

visitQueue.process(async (job) => {
  try {
    const { shortCode, visitData } = job.data;
    await processVisitData(shortCode, visitData);
    logger.info(`Processed visit for ${shortCode}`);
  } catch (err) {
    logger.error(`Failed to process visit for ${shortCode}: ${err.message}`);
  }
});

module.exports = visitQueue;
