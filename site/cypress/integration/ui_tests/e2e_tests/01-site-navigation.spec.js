/// <reference types="Cypress" />

const globalTestData = require('../../../fixtures/globalTestData');

// fragments
const article = require('../../../fixtures/fragments/article');
const menu = require('../../../fixtures/fragments/menu');
const pagination = require('../../../fixtures/fragments/pagination');
const search = require('../../../fixtures/fragments/search');

// pages
const homepage = require('../../../fixtures/pages/homepagePage');

describe("Navigating the site and reading articles", function() {
    beforeEach(function () {
        Cypress.env('RETRIES', 2);
        cy.visit('');
        cy.get(homepage.homepageLogo).should('be.visible');
    });

    it('The favicon is included in the deployed site', function() {
        cy.request(globalTestData.faviconPath);
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
        cy.visit(globalTestData.deepArticlePath);
        cy.get('.Button-subhead-Style').first().click();
        cy.get(firstOption).click();
        cy.url().should('include', globalTestData.explorePagePath);
        cy.get(homepage.articleCard).contains('Format Tests').click();
        cy.url().should('include', globalTestData.formatTestsPath);
    });

    it('An image in an article', function () {
        const imageTitle = `[title='image title']`;
        cy.visit(globalTestData.imageArticlePath);
        cy.url().should('include', globalTestData.imageArticlePath);
        cy.get(imageTitle).then(($el) => {
          Cypress.dom.isVisible($el)
        })
    });

    it('If there are no roles associated with an article then show an error', function () {
      cy.visit(globalTestData.deepArticlePath);
      cy.get(article.roles).should('have.text', 'Error please notify Field Staff Support there are no roles associated with this article');
      cy.get(article.roles).should('have.css', 'color', globalTestData.errorTextColour);
    });

    it('The role associated with an article is shown on the page', function () {
      cy.visit(globalTestData.aVerySimpleArticlePath);
      cy.get(article.roles).should('have.text', 'A Role');
    });

    it('The multiple roles associated with an article is shown on the page', function () {
      cy.visit(globalTestData.anArticleWithRolesPath);
      cy.get(article.roles).should('have.text', 'A Role, B Role, C Role, D Role, E Role, F Role, G Role, H Role, I Role, J Role');
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
        cy.get(menu.menuButton).contains('Close').click();
        cy.get(menu.menuButton).contains('Menu');
        cy.get(menu.menuOverlay).should('not.be.visible');
    });

    it('The field officer should see related articles [ONS-65]', function () {
        cy.visit(globalTestData.reviwemePath);
        cy.get(search.searchResultTitle).should('not.have.text', globalTestData.editorialWorkflowArticle);
        cy.contains('ALSO IN THIS TOPIC');
        cy.get(homepage.articleCard).contains(globalTestData.editorialWorkflowArticle).click();
        cy.url().should('include', globalTestData.editorialWorkflowPath);
        cy.get(search.searchResultTitle).should('not.have.text', globalTestData.reviwemeArticle);
        cy.get(search.searchResultTitle).should('have.text', globalTestData.editorialWorkflowArticle);
    });

    it('The field officer dives deeper into directories to find an article', function () {
        // Alias
        cy.get(homepage.articleCard).as('articleCard');

        cy.get(homepage.exploreContentButton).click();

        cy.contains('many directories deep').click();
        cy.url().should('include', '/many-directories-deep/');

        cy.get('@articleCard').should('have.text', 'deep 2').click();
        cy.url().should('include', '/deep-2/');

        cy.get('@articleCard').should('have.text', 'deep 3').click();
        cy.url().should('include', '/deep-3/');

        cy.get('@articleCard').should('have.text', 'deep 4').click();
        cy.url().should('include', '/deep-4/');

        cy.get('@articleCard').should('have.text', 'deep 5').click();
        cy.url().should('include', '/deep-5/');

        cy.get('@articleCard').should('have.text', globalTestData.deepArticle).click();
        cy.url().should('include', globalTestData.deepArticlePath);

        cy.get(search.searchResultTitle).should('have.text', globalTestData.deepArticle);
    });

    it("Pagination on related articles [ONS-405]", function() {
        cy.visit(globalTestData.aVerySimpleArticlePath)
        cy.get(search.searchResultTitle).should(
          "not.have.text",
          globalTestData.editorialWorkflowArticle
        )
        cy.contains("ALSO IN THIS TOPIC")
        const textAppearance = "text-decoration"
        const underline = /underline/
        // page 1 should be selected. Clicking it again should do nothing.
        cy.get(pagination.pagination1)
          .should("have.css", textAppearance)
          .and("match", underline)
        cy.get(pagination.pagination2)
          .should("have.css", textAppearance)
          .and("not.match", underline)
        cy.get(pagination.pagination1).click()
        cy.get(pagination.pagination1)
          .should("have.css", textAppearance)
          .and("match", underline)
        cy.get(pagination.pagination2)
          .should("have.css", textAppearance)
          .and("not.match", underline)
        // clicking page 2 should change switch selected pagination element
        cy.get(pagination.pagination2).click()
        cy.get(pagination.pagination2)
          .should("have.css", textAppearance)
          .and("match", underline)
        cy.get(pagination.pagination1)
          .should("have.css", textAppearance)
          .and("not.match", underline)
        // clicking back takes us back to 1 being selected
        cy.get(pagination.back).click()
        cy.get(pagination.pagination1)
          .should("have.css", textAppearance)
          .and("match", underline)
        cy.get(pagination.pagination2)
          .should("have.css", textAppearance)
          .and("not.match", underline)
        cy.get(pagination.back).should("not.be.visible")
        // clicking next takes us forward to 2 being selected
        cy.get(pagination.next).click()
        cy.get(pagination.pagination2)
          .should("have.css", textAppearance)
          .and("match", underline)
        cy.get(pagination.pagination1)
          .should("have.css", textAppearance)
          .and("not.match", underline)
      })

    it('Most recent pagination [ONS-64]', function () {
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