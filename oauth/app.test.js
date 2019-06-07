const expect = require('chai').expect
const { authHandler, callbackHandler } = require('./handlers.js')

let request = {
  body: {},
  query: {
    code: 'mock-code'
  }
}

let response = {
  redirectCalledWith: '',
  sendCalledWith: '',
  redirect: function (url) {
    this.redirectCalledWith = url
  },
  send: function (content) {
    this.sendCalledWith = content
  }
}

let oauth2 = {
  authorizationCode: {
    getToken: function (options, callback) {
      callback(null, 'mock-result')
    }
  },
  accessToken: {
    create: function (result) {
      return {
        token: {
          access_token: `mock-access-token:${result}`
        }
      }
    }
  }
}

describe('auth', function () {
  describe('auth', function () {
    describe('happy', function () {
      it('Should redirect to authorisation URI ', function () {
        const authorisationUri = 'http://localhost'
        authHandler(authorisationUri)(request, response)
        expect(response.redirectCalledWith).to.equal(authorisationUri)
      })
    })
  })

  describe('callback', function () {
    describe('happy', function () {
      it('Should generate success response ', function () {
        const oauthProvider = 'github'
        const origin = 'localhost'
        callbackHandler(oauth2, oauthProvider, origin)(request, response)
        expect(response.sendCalledWith).to.match(/authorization:github:success:{"token":"mock-access-token:mock-result","provider":"github"}/)
      })
    })
  })
})
