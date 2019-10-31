/// <reference types="Cypress" />

// fragments
const article = require('../../../fixtures/fragments/article');

describe("Draft articles", function() {
    it('An article with the \'draft\' tag should not be visible [ONS-232] and [ONS-351]', function () {
        Cypress.env('RETRIES', 2);
        cy.visit('/draft-test-article');
        cy.get(article.content).should('not.be.visible');
        cy.visit('/draft-legacy-test-article');
        cy.get(article.content).should('not.be.visible');
        cy.visit('/ready-for-production-test-article');
        cy.get(article.content).should('not.visible');
    });
});