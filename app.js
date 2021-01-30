const express = require('express');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const csrf = require('csurf');
const helmet = require('helmet');
const path = require('path');
const app = express();
const {indexRouter} = require('./routes/index.router.js');

const ninetyDaysInMilliseconds = 90*24*60*60;

app.use('/static', express.static(path.join(__dirname, 'public')));

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

/* BODY PARSER */
app.use(bodyParser.urlencoded({extended: false})); // body parsing data

/* COOKIE PARSER */
app.use(cookieParser()); // cookie in enabled

/* CSURF */
app.use(csrf({cookie: true}));
app.use((err, req, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') return next(err)
  res.status(403)
  res.send({status_code: 403, message: 'Form invalid CSRF token!'}) 
}); // error handle csrf

app.use(indexRouter);
app.use('*', (req, res) => {
  res.status(404);
  res.send({status_code: 404, message: 'Oops! wrong bro/sis!'});
});
app.listen(3000);