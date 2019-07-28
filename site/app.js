require('dotenv').config({ silent: true })

const express = require('express');
const app = express();
const csp = require('./app/csp').default;

const SP_PROTECTED = (process.env.SP_PROTECTED || "true").toLowerCase()

app.use(csp({
  chatDomain : process.env.GATSBY_CHAT_DOMAIN,
  analyticsHost : process.env.MATOMO_IP
}));

app.get('/api/ping', (request, response) => response.send("OK"))

if (SP_PROTECTED === "false") {

  // For an unprotected deployment, serve static files from /public

  app.use(express.static('public'));
  app.get('/api/auth', (request, response) => response.send("NOAUTH"))

} else {

  const SamlStrategy = require('passport-saml').Strategy
  const passport = require('passport')
  const fs = require('fs');
  const cookieSession = require('cookie-session')
  const cookieParser = require('cookie-parser')
  const bodyParser = require('body-parser')
  const { callback, logout, mapUser, preAuthenticate, requireAuthenticated, milliseconds } = require('./app/handlers')

  const COOKIE_SECRET = process.env.COOKIE_SECRET
  const IDP_ENTRY_POINT = process.env.IDP_ENTRY_POINT
  const IDP_LOGOUT = process.env.IDP_LOGOUT
  const SP_CALLBACK_URL = process.env.SP_CALLBACK_URL
  const SP_ENTITY_ID = process.env.SP_ENTITY_ID
  const COOKIE_TIMEOUT = process.env.COOKIE_TIMEOUT || 5

  // For an protected deployment, protect static file from /public with SAML SSO
  app.use(cookieParser());
  app.use(cookieSession({
    name: 'token', 
    secret: COOKIE_SECRET, 
    maxAge: milliseconds(COOKIE_TIMEOUT)
  }));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(passport.initialize())
  app.use(passport.session())

  const spCertificate = fs.readFileSync('.deploy/sp/sp.certificate', 'utf-8');
  const spKey = fs.readFileSync('.deploy/sp/sp.key', 'utf-8');
  const idpCertificate = fs.readFileSync('.deploy/idp/idp.certificate', 'utf-8')
  const samlStrategy = new SamlStrategy({
      callbackUrl: SP_CALLBACK_URL,
      cert: idpCertificate,
      entryPoint: IDP_ENTRY_POINT,
      identifierFormat: 'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress',
      issuer: SP_ENTITY_ID,
      privateCert: spKey
    },
    function (profile, done) {
      done(null, {
        nameID: profile.nameID,
        nameIDFormat: profile.nameIDFormat,
        email: profile.email,
        date: Date.now()
      })
    })

  passport.use(samlStrategy);
  passport.serializeUser(mapUser);
  passport.deserializeUser(mapUser);

  app.post('/sso/callback',
    passport.authenticate('saml', {failureRedirect: '/', failureFlash: true}),
    callback
  );

  app.get('/login',
    preAuthenticate,
    passport.authenticate('saml', {
      failureRedirect: '/',
      failureFlash: true
    })
  );

  // logout route is not an end-user flow. It is only added for test and troubleshooting purposes.
  app.get('/logout', logout(IDP_LOGOUT))

  app.get('/api/auth', requireAuthenticated, (request, response) => response.send("AUTH"))

  app.get('/saml/metadata', function (req, res) {
    res.type('application/xml');
    res.send(samlStrategy.generateServiceProviderMetadata(null, spCertificate));
  })

  app.use(requireAuthenticated, express.static('public'));
}

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});