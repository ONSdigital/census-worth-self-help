/// <reference types="Cypress" />

describe("Request the secured homepage with a valid cookie to check for a 200 status code and the homepage is available", function() {
    it('Check status code of site and homepage is up', function () {
        Cypress.env('RETRIES', 2);
        cy.request({
            method: 'GET',
            url: '/',
            headers: {
                cookie: Cypress.env('COOKIE')
            },
        })
            .then((resp) => {
                expect(resp.status).to.eq(200);
                expect(resp.body).to.have.string('RECENTLY UPDATED');
            });
    });
});


