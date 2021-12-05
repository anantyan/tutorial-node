const rateLimit = require('express-rate-limit');
/* const RedisStore = require('rate-limit-redis');

const redisClient = require('./redis.config'); */

const rateLimitWrite = rateLimit({
  /* store: new RedisStore({
    client: redisClient,
    expiry: 60*15 // 15 detik
  }), */
  windowMs: 60*15*1000, // 15 menit
  max: 200,
  handler: (req, res) => {
    res.status(429);
    res.render('error', {message: "Karena server kami kecil jadi kami batasin 200x kunjungan tiap 15 menit deh :( Tunggu 15 Menit ya :)", error: {status: 429}});
  }
});

const rateLimitRead = rateLimit({
  /* store: new RedisStore({
    client: redisClient,
    expiry: 60*15 // 15 detik
  }), */
  windowMs: 60*15*1000, // 15 menit
  max: 500,
  handler: (req, res) => {
    res.status(429);
    res.render('error', {message: "Karena server kami kecil jadi kami batasin 500x kunjungan tiap 15 menit deh :( Tunggu 15 Menit ya :)", error: {status: 429}});
  }
});

module.exports = { rateLimitRead, rateLimitWrite }