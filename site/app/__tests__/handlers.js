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

let state = {
  allowed: false,
  next: function() {
    state.allowed = true
  }.bind()
}

describe("sso", function() {
  beforeEach(() => {
    state.allowed = false
  });

  describe("callback", function() {
    it("Should redirect to default page ", function() {
      callback(request, response)
      expect(response.redirectCalledWith).to.equal("/")
    })
    it("Should redirect to desired page ", function() {
      callback({ ...request, body: { RelayState: "my-page/" } }, response)
      expect(response.redirectCalledWith).to.equal("/my-page/")
      callback({ ...request, body: { RelayState: "sw.js" } }, response)
      expect(response.redirectCalledWith).to.equal("/sw.js")
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
      requireAuthenticated(request, response, state)
      expect(state.allowed).to.equal(false)
      expect(response.redirectCalledWith).to.equal("/login")
    })
    it("Should redirect if token expired", function() {
      [
        ['Old', 1, false],
        ['Now', Date.now(), true],
        ['3 minutes ago', Date.now() - 180 * 1000, true],
        ['10 minutes ago', Date.now() - 600 * 1000, false],
        ['An hour ago', Date.now() - 3600 * 1000, false],
        ['In 2 minutes', Date.now() + 180 * 1000, false],
        ['In 30 seconds', Date.now() + 30 * 1000, true],
        ['Negative', -5000, false]
      ].forEach(item => {
        let state = {
          allowed: false,
          next: function() {
            state.allowed = true
          }.bind()
        }
        requireAuthenticated(
          {
            ...request,
            isAuthenticated: () => true,
            user: {
              date: item[1]
            }
          },
          response,
          state.next,
        )
        expect(state.allowed, item[0] + ':' + item[1]).to.equal(item[2])
      })
    })
    it("Should redirect deep if not authenticated", function() {
      requireAuthenticated({ ...request, path: "/my-page/" }, response, state.next)
      expect(state.allowed).to.equal(false)
      expect(response.redirectCalledWith).to.equal("/login?destination=my-page/")
    })
    it("Should redirect index.html if not authenticated", function() {
      requireAuthenticated({ ...request, path: "/my-page/index.html" }, response, state.next)
      expect(state.allowed).to.equal(false)
      expect(response.redirectCalledWith).to.equal("/login?destination=my-page/index.html")
    })
    it("Should redirect sw.js if not authenticated", function() {
      requireAuthenticated({ ...request, path: "/sw.js" }, response, state.next)
      expect(state.allowed).to.equal(false)
      expect(response.redirectCalledWith).to.equal("/login?destination=sw.js")
    })
    it("Should allow if authenticated and token valid", function() {
      requireAuthenticated(
        {
          ...request,
          isAuthenticated: function() {
            return true
          }
        },
        response,
        state.next
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
