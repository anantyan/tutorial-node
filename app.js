const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const csrf = require('csurf');
const helmet = require('helmet');
const methodOverride = require('method-override');
const httpsRedirect = require('express-naked-redirect');

const indexRouter = require('./routes/index.router');
const sessionConfig = require('./config/session.config');

const app = express();
const ninetyDaysInMilliseconds = 90*24*60*60;

app.set('trust proxy', 1);

/* VIEW ENGINE SETUP */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'public')));
// app.use(httpsRedirect({
//   subDomain: 'www',
//   protocol: 'https'
// }));

/* HELMETJS */
app.use(helmet.hidePoweredBy()); // for hide powered by language
app.use(helmet.frameguard({
  action:'deny'
})); // for prevent guard iframe
app.use(helmet.xssFilter()); // for xss filter browser
app.use(helmet.noSniff()); // for sniffing MIME content-type
app.use(helmet.ieNoOpen()); // for download open tab
app.use(helmet.hsts({
  maxAge:ninetyDaysInMilliseconds, 
  force:true
}));
app.use(helmet.dnsPrefetchControl());
app.use(helmet.contentSecurityPolicy({
  directives: { 
    defaultSrc: ["'self'"], scriptSrc: ["'self'", "https://cdnjs.com"] 
  }
}));

/* METHOD OVERRIDE */
app.use(methodOverride('_method')); // method override for API in Form HTML

/* SESSION EXPRESS */
app.use(sessionConfig.data);

/* CSURF */
// app.use(csrf({cookie: true}));
// app.use((err, req, res, next) => {
//   if (err.code !== 'EBADCSRFTOKEN') return next(err)
//   res.status(403)
//   res.render('error', {message: 'Opps Invalid Token CSRF!', error: {status: 403}});
// }); // error handle csrf

/* ROUTER */
app.use('/', indexRouter);

/* CATCH 404 AND FORWARD ERROR HANDLER */
app.use((req, res, next) => {
  next(createError(404));
});

/* ERROR HANDLER */
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
