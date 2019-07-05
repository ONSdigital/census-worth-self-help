# pre-requisites

Install Concourse locally, e.g. with https://github.com/concourse/concourse-docker, 
log in to web console and install fly command.

# Local validation

    set -x CI_URL=...provide-ci-server-url-here....
    fly -t ci login -c $CI_URL

# Set pipelines

    fly -t ci set-pipeline -c pipeline-build.yml -p build
    fly -t ci set-pipeline -c pipeline-cms.yml -p self-help-cms
    fly -t ci set-pipeline -c pipeline-dev.yml -p dev
    fly -t ci set-pipeline -c pipeline-control.yml -p control
    fly -t ci set-pipeline -c pipeline-protected.yml -p protected
    fly -t ci set-pipeline -c pipeline-report.yml -p report
    fly -t ci set-pipeline -c pipeline-test.yml -p self-help-test   
    fly -t ci set-pipeline -c pipeline-trigger.yml -p trigger

# Troubleshooting

    fly -t ci unpause-job  -j self-help/build 
    fly -t ci abort-build -j self-help/build --build 4 

# Clean up

    fly -t ci destroy-pipeline -p self-help
    