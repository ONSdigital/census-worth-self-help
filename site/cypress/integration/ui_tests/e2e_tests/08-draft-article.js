/// <reference types="Cypress" />

// fragments
const article = require('../../../fixtures/fragments/article');

describe("Draft articles", function() {
    it('An article with the \'draft\' tag should not be visible [ONS-232]', function () {
        cy.exec('echo $EXCLUDE_DRAFTS').its('stdout').should('eq', 'true');
        cy.visit('/draft-test-article');
        cy.get(article.content).should('not.be.visible');
    });
});