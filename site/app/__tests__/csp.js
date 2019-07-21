const expect = require("chai").expect
const csp = require("../csp.js").default

let request = {
  body: {}
}

let response = {
  headers: {},
  setHeader: function(name, value) {
    this.headers[name] = value
  },
}

const next = function() {}

describe("csp", function() {
  it("Should default CSP be locked down ", function () {
    csp()(request, response, next)
    expect(response.headers['Content-Security-Policy']).to.equal('connect-src \'self\'; default-src \'self\'; ' +
      'font-src \'self\'; img-src \'self\' data:; media-src https:; script-src \'self\' \'unsafe-inline\'; ' +
      'style-src \'self\' \'unsafe-inline\';')
  })
  it("Should CSP contain chat domain ", function () {
    csp({chatDomain : 'chat.com'})(request, response, next)
    expect(response.headers['Content-Security-Policy']).to.contain('; frame-src https://chat.com;')
    expect(response.headers['Content-Security-Policy']).to.contain('; script-src \'self\' \'unsafe-inline\' https://chat.com;')
    expect(response.headers['Content-Security-Policy']).to.contain('; img-src \'self\' data: https://chat.com;')
  })
  it("Should CSP contain analytics host ", function () {
    csp({analyticsHost : 'https://analytics.com'})(request, response, next)
    expect(response.headers['Content-Security-Policy']).to.contain('; script-src \'self\' \'unsafe-inline\' https://analytics.com;')
    expect(response.headers['Content-Security-Policy']).to.contain('; img-src \'self\' data: https://analytics.com;')
  })
  it("Should CSP contain analytics host and chat domain ", function () {
    csp({
      analyticsHost : 'https://analytics.com',
      chatDomain : 'chat.com'
    })(request, response, next)
    expect(response.headers['Content-Security-Policy']).to.contain('; script-src \'self\' \'unsafe-inline\' https://chat.com https://analytics.com;')
  })
})
