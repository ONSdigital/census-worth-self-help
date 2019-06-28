/// <reference types="Cypress" />

const commands = require('../../support/commands.js');
const globalTestData = require('../../fixtures/globalTestData');

// fragments
const bookmarks = require('../../fixtures/fragments/bookmarks');
const menu = require('../../fixtures/fragments/menu');
const search = require('../../fixtures/fragments/search');
const article = require('../../fixtures/fragments/article');
const pagination = require('../../fixtures/fragments/pagination');

// pages
const bookmarksPage = require('../../fixtures/pages/bookmarksPage');
const homepage = require('../../fixtures/pages/homepagePage');
const mostRecentPage = require('../../fixtures/pages/mostRecentPage');

const articleName = 'Injection Attack';
const authorName = 'owasp';
const beginTypingToSearchTitle = 'Begin typing to search';
const firstArticlePath = '/deep-article';
const searchText = 'injection';
const incompleteSearch = searchText.slice(0, -1);

describe("The field officer flow", function() {
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

    it('The field officer bookmarks a page and refers to it in their bookmark page', function () {
        const header = '.Button-heading-Style';
        cy.get(bookmarks.bookmarkIcon).should('be.visible');
        cy.visit(bookmarksPage.bookmarkUrlPath);
        cy.get(bookmarks.bookmarkIcon).should('be.visible');
        cy.visit('');
        cy.get(homepage.articleCard).first().click();
        cy.get(bookmarks.bookmarkSave).should('have.text', bookmarks.bookmarkSaveText);
        cy.get(bookmarks.bookmarkBlockButton).click();
        cy.get(header).first().should('have.text', bookmarks.bookmarkedText);
        cy.get(menu.menuButton).contains('Menu').click();
        cy.get('.Menu-major-item-Style').contains('My Bookmarks').click();
        cy.url().should('include', bookmarksPage.bookmarkUrlPath);
        cy.get(homepage.articleCard).should('have.text', 'deep article');
        cy.get(bookmarks.bookmarkIcon).should('not.be.visible');
    });

    it('The field officer should see all bookmarked articles when they click \'view all\'', function () {
        cy.bookmarkArticle(firstArticlePath);
        cy.visit('');
        cy.get(`[href='${bookmarksPage.bookmarkUrlPath}']`).click();
        cy.url().should('include', bookmarksPage.bookmarkUrlPath);
        cy.get(search.searchResultTitle).should('have.text', 'My Bookmarks');
    });

    it('The field officer should all recently updated articles when they click \'view all\'', function () {
        cy.get(`[href='${mostRecentPage.mostRecentUrlPath}']`).click();
        cy.url().should('include', mostRecentPage.mostRecentUrlPath);
        cy.get(search.searchResultTitle).should('have.text', 'Recently Updated');
    });

    it('The field officer should see related articles', function () {
        const editorialWorkflowArticle = 'editorial workflow';
        const editorialWorkflowPath = '/editorial-workflow';
        const reviwemeArticle = 'reviweme';
        const reviwemeUrlPath = '/reviweme';
        cy.visit(reviwemeUrlPath);
        cy.get(search.searchResultTitle).should('not.have.text', editorialWorkflowArticle);
        cy.contains('ALSO IN THIS TOPIC');
        cy.get(homepage.articleCard).contains(editorialWorkflowArticle).click();
        cy.url().should('include', editorialWorkflowPath);
        cy.get(search.searchResultTitle).should('not.have.text', reviwemeArticle);
        cy.get(search.searchResultTitle).should('have.text', editorialWorkflowArticle);
    });

    it('Most recent pagination', function () {
        const textAppearancne = 'text-decoration';
        const underline = /underline/
        // go to recently updated page
        cy.get(menu.menuButton).contains('Menu').click();
        cy.get(menu.menuLink).contains('Recently updated').click();

        // page 1 should be selected. Clicking it again should do nothing.
        cy.get(pagination.pagination1).should('have.css', textAppearancne).and('match', underline)
        cy.get(pagination.pagination2).should('have.css', textAppearancne).and('not.match', underline)
        cy.get(pagination.pagination1).click();
        cy.get(pagination.pagination1).should('have.css', textAppearancne).and('match', underline)
        cy.get(pagination.pagination2).should('have.css', textAppearancne).and('not.match', underline)

        // clicking page 2 should change switch selected pagination element
        cy.get(pagination.pagination2).click();
        cy.get(pagination.pagination2).should('have.css', textAppearancne).and('match', underline)
        cy.get(pagination.pagination1).should('have.css', textAppearancne).and('not.match', underline)

        // clicking back takes us back to 1 being selected
        cy.get(pagination.back).click();
        cy.get(pagination.pagination1).should('have.css', textAppearancne).and('match', underline)
        cy.get(pagination.pagination2).should('have.css', textAppearancne).and('not.match', underline)
        cy.get(pagination.back).should('not.be.visible');

        // clicking next takes us forward to 2 being selected
        cy.get(pagination.next).click();
        cy.get(pagination.pagination2).should('have.css', textAppearancne).and('match', underline)
        cy.get(pagination.pagination1).should('have.css', textAppearancne).and('not.match', underline)

        // after clicking next a couple more times, clicking first still takes us back to 1 being selected.
        cy.get(pagination.next).click();
        cy.get(pagination.next).click();
        cy.get(pagination.first).click();
        cy.get(pagination.pagination1).should('have.css', textAppearancne).and('match', underline)
        cy.get(pagination.pagination2).should('have.css', textAppearancne).and('not.match', underline)
        cy.get(pagination.first).should('not.be.visible');
     });
});