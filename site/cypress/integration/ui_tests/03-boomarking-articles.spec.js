/// <reference types="Cypress" />

const commands = require('../../support/commands.js');
const globalTestData = require('../../fixtures/globalTestData');

// fragments
const bookmarks = require('../../fixtures/fragments/bookmarks');
const menu = require('../../fixtures/fragments/menu');
const search = require('../../fixtures/fragments/search');

// pages
const bookmarksPage = require('../../fixtures/pages/bookmarksPage');
const homepage = require('../../fixtures/pages/homepagePage');

const firstArticlePath = '/deep-article';

describe("Article bookmarks", function() {
    beforeEach(function () {
        cy.visit('');
        cy.get(homepage.homepageLogo).should('be.visible');
    });

    it('The field officer bookmarks a page and refers to it in their bookmark page [ONS-64]', function () {
        const header = '.Button-heading-Style';
        cy.get(bookmarks.bookmarkIcon).should('be.visible');
        cy.visit(bookmarksPage.bookmarkUrlPath);
        cy.get(bookmarks.bookmarkIcon).should('be.visible');
        cy.visit(firstArticlePath);
        cy.get(bookmarks.bookmarkSave).should('have.text', bookmarks.bookmarkSaveText);
        cy.get(bookmarks.bookmarkBlockButton).click();
        cy.get(header).first().should('have.text', bookmarks.bookmarkedText);
        cy.get(menu.menuButton).contains('Menu').click();
        cy.get('.Menu-major-item-Style').contains('My Bookmarks').click();
        cy.url().should('include', bookmarksPage.bookmarkUrlPath);
        cy.get(homepage.articleCard).should('have.text', 'deep article');
        cy.get(bookmarks.emptyBookmarkMessage).should('not.be.visible');
    });

    it('The field officer should see all bookmarked articles when they click \'view all\' [ONS-64]', function () {
        cy.bookmarkArticle(firstArticlePath);
        cy.visit('');
        cy.get(`[href='${bookmarksPage.bookmarkUrlPath}']`).click();
        cy.url().should('include', bookmarksPage.bookmarkUrlPath);
        cy.get(search.searchResultTitle).should('have.text', 'My Bookmarks');
    });

});