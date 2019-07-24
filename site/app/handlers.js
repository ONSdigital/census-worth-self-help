const bcrypt = require('bcrypt')

const destinationRegex = /^[a-z0-9-]+$/
const articleNameRegex = /[^a-z0-9-]*([a-z0-9-]+)\/$/
const COOKIE_SECRET = process.env.COOKIE_SECRET

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

// var validSecret = bcrypt.hash(Date.now() + COOKIE_SECRET, 10)

let validSecret = ""

const createValidSecret = () => {
  validSecret = bcrypt.hashSync(Date.now() + COOKIE_SECRET, 10)
  return validSecret
}

module.exports = {
  // User serialisation / deserialisation is simple one-to-one mappin
  mapUser : function (user, done) {
    done(null, user)
  },

  callback : function(req, res) {
    res.redirect('/' + sanitizeDestination(req.body.RelayState));
  },

  createValidSecret,

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
    console.log(validSecret)
    if (req.isAuthenticated() && req.user.secret == validSecret) {
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

