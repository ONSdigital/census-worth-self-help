/// <reference types="Cypress" />

// fragments
const article = require('../../../fixtures/fragments/article');

describe("Draft articles", function() {
    it('An article with the draftresason field or \'draft\' tag should not be visible [ONS-232] and [ONS-351]', function () {
        cy.visit('/draft-test-article');
        cy.getArticleContent().should('not.be.visible');
        cy.visit('/draft-legacy-test-article');
        cy.getArticleContent().should('not.be.visible');
        cy.visit('/ready-for-production-test-article');
        cy.getArticleContent().should('be.visible');
    });
});