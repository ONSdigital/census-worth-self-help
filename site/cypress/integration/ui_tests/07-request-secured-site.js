/// <reference types="Cypress" />

// To run this test, remove the 'x' in front of describe. Placing an x before a test suite or case, will cause it to be skipped
xdescribe("Request the secured homepage with a valid cookie to check for a 200 status code and the homepage is available", function() {
    it('SSO request 2', function () {
        cy.request({
            method: 'GET',
            url: 'https://secured.worth.census-gcp.onsdigital.uk/',
            headers: {
                authority: 'secured.worth.census-gcp.onsdigital.uk',
                pragma: 'no-cache',
                cache: 'no-cache',
                userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
                accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
                referer: 'https://accounts.google.com/o/saml2/idp?from_login=1&zt=ChRxci1QWGZXU2JwdG91d3g0UGNZbhIfQThiNzVVUGVTVlVSMEVBN1JaNXdOM05OVFNFR3ZoWQ%E2%88%99AJDr988AAAAAXShUFP2zpdyswtB2o6Nv54ZljuQ6RzlV&as=9tVWcb0iIfG2QGX3xZqomw&authuser=0',
                encoding: 'gzip, deflate, br',
                language: 'en-GB,en-US;q=0.9,en;q=0.8',
                // In the keybase repo, grab the cookie from the secret in cypress/secrets.txt
                cookie: ''
            },
        })
            .then((resp) => {
                expect(resp.status).to.eq(200);
                expect(resp.body).to.have.string('RECENTLY UPDATED');
            });
    });
});


