/// <reference types="Cypress" />

const globalTestData = require('../../../fixtures/globalTestData');

// pages
const homepage = require('../../../fixtures/pages/homepagePage');

describe("Videos in articles", function() {
    it('The field officer can see a video on an article [ONS-169]', function () {
        cy.visitPage(globalTestData.videoArticlePath);
        cy.get('source').should('have.attr', 'type', 'video/mp4');
    });

    it('The field officer should not see a video on an article if one has not been uploaded [ONS-169]', function () {
        cy.visitPage(globalTestData.deepArticlePath);
        cy.get('source').should('not.be.visible');
    })
});