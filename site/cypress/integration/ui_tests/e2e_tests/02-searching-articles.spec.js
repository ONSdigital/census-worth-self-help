/// <reference types="Cypress" />

const globalTestData = require("../../../fixtures/globalTestData")

// fragments
const search = require("../../../fixtures/fragments/search")
const pagination = require("../../../fixtures/fragments/pagination")

// pages
const homepage = require("../../../fixtures/pages/homepagePage")

const beginTypingToSearchTitle = "Begin typing to search"
const searchText = "injection"
const incompleteSearch = searchText.slice(0, -1)
const waitForSearchResultsToUpdate = 100

describe("Article searching", function() {
  beforeEach(function() {
    Cypress.env("RETRIES", 2)
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.visit("")
    cy.get(homepage.homepageLogo).should("be.visible")
  })

  it("A search result that won't match any articles [ONS-21]", function() {
    cy.get(search.searchButton).click()
    // This duplcate clear is required as the first clear does not always happen
    cy.get(search.searchBarField).clear(true, true, waitForSearchResultsToUpdate)
    cy.get(search.searchBarField).clear(true, true, waitForSearchResultsToUpdate)
    cy.get(search.searchResultTitle).contains(beginTypingToSearchTitle)
    cy.get(search.searchBarField).type(searchText.slice(0, -1))
    cy.get(search.searchResultTitle).contains(incompleteSearch)
  })

  it("A search result that matches with a shortened word [ONS-21]", function() {
    const shortenedSearchText = searchText.slice(0, -3)
    cy.get(search.searchButton).click()
    cy.get(search.searchBarField).clear(true, true, waitForSearchResultsToUpdate)
    cy.get(search.searchBarField).clear().type(searchText.slice(0, -3))
    cy.get(search.searchResultTitle).contains(shortenedSearchText)
    cy.get(homepage.articleCard).should(
      "have.text",
      globalTestData.injectionAttackArticle
    )
  })

  it("A search result that matches an article via the body [ONS-21]", function() {
    cy.get(search.searchButton).click()
    cy.get(search.searchBarField).clear(true, true, waitForSearchResultsToUpdate)
    cy.get(search.searchBarField).clear().type(searchText)
    cy.get(search.searchResultTitle).contains(searchText)
    cy.get(homepage.articleCard).should(
      "have.text",
      globalTestData.injectionAttackArticle
    )
  })

  it("A search result that matches an article with a partial match [ONS-424]", () => {
    const shortenedSearchText = searchText.slice(0, 3)
    cy.get(search.searchButton).click()
    cy.get(search.searchBarField).clear(true, true, waitForSearchResultsToUpdate)
    cy.get(search.searchBarField).clear().type(shortenedSearchText)
    cy.get(search.searchResultTitle).contains(shortenedSearchText)
    cy.get(homepage.articleCard).should(
      "have.text",
      globalTestData.injectionAttackArticle
    )
  })

  it("A search result that matches an article with stemming match [ONS-424]", () => {
    const sameStemSearchText = "injectable"
    cy.get(search.searchButton).click()
    cy.get(search.searchBarField).clear(true, true, waitForSearchResultsToUpdate)
    cy.get(search.searchBarField).clear().type(sameStemSearchText)
    cy.get(search.searchResultTitle).should("not.contain", searchText)
    cy.get(homepage.articleCard).should(
      "have.text",
      globalTestData.injectionAttackArticle
    )
  })

  it("A search query persists until the next time the search button is clicked", function() {
    cy.get(search.searchButton).click()
    cy.get(search.searchBarField).clear(true, true, waitForSearchResultsToUpdate)
    cy.get(search.searchBarField).clear().type("test")
    cy.get(search.searchResultTitle).should(
      "have.text",
      '10 results for "test"'
    )

    cy.visit("")
    cy.get(search.searchButton).click()
    cy.get(search.searchResultTitle).should(
      "have.text",
      '10 results for "test"'
    )
  })
})
