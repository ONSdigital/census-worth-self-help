/// <reference types="Cypress" />

const commands = '../../support/commands.js';
const homepage = require('../../fixtures/pages/homepagePage');
const menu = require('../../fixtures/fragments/menu');

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