/// <reference types="Cypress" />

const globalTestData = require('../../../fixtures/globalTestData');

// fragments
const feedback = require('../../../fixtures/fragments/feedback');

// pages
const homepage = require('../../../fixtures/pages/homepagePage');

const useful = 'Useful';
const notUseful = 'Not useful';

describe("Article feedback", function() {
    beforeEach(function () {
        Cypress.env('RETRIES', 2);
        cy.visit('');
        cy.get(homepage.homepageLogo).should('be.visible');
    });

    it('Marking an article as useful [ONS-57]', function () {
        cy.visit(globalTestData.deepArticlePath);
        cy.get(feedback.feedbackButtons).contains(useful).click();
        cy.get(feedback.feedbackTextField).should('be.visible').type('feedback');
        cy.get(feedback.submitFeedbackButton).should('be.visible').click();
        cy.get(feedback.feedbackNotification).should('be.visible');
        cy.get(feedback.feedbackButtonSelected).should('have.text', useful);
        cy.get(feedback.feedbackButtonSelected).should('not.have.text', notUseful);
    });

    it('Marking an article as not useful, but cancelling it [ONS-57]', function() {
        cy.visit(globalTestData.deepArticlePath);
        cy.get(feedback.feedbackButtons).contains(notUseful).click();
        cy.get(feedback.feedbackTextField).should('be.visible').type('feedback');
        cy.get(feedback.cancelFeedbackButton).should('be.visible').click();
        cy.get(feedback.feedbackNotification).should('not.be.visible');
        cy.get(feedback.feedbackButtonSelected).should('not.be.visible');
    });

    it('Marking an article as not useful, then submitting feedback [ONS-57]', function() {
        cy.visit(globalTestData.deepArticlePath);
        cy.get(feedback.feedbackButtons).contains(notUseful).click();
        cy.get(feedback.feedbackTextField).should('be.visible').type('feedback');
        cy.get(feedback.submitFeedbackButton).should('be.visible').click();
        cy.get(feedback.feedbackNotification).should('be.visible');
        cy.get(feedback.feedbackButtonSelected).should('have.text', notUseful);
        cy.get(feedback.feedbackButtonSelected).should('not.have.text', useful);
    });

});