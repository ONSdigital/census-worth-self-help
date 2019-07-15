# Run an individual spec
In order to run individual spec files, you can run:
    `./node_modules/.bin/cypress run --spec cypress/integration/ui_tests/<file_name>`

# Browser argument    
You can also add `--browser=chrome` if you want to run a test without opening the test runner:
    `./node_modules/.bin/cypress run --browser=chrome --spec <path/to/file>`
    
# Scripts in package.json
There are scripts in package.json to run with either the test runner or headless:
    `npm run cy:open` - Test runner
    `npm run cy:run` - Headless

# x to skip a test suites or test cases
You can place an 'x' before a test suite or case to skip it e.g. `xdescribe` or `xtest`

# Secured request test
In order to run the secured_request test, you need to create a symbolic link in the keybase repo (make sure localhost is
running, as the baseURL property in cypress.json will always look for localhost):
    
    `cd into the site folder in your ONS project
    ln ~/secrets/cypress/cypress_env_variables.sh
    npm run cy:secured:test`
       
# Merging mochawesome.json files to generate a single HTML report
To get a HTML report, after a test has finished and JSON file has been created as the report, then run:
    `npm run merge:reports`
This will compile all JSON report files into a single HTML file, to open in a browser.

After you do npm run merge:reports, you need to clear the mochawesome.json file. So you can run:
    `./cleanReportsScreenshotsVideos.sh`
This is only really useful locally and is not run in the pipeline.

# NPM script naming convention
Stick with kebab case for naming npm scripts longer than two words e.g. test-run, not test:run or testRun.