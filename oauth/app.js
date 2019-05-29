require('dotenv').config({ silent: true })

const { authHandler, callbackHandler } = require('./handlers.js')
const { createOauth2 } = require('./oauth.js')

const express = require('express')
const randomString = require('randomstring')

// env variables
const OAUTH_CLIENT_ID = process.env.OAUTH_CLIENT_ID
const OAUTH_CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET
const ORIGIN = process.env.ORIGIN || ''
const PORT = process.env.PORT || 8080
const REDIRECT_URL = process.env.REDIRECT_URL
const SCOPES = process.env.SCOPES || 'repo,user'

// App engine env variables
const GAE_INSTANCE = process.env.PORT

const OAUTH_PROVIDER = 'github'
const LOGIN_AUTH_TARGET = '_self'

if (!OAUTH_CLIENT_ID) {
  if (GAE_INSTANCE) {
    console.error(`FATAL : OAUTH_CLIENT_ID is not set, was this app deployed with environment variables set?`)
  } else {
    console.error(`FATAL : OAUTH_CLIENT_ID is not set, do you have a local .env file in place?`)
  }
  process.exit()
}

const app = express()
const oauth2 = createOauth2(OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET)

if (('').match(ORIGIN)) {
  console.error(`FATAL : Insecure ORIGIN pattern : ${ORIGIN}`)
  process.exit()
}

// Authorisation uri definition
const authorisationUri = oauth2.authorizationCode.authorizeURL({
  redirect_uri: REDIRECT_URL,
  scope: SCOPES,
  state: randomString.generate(32)
})

// Initial page redirecting to Github
app.get('/auth', authHandler(authorisationUri))

// Callback service parsing the authorization token and asking for the access token
app.get('/callback', callbackHandler(oauth2, OAUTH_PROVIDER, ORIGIN))

app.get('/success', (request, response) => {
  response.send('')
})

app.get('/', (request, response) => {
  response.send(`

    <a href="/auth" target="${LOGIN_AUTH_TARGET}">
      Log in with ${OAUTH_PROVIDER.toUpperCase()}
    </a>`)
})

// Start the server;
app.listen(PORT, () => {
  console.log(`oauth service running on port ${PORT}`)
})
