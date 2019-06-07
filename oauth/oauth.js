const simpleOauthModule = require('simple-oauth2')

module.exports = {
  createOauth2: function (clientId, clientSecret) {
    return simpleOauthModule.create({
      client: {
        id: clientId,
        secret: clientSecret
      },
      auth: {
        tokenHost: 'https://github.com',
        tokenPath: '/login/oauth/access_token',
        authorizePath: '/login/oauth/authorize'
      }
    })
  }
}
