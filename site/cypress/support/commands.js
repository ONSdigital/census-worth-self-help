const bookmarks = require('../fixtures/fragments/bookmarks');

Cypress.Commands.add('bookmarkArticle', (articlePath) => {
    const header = '.Button-heading-Style';
    cy.visit(articlePath);
    cy.get(bookmarks.bookmarkBlockButton).click();
    cy.get(header).first().should('have.text', bookmarks.bookmarkedText);
});