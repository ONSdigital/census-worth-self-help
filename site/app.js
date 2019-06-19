require('dotenv').config({ silent: true })

const express = require('express');
const SamlStrategy = require('passport-saml').Strategy
const passport = require('passport')
const fs = require('fs');
const app = express();
const cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const IDP_ENTRY_POINT = process.env.IDP_ENTRY_POINT
const COOKIE_SECRET = process.env.COOKIE_SECRET

// Serve static files from './public'
app.use('/static', express.static('public'));

app.use(cookieParser());
app.use(cookieSession({ name: 'token', secret: COOKIE_SECRET }));
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize())
app.use(passport.session())

const spCertificate = fs.readFileSync('.cache/sp/sp.crt', 'utf-8');
const spKey = fs.readFileSync('.cache/sp/sp.key', 'utf-8');
const idpCertificate = fs.readFileSync('.cache/idp/idp-public-cert.pem','utf-8')
const samlStrategy = new SamlStrategy({
    cert: idpCertificate,
    entryPoint: IDP_ENTRY_POINT,
    host: 'localhost',
    identifierFormat:'urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified',
    issuer: 'http://localhost:8080',
    path: '/sso/callback'
    //decryptionPvk: spKey,
  },
  function(profile, done) {
    done(null, {
      email: profile.email,
      displayName: profile.displayName
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
    res.redirect('/protected');
  }
);

app.get('/login',
  passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
  function(req, res) {
    res.redirect('/protected');
  }
);

app.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})

app.all('/protected', function (req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/login')
  }
})

app.get('/saml/metadata', function (req, res) {
  res.type('application/xml');
  res.send(samlStrategy.generateServiceProviderMetadata(spCertificate));
})

app.get('/protected', (req, res) => {
  res.json({ message: `hello, protected : ${req.user.displayName}` })
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});