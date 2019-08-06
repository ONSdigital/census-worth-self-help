const expect = require("chai").expect
const hstsheader = require("../hstsheader").default

let request = {
  body: {}
}

let response = {
  headers: {},
  setHeader: function(name, value) {
    this.headers[name] = value
  }
}

const next = function() {}

describe("hstsheader", function() {
  it("Should default CSP be locked down ", function() {
    hstsheader()(request, response, next)
    expect(response.headers["Strict-Transport-Security"]).to.equal(
      "max-age: 15552000; includeSubDomains"
    )
  })
})
