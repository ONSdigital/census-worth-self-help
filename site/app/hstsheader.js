const hsts = require("hsts")

module.exports = {
    default : function(config) {
      return function(req, res, next){
        res.setHeader('Strict-Transport-Security', 'max-age: 15552000; includeSubDomains')
        next()
      }
    }
   }