/// <reference types="Cypress" />

// fragments
const article = require('../../../fixtures/fragments/article');

describe("Call centre only articles", function() {
    it('An article with the cc only flag set should not be visible [ONS-359]', () => {
        cy.visit('/cc-only-article');
        cy.get(article.content).should('not.be.visible');
    });
});