/// <reference types="Cypress" />

const globalTestData = require('../../../fixtures/globalTestData');

// fragments
const search = require('../../../fixtures/fragments/search');
const pagination = require('../../../fixtures/fragments/pagination');

// pages
const homepage = require('../../../fixtures/pages/homepagePage');

const authorName = 'owasp';
const beginTypingToSearchTitle = 'Begin typing to search';
const searchText = 'injection';
const incompleteSearch = searchText.slice(0, -1);

describe("Article searching", function() {
    beforeEach(function () {
        cy.visit(Cypress.env('baseUrl'));
        cy.get(homepage.homepageLogo).should('be.visible');
    });

    it('A search result that won\'t match any articles [ONS-21]', function () {
        cy.get(search.searchButton).click();
        cy.get(search.searchResultTitle).contains(beginTypingToSearchTitle);
        cy.get(search.searchBarField).type(searchText.slice(0, -1));
        cy.get(search.searchResultTitle).contains(incompleteSearch);
    });

    it('A search result that matches with a shortened word [ONS-21]', function () {
        const shortenedSearchText = searchText.slice(0, -3);
        cy.get(search.searchButton).click();
        cy.get(search.searchBarField).type(searchText.slice(0, -3));
        cy.get(search.searchResultTitle).contains(shortenedSearchText);
        cy.get(homepage.articleCard).should('have.text', globalTestData.injectionAttackArticle);
    });

    it('A search result that matches an article via the body [ONS-21]', function () {
        cy.get(search.searchButton).click();
        cy.get(search.searchBarField).type(searchText);
        cy.get(search.searchResultTitle).contains(searchText);
        cy.get(homepage.articleCard).should('have.text', globalTestData.injectionAttackArticle).click();
        cy.url().should('eq', Cypress.env('baseUrl')+globalTestData.injectionAttackPath);
        cy.get(search.searchResultTitle).should('have.text', globalTestData.injectionAttackArticle)
    });

    it('A search result that matches an article via the author [ONS-21]', function () {
        const pageNumber1 = '1';
        cy.get(search.searchButton).click();
        cy.get(search.searchBarField).type(authorName);
        cy.get(search.searchResultTitle).contains(authorName);
        cy.get(homepage.articleCard).should('have.text', globalTestData.injectionAttackArticle);
        cy.get(pagination.pagination1).should('have.text', pageNumber1);
    });

});