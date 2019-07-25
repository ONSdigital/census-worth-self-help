const crypto = require('crypto');

const destinationRegex = /^[a-z0-9-]+$/
const articleNameRegex = /[^a-z0-9-]*([a-z0-9-]+)\/$/

// Note, the time here is in minutes
const cookieTimeout = process.env.COOKIE_TIMEOUT || 1
const validCookieAge = process.env.VALID_COOKIE_AGE || 1


const sanitizeDestination = function (destination) {
  if (!destination) {
    return ''
  }

  if (destination.match(destinationRegex)) {
    return destination + '/'
  }
  return ''
}

const extractArticleName = function (path) {
  if (path.match(articleNameRegex)) {
    return articleNameRegex.exec(path)[1]
  }
  return false
}

let calculateCookieTime = (secret) => 
  ((Date.now().toString() - secret) / (validCookieAge * 60 * 1000))


module.exports = {
  // User serialisation / deserialisation is simple one-to-one mappin
  mapUser : function (user, done) {
    done(null, user)
  },

  callback : function(req, res) {
    res.redirect('/' + sanitizeDestination(req.body.RelayState));
  },

  logout: function(idpLogout) {
    return function (req, res) {
      req.logout();
      res.redirect(idpLogout);
    }
  },

  preAuthenticate : function(req,res,next) {
    req.query.RelayState = req.query.destination;
    next();
  },

  requireAuthenticated : function(req, res, next) {

    validateToken = (secret) => {
      return calculateCookieTime(secret) < cookieTimeout
    }

    if (req.isAuthenticated() && validateToken(req.user.secret)) {
      next()
    } else {
      const destination = extractArticleName(req.path)
      if (destination) {
        res.redirect('/login?destination=' + destination)
      } else {
        res.redirect('/login')
      }
    }
  }
}

