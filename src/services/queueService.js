const Queue = require('bull');
const visitQueue = new Queue('visitQueue', process.env.REDIS_URL);

visitQueue.process(async (job) => {
  const { shortCode, visitData } = job.data;
  // Process visit data (e.g., aggregate analytics)
  console.log(`Processing visit for ${shortCode}:`, visitData);
});

module.exports = visitQueue;
