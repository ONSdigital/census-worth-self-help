/// <reference types="Cypress" />

// fragments

describe("Call centre only articles", function() {
    it('An article with the cc only flag set should not be visible [ONS-359]', () => {
        cy.visit('/ready-for-production-test-article');
        cy.isArticlePage();
        cy.visit('/cc/only-article', {failOnStatusCode: false});
        cy.isPageNotFoundPage();
    });
});