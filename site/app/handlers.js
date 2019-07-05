module.exports = {
  // User serialisation / deserialisation is simple one-to-one mappin
  mapUser : function (user, done) {
    done(null, user)
  },

  callback : function(req, res) {
    res.redirect(req.body.RelayState || '/');
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
    if (req.isAuthenticated()) {
      next()
    } else {
      res.redirect('/login?destination=' + req.path)
    }
  }
}

