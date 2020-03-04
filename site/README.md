# Run locally

    npm install
    npm run local

# Alternatively serve as we do when doing a production deploy

    npm install
    gatsby build
    gatsby serve

# Run e2e tests

    npm run e2e

Or to run test interactively

    
    npm run clean
    npm run local:production-like
    npm run cy-open

See [e2e README](cypress/CYPRESS_README.md) for more details.

# Clear build cache

    npm run clean

# Deploy GCP app engine service

    npm install
    npm run build

    gcloud auth login
    gcloud app deploy

## Run through Docker

    npm install
    npm run build
    docker build -t ons-site .
    docker run -d -p 3000:80 --name ons-dev-site ons-site

# Deploying matomo

By default Matomo will not run and the local build will not report feedback

To report to Matomo you must add the following environment variables:

    export ENABLE_MATOMO=true
    export MATOMO_SITE_ID= ...
    export MATOMO_IP= ...
    export MATOMO_URL= ...

The site_id, ip and url will depend on what you have configured your matomo instance is. (For worth details see keybase)

You will then need to do a gatsby build and serve ( Not an npm run local! )

# Adding Video Path

    export GATSBY_ASSETS_PATH=...
