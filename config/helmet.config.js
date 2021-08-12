const helmet = require('helmet')

const ninetyDaysInMilliseconds = 90*24*60*60;

helmet.hidePoweredBy() // for hide powered by language
helmet.frameguard({
  action:'deny'
}) // for prevent guard iframe
helmet.xssFilter() // for xss filter browser
helmet.noSniff() // for sniffing MIME content-type
helmet.ieNoOpen() // for download open tab
helmet.hsts({
  maxAge:ninetyDaysInMilliseconds, 
  force:true
})
helmet.dnsPrefetchControl()
helmet.contentSecurityPolicy({
  directives: { 
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "http://localhost:8080"] 
  }
})

module.exports = helmet