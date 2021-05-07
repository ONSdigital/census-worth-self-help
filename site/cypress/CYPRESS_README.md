# Recommended approach
## Run all Acceptance tests 

They should be run against a production-like (gatsby build gatsby serve) version of the site for consistency.
    
    cd site
    export EXCLUDE_DRAFTS='true'
    ./localbuild.sh && npm run clean && npm run build && npm run serve
    npm run cy-open

"chromeWebSecurity": false has been added to cypress.json to prevent CORS errors
The security errors are complaining about how the acceptance tests are navigating the site, so there isn't a concern about apparently 'turning off security'.

# Older/other approaches

## Run an individual spec

In order to run individual spec files, you can run:

    ./node_modules/.bin/cypress run --spec cypress/integration/ui_tests/e2e_tests/<file_name>

You can also run specific tests through the cy-open UI

## Browser argument

You can also add `--browser=chrome` if you want to run a test without opening the test runner:

    ./node_modules/.bin/cypress run --browser=chrome --spec <path/to/file>
    
## Scripts in package.json

There are scripts in package.json to run with either headless or with the test runner open:

    npm run e2e
    npm run e2e-test-runner

You will also need to export the environment variables for live chat before running the tests. These are in the secrets
repo.

## Run against remote environment

    CYPRESS_BASE_URL=<remote environment> <cypress command>

    e.g.
    CYPRESS_BASE_URL=https://remote-environment.co.uk/ npm run cy-open"
    cy-open is preferred as we have had issues running with headless command cy-run

# x to skip a test suites or test cases
You can place an 'x' before a test suite or case to skip it e.g. `xdescribe` or `xtest`

# Secured request test
In order to run the secured_request test, you need to create a symbolic link in the keybase repo (make sure localhost is
running, as the baseURL property in cypress.json will always look for localhost):
    

cd into the site folder in your ONS project

    ln -s ../../secrets/cypress/cypress_env_variables.sh .
    npm run e2e-secured-test
    OR
    npm run e2e-secured-open
       
# Merging mochawesome.json files to generate a single HTML report
To get a HTML report, after a test has finished and JSON file has been created as the report, then run:

    npm run merge-reports
    
This will compile all JSON report files into a single HTML file, to open in a browser.

After you do npm run merge:reports, you need to clear the mochawesome.json file. So you can run:

    ./cleanReportsScreenshotsVideos.sh
    
This is only really useful locally and is not run in the pipeline.

# NPM script naming convention
Stick with kebab case for naming npm scripts longer than two words e.g. test-run, not test:run or testRun.