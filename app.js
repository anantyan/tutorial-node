const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const csrf = require('csurf');
const methodOverride = require('method-override');
const httpsRedirect = require('express-naked-redirect');

const indexRouter = require('./routes/index.router');
const sessionConfig = require('./config/session.config');
const helmetConfig = require('./config/helmet.config')

const app = express();

/* CONFIGURE PROXY */
app.set('trust proxy', 1);

/* VIEW ENGINE SETUP */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'public')));

/* HTTP TO HTTPS CONNECTION */
/* app.use(httpsRedirect({
  subDomain: 'www',
  protocol: 'https'
})); */

/* HELMETJS */
app.use(helmetConfig())

/* METHOD OVERRIDE */
app.use(methodOverride('_method')); // method override for API in Form HTML

/* SESSION EXPRESS */
app.use(sessionConfig.data);
app.use((req, res, next) => {
  res.locals.logged = false
  res.locals.userID = null
  next()
})

/* CSURF */
app.use(csrf({cookie: true}));
app.use((err, req, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') return next(err)
  res.status(403)
  res.render('error', {message: 'Opps Invalid Token CSRF!', error: {status: 403}});
});

/* ROUTER */
app.use('/', indexRouter);

/* CATCH 404 AND FORWARD ERROR HANDLER */
app.use((req, res, next) => {
  next(createError(404));
});

/* ERROR HANDLER */
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
