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
  user: {
    date: Date.now()
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
      callback({ ...request, body: { RelayState: "my-page" } }, response)
      expect(response.redirectCalledWith).to.equal("/my-page/")
    })
    it("Should restrict undesired destinations ", function() {
      callback(
        { ...request, body: { RelayState: "https://bad.com/my-page" } },
        response
      )
      expect(response.redirectCalledWith).to.equal("/")
    })
  })
  describe("requireAuthenticated", function() {
    it("Should redirect if not authenticated", function() {
      let state = { allowed: false }
      requireAuthenticated(request, response, () => {
        state.allowed = true
      })
      expect(state.allowed).to.equal(false)
      expect(response.redirectCalledWith).to.equal("/login")
    })
    it("Should redirect deep if not authenticated", function() {
      let state = { allowed: false }
      requireAuthenticated({ ...request, path: "/my-page/" }, response, () => {
        state.allowed = true
      })
      expect(state.allowed).to.equal(false)
      expect(response.redirectCalledWith).to.equal("/login?destination=my-page")
    })
    it("Should redirect if token expired", function() {
      let state = { allowed: false }
      requireAuthenticated(
        {
          ...request,
          isAuthenticated: function() {
            return true
          },
          user:{
            date: 234234235
          }
        },
        response,
        () => {
          state.allowed = false
        }
      )
      expect(state.allowed).to.equal(false)
      expect(response.redirectCalledWith).to.equal("/login")
    })
    it("Should allow if authenticated and token valid", function() {
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
