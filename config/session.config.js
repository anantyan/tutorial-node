const session = require('express-session');
/* const RedisStore = require('connect-redis')(session);

const redisClient = require('./redis.config'); */

const sessionConfig = {
  data: session({
    /* store: new RedisStore({client: redisClient}), */
    path: '/',
    secret: 'abcdefghijklmnopqrstuvwxyz1234567890',
    name: 'sessiontoken',
    resave: false,
    saveUninitialized: true,
    proxy: true,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: true,
      maxAge: 60000*60*24 // in milisecond to 24 hours
    }
  })
}

module.exports = sessionConfig