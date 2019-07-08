const expect = require("chai").expect
const {
  callback,
  logout,
  preAuthenticate,
  requireAuthenticated
} = require("../handlers.js")

let request = {
  body: {},
  logoutCalled: false,
  path: "/",
  query: {},
  isAuthenticated: function() {
    return false
  },
  logout: function() {
    this.logoutCalled = true
  }
}

let response = {
  redirectCalledWith: "",
  redirect: function(url) {
    this.redirectCalledWith = url
  }
}

describe("sso", function() {
  describe("callback", function() {
    it("Should redirect to default page ", function() {
      callback(request, response)
      expect(response.redirectCalledWith).to.equal("/")
    })
    it("Should redirect to desired page ", function() {
      callback({ ...request, body: { RelayState: "/my-page" } }, response)
      expect(response.redirectCalledWith).to.equal("/my-page")
    })
  })
  describe("requireAuthenticated", function() {
    it("Should redirect if not authenticated", function() {
      let state = { allowed: false }
      requireAuthenticated(request, response, () => {
        state.allowed = true
      })
      expect(state.allowed).to.equal(false)
      expect(response.redirectCalledWith).to.equal("/login?destination=/")
    })
    it("Should allow if authenticated", function() {
      let state = { allowed: false }
      requireAuthenticated(
        {
          ...request,
          isAuthenticated: function() {
            return true
          }
        },
        response,
        () => {
          state.allowed = true
        }
      )
      expect(state.allowed).to.equal(true)
    })
    it("Should allow if authenticated ", function() {
      let state = { allowed: false }
      requireAuthenticated(
        {
          ...request,
          isAuthenticated: function() {
            return true
          }
        },
        response,
        () => {
          state.allowed = true
        }
      )
      expect(state.allowed).to.equal(true)
    })
  })
  describe("logout", function() {
    it("Should logout and redirect", function() {
      expect(request.logoutCalled).to.equal(false)
      logout("http://my.idp/logout")(request, response)
      expect(request.logoutCalled).to.equal(true)
      expect(response.redirectCalledWith).to.equal("http://my.idp/logout")
    })
  })
  describe("preAuthenticate", function() {
    it("Should RelayState be set", function() {
      let mockRequest = {
        ...request,
        query: { destination: "/my-desination" }
      }
      preAuthenticate(mockRequest, response, () => {})
      expect(mockRequest.query.RelayState).to.equal("/my-desination")
    })
  })
})
