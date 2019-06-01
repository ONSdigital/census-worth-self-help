module.exports = {
  authHandler: function (authorisationUri) {
    return (request, response) => {
      response.redirect(authorisationUri)
    }
  },

  callbackHandler: function (oauth2, oauthProvider, origin) {
    return (request, response) => {
      const code = request.query.code
      const options = {
        code: code
      }

      oauth2.authorizationCode.getToken(options, (error, result) => {
        let message, content

        if (error) {
          console.error('Access Token Error', error.message)
          message = 'error'
          content = JSON.stringify(error)
        } else {
          const token = oauth2.accessToken.create(result)
          message = 'success'
          content = {
            token: token.token.access_token,
            provider: oauthProvider
          }
        }

        const script = `
            <script>
            (function() {
              function recieveMessage(e) {
                if (!e.origin.match(${JSON.stringify(origin)})) {
                  console.log('Invalid origin: %s', e.origin)
                  return;
                }
                // Send message to main window
                window.opener.postMessage(
                  'authorization:${oauthProvider}:${message}:${JSON.stringify(content)}',
                  e.origin
                )
              }
              window.addEventListener("message", recieveMessage, false)
              // Start handshake with parent
              window.opener.postMessage("authorizing:${oauthProvider}", "*")
            })()
            </script>`
        return response.send(script)
      })
    }
  }
}
