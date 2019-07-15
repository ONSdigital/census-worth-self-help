In order to run individual spec files, you can run:
    `./node_modules/.bin/cypress run --spec cypress/integration/ui_tests/<file_name>`
    
There are scripts in package.json to run with either the test runner or headless:
    `npm run cy:open` - Test runner
    `npm run cy:run` - Headless
You can also add `--browser=chrome` if you want to run a test without opening the test runner:
    `./node_modules/.bin/cypress run --browser=chrome --spec <path/to/file>`

You can place an 'x' before a test suite or case to skip it e.g. `xdescribe` or `xtest`

In order to run the secured_request test, you need to create a symbolic link in the keybase repo (make sure localhost is
running, as the baseURL property in cypress.json will always look for localhost):
    
    
    `cd into the site folder in your ONS project
    ln ~/secrets/cypress/cypress_env_variables.sh
    npm run cy:secured:test`
       
To get a HTML report, after a test has finished and JSON file has been created as the report, then run:
    `npm run merge:reports`
This will compile all JSON report files into a single HTML file, to open in a browser.