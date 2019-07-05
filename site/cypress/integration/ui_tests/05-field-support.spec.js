/// <reference types="Cypress" />

const commands = require('../../support/commands.js');
const globalTestData = require('../../fixtures/globalTestData');

// fragments
const menu = require('../../fixtures/fragments/menu');
const search = require('../../fixtures/fragments/search');

// pages
const supportPage = require('../../fixtures/pages/contactSupportPage');
const homepage = require('../../fixtures/pages/homepagePage');

const censusFieldSupportTitle = 'Census Field Support';

describe("Contact support page", function() {
    beforeEach(function () {
        cy.visit('');
        cy.get(homepage.homepageLogo).should('be.visible');
    });

    it('The field officer goes to the Census Field Support page [ONS-47]', function () {
        cy.get(menu.menuButton).contains('Menu').click();
        cy.get(menu.menuOverlay).should('be.visible');
        cy.get(menu.menuLink).contains('Census Field Support').should('be.visible').click();
        cy.url().should('include', supportPage.contactCentrePath);
        cy.get(search.searchResultTitle).should('have.text', censusFieldSupportTitle);
    });

    it('The correct elements of the page are displayed [ONS-47]', function () {
        cy.visit(supportPage.contactCentrePath);
        cy.get(supportPage.tabHeading).contains('HAVE YOU TRIED...');
        cy.get(homepage.articleCard).contains('Injection Attack').should('be.visible');
        cy.get(supportPage.tabHeading).contains('CONTACTING FIELD SUPPORT');
        cy.get('.Card-heading-Style').should('not.have.text', 'null minutes');
        cy.get(supportPage.callSupportBlock).should('be.visible');
    });

    it('The field officer can view an article from the support page [ONS-47]', function () {
        const article = 'test article for contact screen';
        const articleURL = 'test-article-for-contact-screen';
        cy.visit(supportPage.contactCentrePath);
        cy.get(homepage.articleCard).contains(article).click();
        cy.url().should('include', '/'+articleURL);
        cy.get(search.searchResultTitle).should('have.text', article);
    });

});