const destinationRegex = /^[a-z0-9-\.\/]+$/
const pageNameRegex = /\/[^a-z0-9-\.\/]*([a-z0-9-\.\/]+)$/

// Note, the time here is in minutes
const milliseconds = (minutes) => minutes * 60 * 1000
const VALID_TOKEN_AGE = milliseconds(process.env.VALID_TOKEN_AGE || 5)
const CLOCK_CONTINGENCY = milliseconds(process.env.CLOCK_CONTINGENCY || -1)

const sanitizeDestination = function (destination) {
  if (!destination) {
    return ""
  }

  if (destination.match(destinationRegex)) {
    return destination
  }
  return ""
}

const extractPageName = function (path) {
  if (path.match(pageNameRegex)) {
    return pageNameRegex.exec(path)[1]
  }
  return false
}

const isTokenValid = (date) => {
  let delta = Date.now() - date
  return CLOCK_CONTINGENCY < delta && delta < VALID_TOKEN_AGE
}

const isAuthorizedImageUploadUser = (user) => {
  return !!user
}

module.exports = {
  // User serialisation / deserialisation is simple one-to-one mappin
  mapUser: function (user, done) {
    done(null, user)
  },

  callback: function (req, res) {
    res.redirect("/" + sanitizeDestination(req.body.RelayState))
  },

  logout: function (idpLogout) {
    return function (req, res) {
      req.logout()
      res.redirect(idpLogout)
    }
  },

  preAuthenticate: function (req, res, next) {
    req.query.RelayState = req.query.destination
    next()
  },

  milliseconds,

  requireAuthenticated: function (req, res, next) {
    if (req.isAuthenticated() && isTokenValid(req.user.date)) {
      next()
    } else {
      const destination = extractPageName(req.path)
      if (destination) {
        res.redirect("/login?destination=" + destination)
      } else {
        res.redirect("/login")
      }
    }
  },

  requireImageUploadAuthorized: function (req, res, next) {
    if (req.isAuthenticated() && isTokenValid(req.user.date)) {
      if(isAuthorizedImageUploadUser(req.user)) {
        next()
      } else {
        res.status(403)
        res.send()
      }
    } else {
      res.status(401)
      res.send()
    }    
  },
}
