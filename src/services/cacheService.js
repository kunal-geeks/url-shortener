const { createClient } = require('redis');
const { promisify } = require('util');

const client = createClient({ url: process.env.REDIS_URL });

client.on('error', err => console.log('Redis Client Error', err));

(async () => {
    await client.connect();
})();

client.on('connect', () => console.log('Connected to Redis'))

const getAsync = promisify(client.get).bind(client);
const setexAsync = promisify(client.setEx).bind(client);

module.exports = {
    get: getAsync,
    setex: setexAsync,
  };


