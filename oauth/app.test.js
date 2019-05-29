const expect = require('chai').expect
const { authCallback } = require('./callbacks.js')

let request = {
  body: {}
}

let response = {
  redirectCalledWith: '',
  redirect: function (url) {
    this.redirectCalledWith = url
  }
}

describe('Callbacks', function () {
  describe('auth', function () {
    it('Should redirect to authorisation URI ', function () {
      const authorisationUri = 'http://localhost'
      authCallback(authorisationUri)(request, response)
      expect(response.redirectCalledWith).to.equal(authorisationUri)
    })
  })
})
