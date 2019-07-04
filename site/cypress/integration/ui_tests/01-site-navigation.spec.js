/// <reference types="Cypress" />

const commands = require('../../support/commands.js');
const globalTestData = require('../../fixtures/globalTestData');

// fragments
const article = require('../../fixtures/fragments/article');
const menu = require('../../fixtures/fragments/menu');
const pagination = require('../../fixtures/fragments/pagination');
const search = require('../../fixtures/fragments/search');

// pages
const homepage = require('../../fixtures/pages/homepagePage');

const firstArticlePath = '/deep-article';

describe("Navigating the site and reading articles", function() {
    beforeEach(function () {
        cy.visit('');
        cy.get(homepage.homepageLogo).should('be.visible');
    });

    it('The correct elements of the homepage are visible', function () {
        cy.get(homepage.headerTitleSelfHelpFacility).should('have.text', 'Self Help Facility');
        cy.get(search.searchButton).should('be.visible');
        cy.get(menu.menuButton).should('be.visible');
        cy.get(homepage.exploreContentButton).should('be.visible');
        cy.get(homepage.tablistHeader).contains('RECENTLY UPDATED').should('be.visible');
        cy.get(homepage.tablistHeader).contains('MY BOOKMARKS').should('be.visible');
        cy.get(homepage.viewAllLink).first().contains('View all >').should('be.visible');
        cy.get(homepage.footerOnsMessage).contains('© Office for National Statistics 2019').should('be.visible');
    });

    it('An alert message is displayed on the homepage', function () {
        cy.get(homepage.alertMessage).should('be.visible');
    });

    it('Reading an article', function () {
        cy.get(homepage.articleCard).first().click();
        cy.get(article.content).should('be.visible');
    });

    it('Exploring content from an article to get to the Root page and dive into another section', function () {
        const firstOption = '#react-select-2-option-0';
        cy.visit(firstArticlePath);
        cy.get('.Button-subhead-Style').first().click();
        cy.get(firstOption).click();
        cy.url().should('include', '/explore');
        cy.get(homepage.articleCard).contains('Format Tests').click();
        cy.url().should('include', '/format-tests');
    });

    it('An image in an article', function () {
        const imageArticleUrlPath = '/image-tests';
        cy.visit(imageArticleUrlPath);
        cy.url().should('include', imageArticleUrlPath);
        cy.get(`[title='image title']`).then(($el) => {
          Cypress.dom.isVisible($el)
        })
    });

    it('Explore content on the homepage brings up the menu', function () {
        cy.get(menu.menuOverlay).should('not.be.visible');
        cy.get(homepage.exploreContentButton).click();
        cy.get(menu.menuOverlay).then(($el) => {
            Cypress.dom.isVisible($el)
        })
    });

    it('Opening the menu then closing it [ONS-58]', function () {
        cy.get(menu.menuOverlay).should('not.be.visible');
        cy.get(menu.menuButton).contains('Menu').click();
        cy.get(menu.menuOverlay).should('be.visible');
    });

    it('The field officer should see related articles [ONS-65]', function () {
        const editorialWorkflowArticle = 'editorial workflow';
        const editorialWorkflowPath = '/editorial-workflow';
        const reviwemeArticle = 'reviweme';
        const reviwemeUrlPath = '/reviweme';
        cy.visit(reviwemeUrlPath);
        cy.get(search.searchResultTitle).should('not.have.text', editorialWorkflowArticle);
        cy.contains('ALSO IN THIS TOPIC');
        cy.get(homepage.articleCard).contains(editorialWorkflowArticle).click();
        cy.url().should('include', editorialWorkflowPath);
        cy.get(search.searchResultTitle).should('not.have.text', reviwemeArticle);
        cy.get(search.searchResultTitle).should('have.text', editorialWorkflowArticle);
    });

    it('Most recent pagination', function () {
        const textAppearance = 'text-decoration';
        const underline = /underline/;
        // go to recently updated page
        cy.get(menu.menuButton).contains('Menu').click();
        cy.get(menu.menuLink).contains('Recently updated').click();

        // page 1 should be selected. Clicking it again should do nothing.
        cy.get(pagination.pagination1).should('have.css', textAppearance).and('match', underline);
        cy.get(pagination.pagination2).should('have.css', textAppearance).and('not.match', underline);
        cy.get(pagination.pagination1).click();
        cy.get(pagination.pagination1).should('have.css', textAppearance).and('match', underline);
        cy.get(pagination.pagination2).should('have.css', textAppearance).and('not.match', underline);

        // clicking page 2 should change switch selected pagination element
        cy.get(pagination.pagination2).click();
        cy.get(pagination.pagination2).should('have.css', textAppearance).and('match', underline);
        cy.get(pagination.pagination1).should('have.css', textAppearance).and('not.match', underline);

        // clicking back takes us back to 1 being selected
        cy.get(pagination.back).click();
        cy.get(pagination.pagination1).should('have.css', textAppearance).and('match', underline);
        cy.get(pagination.pagination2).should('have.css', textAppearance).and('not.match', underline);
        cy.get(pagination.back).should('not.be.visible');

        // clicking next takes us forward to 2 being selected
        cy.get(pagination.next).click();
        cy.get(pagination.pagination2).should('have.css', textAppearance).and('match', underline);
        cy.get(pagination.pagination1).should('have.css', textAppearance).and('not.match', underline);

        // after clicking next a couple more times, clicking first still takes us back to 1 being selected.
        cy.get(pagination.next).click();
        cy.get(pagination.next).click();
        cy.get(pagination.first).click();
        cy.get(pagination.pagination1).should('have.css', textAppearance).and('match', underline);
        cy.get(pagination.pagination2).should('have.css', textAppearance).and('not.match', underline);
        cy.get(pagination.first).should('not.be.visible');
    });

});