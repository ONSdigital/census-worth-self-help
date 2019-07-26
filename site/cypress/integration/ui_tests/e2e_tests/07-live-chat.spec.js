/// <reference types="Cypress" />

const globalTestData = require('../../../fixtures/globalTestData');

// fragments
const webchat = require('../../../fixtures/fragments/webchat');

// pages
const homepage = require('../../../fixtures/pages/homepagePage');

xdescribe("Live chat", function() {
    beforeEach(function () {
        Cypress.env('RETRIES', 2);
        cy.visit('');
        cy.get(homepage.homepageLogo).should('be.visible');
    });

    it('The field officer can see the live chat icon on an article with webchat as a tag [ONS-122]', function () {
        cy.visit(globalTestData.aVerySimpleArticlePath);
        cy.wait(5000);
        cy.get(webchat.liveChatButton).should('be.visible');
    });

    it('The field officer cannot see the live chat icon on an article with no webchat tag [ONS-122]', function () {
        cy.visit(globalTestData.deepArticlePath);
        cy.get(webchat.liveChatButton).should('not.be.visible');
    });
});