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
    expect(response.headers['Content-Security-Policy']).to.equal('default-src \'self\'; script-src \'self\'; img-src \'self\' data:; style-src \'self\'; font-src \'self\'; connect-src \'self\';')
  })
  it("Should CSP contain chat domain ", function () {
    csp({chatDomain : 'chat.com'})(request, response, next)
    expect(response.headers['Content-Security-Policy']).to.contain('frame-src https://chat.com')
  })
})
