/// <reference types="Cypress" />

// fragments
const article = require('../../../fixtures/fragments/article');

describe("Draft articles", function() {
    it('An article with the draftreason field or \'draft\' tag should not be visible [ONS-232] and [ONS-351]', function () {
        cy.visit('/draft-test-article', {failOnStatusCode: false});
        cy.isPageNotFoundPage();
        cy.visit('/draft-legacy-test-article', {failOnStatusCode: false});
        cy.isPageNotFoundPage();
        cy.visit('/ready-for-production-test-article');
        cy.isArticlePage();
    });
});