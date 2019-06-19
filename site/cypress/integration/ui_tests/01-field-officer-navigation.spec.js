/// <reference types="Cypress" />

const commands = require('../../support/commands.js');
const globalTestData = require('../../fixtures/globalTestData');

// fragments
const menu = require('../../fixtures/fragments/menu');
const search = require('../../fixtures/fragments/search');
const article = require('../../fixtures/fragments/article');
const pagination = require('../../fixtures/fragments/pagination');

// pages
const homepage = require('../../fixtures/pages/homepagePage');

const articleName = 'Injection Attack';
const authorName = 'owasp';
const beginTypingToSearchTitle = 'Begin typing to search';
const firstArticlePath = '/deep-article';
const searchText = 'injection';
const incompleteSearch = searchText.slice(0, -1);

describe("The user flow", function() {
    beforeEach(function() {
        cy.visit('');
        cy.get(homepage.homepageLogo).should('be.visible');
    });

    it('Reading an article', function() {
        cy.get(homepage.articleCard).first().click();
        cy.get(article.content).should('be.visible');
    });

    it('Opening the menu then closing it', function() {
        cy.get(menu.menuOverlay).should('not.be.visible');
        cy.get(menu.menuButton).contains('Menu').click();
        cy.get(menu.menuOverlay).should('be.visible');
    });

    it('A search result that won\'t match any articles', function() {
        cy.get(search.searchButton).click();
        cy.get(search.searchResultTitle).contains(beginTypingToSearchTitle);
        cy.get(search.searchBarField).type(searchText.slice(0, -1));
        cy.get(search.searchResultTitle).contains(incompleteSearch);
    });

    it('A search result that matches with a shortened word', function () {
        const shortenedSearchText = searchText.slice(0, -3);
        cy.get(search.searchButton).click();
        cy.get(search.searchBarField).type(searchText.slice(0, -3));
        cy.get(search.searchResultTitle).contains(shortenedSearchText);
        cy.get(homepage.articleCard).should('have.text', articleName);
    });

    it('A search result that matches an article via the body', function () {
        cy.get(search.searchButton).click();
        cy.get(search.searchBarField).type(searchText);
        cy.get(search.searchResultTitle).contains(searchText);
        cy.get(homepage.articleCard).should('have.text', articleName);
    });

    it('A search result that matches an article via the author', function () {
        const pageNumber1 = '1';
        cy.get(search.searchButton).click();
        cy.get(search.searchBarField).type(authorName);
        cy.get(search.searchResultTitle).contains(authorName);
        cy.get(homepage.articleCard).should('have.text', articleName);
        cy.get(pagination.pagination1).should('have.text', pageNumber1);
    });

    it('Most recent pagination', function () {
        // go to recently updated page
        cy.get(menu.menuButton).contains('Menu').click();
        cy.get(menu.menuLink).contains('Recently updated').click();

        // page 1 should be selected. Clicking it again should do nothing.
        cy.get(pagination.pagination1).should('have.css', 'text-decoration').and('match', /underline/)
        cy.get(pagination.pagination2).should('have.css', 'text-decoration').and('not.match', /underline/)
        cy.get(pagination.pagination1).click();
        cy.get(pagination.pagination1).should('have.css', 'text-decoration').and('match', /underline/)
        cy.get(pagination.pagination2).should('have.css', 'text-decoration').and('not.match', /underline/)

        // clicking page 2 should change switch selected pagination element
        cy.get(pagination.pagination2).click();
        cy.get(pagination.pagination2).should('have.css', 'text-decoration').and('match', /underline/)
        cy.get(pagination.pagination1).should('have.css', 'text-decoration').and('not.match', /underline/)

        // clicking back takes us back to 1 being selected
        cy.get(pagination.back).click();
        cy.get(pagination.pagination1).should('have.css', 'text-decoration').and('match', /underline/)
        cy.get(pagination.pagination2).should('have.css', 'text-decoration').and('not.match', /underline/)
        cy.get(pagination.back).should('not.be.visible');

        // clicking next takes us forward to 2 being selected
        cy.get(pagination.next).click();
        cy.get(pagination.pagination2).should('have.css', 'text-decoration').and('match', /underline/)
        cy.get(pagination.pagination1).should('have.css', 'text-decoration').and('not.match', /underline/)

        // after clicking next a couple more times, clicking first still takes us back to 1 being selected.
        cy.get(pagination.next).click();
        cy.get(pagination.next).click();
        cy.get(pagination.first).click();
        cy.get(pagination.pagination1).should('have.css', 'text-decoration').and('match', /underline/)
        cy.get(pagination.pagination2).should('have.css', 'text-decoration').and('not.match', /underline/)
        cy.get(pagination.first).should('not.be.visible');
     });

});