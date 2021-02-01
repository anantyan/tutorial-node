const session = require('express-session');

const sessionConfig = {
  data: session({
    path: '/',
    secret: 'abcdefghijklmnopqrstuvwxyz1234567890',
    name: 'sessiontoken',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false, // if in production must using true
      sameSite: true,
      maxAge: 3600000
    }
  })
}

module.exports = sessionConfig