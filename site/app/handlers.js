const destinationRegex = /^[a-z0-9-]+$/
const articleNameRegex = /[^a-z0-9-]*([a-z0-9-]+)\/$/

// Note, the time here is in minutes
const validCookieAge = process.env.VALID_COOKIE_AGE || 5
const milliseconds = (minutes) => minutes * 60 * 1000 
const clock_contingency = process.env.CLOCK_CONTINGENCY || -1

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

let isTokenValid = (date) => 
  (clock_contingency < (Date.now().toString() - date) < milliseconds(validCookieAge))

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
    if (req.isAuthenticated() && isTokenValid (req.user.date)) {
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

