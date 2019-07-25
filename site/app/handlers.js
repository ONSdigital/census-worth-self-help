const crypto = require('crypto');

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

module.exports = {
  // User serialisation / deserialisation is simple one-to-one mappin
  mapUser : function (user, done) {
    done(null, user)
  },

  callback : function(req, res) {
    res.redirect('/' + sanitizeDestination(req.body.RelayState));
  },

  createValidSecret : function ()  {
    return crypto.createCipher("aes-256-ctr", COOKIE_SECRET).update(Date.now().toString(), "utf-8", "hex");
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
      decodedSecret = crypto.createDecipher("aes-256-ctr", COOKIE_SECRET).update(secret, "hex", "utf-8")
      return ((Date.now().toString() - decodedSecret) / (1 * 60 * 1000) < 1)
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

