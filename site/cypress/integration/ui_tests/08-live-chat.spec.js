/// <reference types="Cypress" />

const commands = require('../../support/commands.js');
const globalTestData = require('../../fixtures/globalTestData');

// fragments
const webchat = require('../../fixtures/fragments/webchat');

// pages
const homepage = require('../../fixtures/pages/homepagePage');

const firstArticlePath = '/deep-article/';

describe("Live chat", function() {
    beforeEach(function () {
        cy.visit('');
        cy.get(homepage.homepageLogo).should('be.visible');
    });

    it('The field officer can see the live chat icon on an article with webchat as a tag [ONS-122]', function () {
        cy.visit(globalTestData.articleURL);
        cy.wait(1000);
        cy.get(webchat.liveChatButton).should('be.visible');
    });

    it('The field officer cannot see the live chat icon on an article with no webchat tag [ONS-122]', function () {
        cy.visit(globalTestData.firstArticlePath);
        cy.get(webchat.liveChatButton).should('not.be.visible');
    });
});