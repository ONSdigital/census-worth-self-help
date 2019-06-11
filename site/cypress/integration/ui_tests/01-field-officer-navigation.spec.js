/// <reference types="Cypress" />

const commands = require('../../support/commands.js');
const globalTestData = require('../../fixtures/globalTestData');

// fragments
const menu = require('../../fixtures/fragments/menu');

// pages
const homepage = require('../../fixtures/pages/homepagePage');

const firstArticlePath = '/deep-article';

describe("The user navigating the homepage", function() {
    beforeEach(function() {
        cy.visit('');
        cy.get(homepage.homepageLogo)
            .should('be.visible');
    });

    it('Reading an article', function() {
        cy.get(homepage.articleCard).first().click();
        cy.url().should('include', firstArticlePath);
        // check here to make sure it's on the correct article
    });

    it('Opening the menu then closing it', function() {
        cy.get(menu.menuOverlay).should('not.be.visible');
        cy.get(menu.menuButton).contains('Menu').click();
        cy.get(menu.menuOverlay).should('be.visible');
    });
});