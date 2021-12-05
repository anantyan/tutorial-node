/* const redis = require('redis');
const path = require('path');

const redisClient = redis.createClient({
  host: '127.0.0.1', // for localhost
  port: 6379, // for localhost */
  /* path: path.join(__dirname, '../../redis.sock'), */ // for global
  /* ttl: 60*60*24 // in second to 24 hours
}).on('connect', () => {
  console.log('Success write!');
}).on('error', (err) => {
  console.log('Error write!');
});

module.exports = redisClient */