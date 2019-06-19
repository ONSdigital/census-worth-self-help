require('dotenv').config({ silent: true })

const express = require('express');
const SamlStrategy = require('passport-saml').Strategy
const passport = require('passport')
const fs = require('fs');
const app = express();

const IDP_ENTRY_POINT = process.env.IDP_ENTRY_POINT

// Serve static files from './public'
app.use('/static', express.static('public'));

const spCertificate = fs.readFileSync('.cache/sp/sp.crt', 'utf-8');
const spKey = fs.readFileSync('.cache/sp/sp.key', 'utf-8');
const samlStrategy = new SamlStrategy({
    host: 'try.sp.local',
    path: '/login/callback',
    entryPoint: IDP_ENTRY_POINT,
    issuer: 'http://try.sp.local:8080',
    identifierFormat:'urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified'
    //decryptionPvk: spKey,
  },
  function(profile, done) {
    console.log('passport.use() profile: %s \n', JSON.stringify(profile));
    findByEmail(profile.email, function(err, user) {
      if (err) {
        return done(err);
      }
      return done(null, user);
    });
  })

passport.use(samlStrategy);

app.post('/login/callback',
  passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
  function(req, res) {
    res.redirect('/');
  }
);

app.get('/login',
  passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
  function(req, res) {
    res.redirect('/');
  }
);

app.get('/logout', function (req, res) {
  req.logout()
  res.end('Logged out')
})

app.all('/protected', function (req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/login')
  }
})

app.get('/metadata.xml', function (req, res) {
  res.type('application/xml');
  res.send(samlStrategy.generateServiceProviderMetadata(spCertificate));
})

app.get('/protected', (req, res) => {
  res.json({ message: "hello, protected" })
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});