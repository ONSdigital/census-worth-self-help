In order to run individual spec files, you can run:
    `./node_modules/.bin/cypress run --spec cypress/integration/ui_tests/<file_name>`
    
There are scripts in package.json to run with either the test runner or headless:
    `npm run cy:open` - Test runner
    `npm run cy:run` - Headless
    
You can place an 'x' before a test suite or case to skip it e.g. `xdescribe` or `xtest`