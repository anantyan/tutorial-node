const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');

const redisClient = require('./redis.config');

const errorHandler = (req, res) => {
  res.status(429);
  res.render('error', {message: "Terlalu melampui batas akses api! Tunggu 15 Menit", error: {status: 429}});
}
const rateLimiter = rateLimit({
  store: new RedisStore({
    client: redisClient,
    expiry: 60*15
  }),
  max: 5,
  handler: errorHandler
});

module.exports = rateLimiter