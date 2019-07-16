const bookmarks = require("../fixtures/fragments/bookmarks")
const search = require("../fixtures/fragments/search")
const homepage = require("../fixtures/pages/homepagePage.js")

Cypress.Commands.add("bookmarkArticle", urlPath => {
  const header = ".Button-heading-Style"
  cy.visitPage(urlPath)
  cy.get(bookmarks.bookmarkBlockButton).click()
  cy.get(header)
    .first()
    .should("have.text", bookmarks.bookmarkedText)
})

Cypress.Commands.add("searchArticle", searchValue => {
  cy.get(search.searchButton).click()
  cy.get(search.searchBarField).type(searchValue)
})

Cypress.Commands.add("visitPage", urlPath => {
  cy.visit(Cypress.env("baseUrl") + urlPath)
  cy.url().should("eq", Cypress.env("baseUrl") + urlPath)
})
