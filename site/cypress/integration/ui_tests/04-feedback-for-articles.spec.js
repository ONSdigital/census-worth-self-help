/// <reference types="Cypress" />

const commands = require('../../support/commands.js');
const globalTestData = require('../../fixtures/globalTestData');

// fragments
const feedback = require('../../fixtures/fragments/feedback');

// pages
const homepage = require('../../fixtures/pages/homepagePage');

const firstArticlePath = '/deep-article';
const useful = 'Useful';
const notUseful = 'Not useful';

describe("Article feedback", function() {
    beforeEach(function () {
        cy.visit('');
        cy.get(homepage.homepageLogo).should('be.visible');
    });

    it('Marking an article as useful', function () {
        cy.visit(firstArticlePath);
        cy.get(feedback.feedbackButtonText).contains(useful).click();
        cy.get(feedback.feedbackNotification).should('be.visible');
        cy.get(feedback.feedbackButtonSelected).should('have.text', useful);
        cy.get(feedback.feedbackButtonSelected).should('not.have.text', notUseful);
    });

    it('Marking an article as not useful, but cancelling it', function() {
        cy.visit(firstArticlePath);
        cy.get(feedback.feedbackButtonText).contains(notUseful).click();
        cy.get(feedback.feedbackTextField).should('be.visible').type('feedback');
        cy.get(feedback.cancelFeedbackButton).should('be.visible').click();
        cy.get(feedback.feedbackNotification).should('not.be.visible');
        cy.get(feedback.feedbackButtonSelected).should('not.be.visible');
    });

    it('Marking an article as not useful, then submitting feedback', function() {
        cy.visit(firstArticlePath);
        cy.get(feedback.feedbackButtonText).contains(notUseful).click();
        cy.get(feedback.feedbackTextField).should('be.visible').type('feedback');
        cy.get(feedback.submitFeedbackButton).should('be.visible').click();
        cy.get(feedback.feedbackNotification).should('be.visible');
        cy.get(feedback.feedbackButtonSelected).should('have.text', notUseful);
        cy.get(feedback.feedbackButtonSelected).should('not.have.text', useful);
    });

});