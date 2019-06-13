/// <reference types="Cypress" />

const commands = require('../../support/commands.js');
const globalTestData = require('../../fixtures/globalTestData');

// fragments
const menu = require('../../fixtures/fragments/menu');
const search = require('../../fixtures/fragments/search');

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
        cy.url().should('include', firstArticlePath);
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
        cy.get(search.pagination1).should('have.text', pageNumber1);
    });
});