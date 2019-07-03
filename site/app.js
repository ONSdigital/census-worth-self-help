require('dotenv').config({ silent: true })

const express = require('express');
const SamlStrategy = require('passport-saml').Strategy
const passport = require('passport')
const fs = require('fs');
const app = express();
const cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const COOKIE_SECRET = process.env.COOKIE_SECRET
const IDP_ENTRY_POINT = process.env.IDP_ENTRY_POINT
const SP_CALLBACK_URL = process.env.SP_CALLBACK_URL
const SP_ENTITY_ID = process.env.SP_ENTITY_ID

// Serve static files from './public'
app.use(cookieParser());
app.use(cookieSession({ name: 'token', secret: COOKIE_SECRET }));
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize())
app.use(passport.session())

const spCertificate = fs.readFileSync('.deploy/sp/sp.certificate', 'utf-8');
const spKey = fs.readFileSync('.deploy/sp/sp.key', 'utf-8');
const idpCertificate = fs.readFileSync('.deploy/idp/idp.certificate','utf-8')
const samlStrategy = new SamlStrategy({
    callbackUrl: SP_CALLBACK_URL,
    cert: idpCertificate,
    entryPoint: IDP_ENTRY_POINT,
    identifierFormat:'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress',
    issuer: SP_ENTITY_ID,
    privateCert: spKey
  },
  function(profile, done) {
    // Log statement to be removed before merge to master
    console.log(`Profile : ${JSON.stringify(profile)}`)
    done(null, {
      nameID: profile.nameID,
      nameIDFormat: profile.nameIDFormat,
      email: profile.email
    })
  })

passport.use(samlStrategy);
passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null, user)
})

app.post('/sso/callback',
  passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
  function(req, res) {
    res.redirect(req.body.RelayState || '/');
  }
);

app.get('/login',
  function(req,res,next) {
    req.query.RelayState = req.query.destination;
    next();
  },
  passport.authenticate('saml',  {
    failureRedirect: '/',
    failureFlash: true
  }),
  function(req, res) {
    res.redirect('/');
  }
);

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
})

app.get('/saml/metadata', function (req, res) {
  res.type('application/xml');
  res.send(samlStrategy.generateServiceProviderMetadata(null, spCertificate));
})

const excluded = RegExp('/*.(svg)');

const requireAuthenticated = (req, res, next) => {
  if (req.isAuthenticated() || excluded.test(req.path)) {
    next()
  } else {
    res.redirect('/login?destination=' + req.path)
  }
}

app.use(requireAuthenticated, express.static('public'));


// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});