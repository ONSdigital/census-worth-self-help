/// <reference types="Cypress" />

// fragments

describe("Call centre only articles", function() {
    it('An article with the cc only flag set should not be visible [ONS-359]', () => {
        cy.visit('/ready-for-production-test-article');
        cy.getArticleContent().should('be.visible');
        cy.visit('/cc-only-article');
        cy.getArticleContent().should('not.be.visible');
    });
});