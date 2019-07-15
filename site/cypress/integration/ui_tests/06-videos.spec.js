/// <reference types="Cypress" />

const commands = require('../../support/commands.js');
const globalTestData = require('../../fixtures/globalTestData');

// pages
const homepage = require('../../fixtures/pages/homepagePage');

describe("Videos in articles", function() {
    beforeEach(function () {
        cy.visit('');
        cy.get(homepage.homepageLogo).should('be.visible');
    });

    it('The field officer can see a video on an article [ONS-169]', function () {
        const videoArticlePath = '/video-test/';
        cy.visit(videoArticlePath);
        cy.url().should('include', videoArticlePath);
        cy.get('source').should('have.attr', 'type', 'video/mp4');
    });

    it('The field officer should not see a video on an article if one has not been uploaded [ONS-169]', function () {
        cy.visit(globalTestData.firstArticlePath);
        cy.get('source').should('not.be.visible');
    })
});