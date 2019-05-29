require('dotenv').config({silent: true})
const express = require('express')
const simpleOauthModule = require('simple-oauth2')
const randomString = require('randomstring')

// env variables
const OAUTH_CLIENT_ID = process.env.OAUTH_CLIENT_ID
const OAUTH_CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET
const ORIGIN = process.env.ORIGIN || ''
const PORT = process.env.PORT || 8080
const REDIRECT_URL = process.env.REDIRECT_URL
const SCOPES = process.env.SCOPES || 'repo,user'

// App enging env variables
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
const oauth2 = simpleOauthModule.create({
    client: {
        id: OAUTH_CLIENT_ID,
        secret:OAUTH_CLIENT_SECRET
    },
    auth: {
        tokenHost: 'https://github.com',
        tokenPath: '/login/oauth/access_token',
        authorizePath: '/login/oauth/authorize'
    }
})

if (('').match(ORIGIN)) {
    console.error(`FATAL : Insecure ORIGIN pattern : ${ORIGIN}`)
    process.exit()
}

// Authorization uri definition
const authorizationUri = oauth2.authorizationCode.authorizeURL({
    redirect_uri: REDIRECT_URL,
    scope: SCOPES,
    state: randomString.generate(32)
})

// Initial page redirecting to Github
app.get('/auth', (req, res) => {
    res.redirect(authorizationUri)
})

// Callback service parsing the authorization token and asking for the access token
app.get('/callback', (req, res) => {
    const code = req.query.code
    const options = {
        code: code
    }

    oauth2.authorizationCode.getToken(options, (error, result) => {
        let mess, content

        if (error) {
            console.error('Access Token Error', error.message)
            mess = 'error'
            content = JSON.stringify(error)
        } else {
            const token = oauth2.accessToken.create(result)
            mess = 'success'
            content = {
                token: token.token.access_token,
                provider: OAUTH_PROVIDER
            }
        }

        const script = `
    <script>
    (function() {
      function recieveMessage(e) {
        if (!e.origin.match(${JSON.stringify(ORIGIN)})) {
          console.log('Invalid origin: %s', e.origin)
          return;
        }
        // send message to main window with da app
        window.opener.postMessage(
          'authorization:${OAUTH_PROVIDER}:${mess}:${JSON.stringify(content)}',
          e.origin
        )
      }
      window.addEventListener("message", recieveMessage, false)
      // Start handshake with parent
      window.opener.postMessage("authorizing:${OAUTH_PROVIDER}", "*")
    })()
    </script>`
        return res.send(script)
    })
})

app.get('/success', (req, res) => {
    res.send('')
})

app.get('/', (req, res) => {
    res.send(`<br>
    <a href="/auth" target="${LOGIN_AUTH_TARGET}">
      Log in with ${OAUTH_PROVIDER.toUpperCase()}
    </a>`)
})

// Start the server;
app.listen(PORT, () => {
    console.log(`oauth service running on port ${PORT}`)
})
