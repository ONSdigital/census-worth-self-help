# pre-requisites

Install Concourse locally, e.g. with https://github.com/concourse/concourse-docker, 
log in to web console and install fly command.

# Local validation

    set -x CI_URL=...provide-ci-server-url-here....
    fly -t ci login -c $CI_URL

    fly -t ci set-pipeline -c pipeline-dev.yml -p self-help
    fly -t ci unpause-pipeline -p self-help

# Other pipelines

    fly -t ci set-pipeline -c pipeline-test.yml -p self-help-test
    fly -t ci set-pipeline -c pipeline-cms.yml -p self-help-cms

# Troubleshooting

    fly -t ci unpause-job  -j self-help/build 
    fly -t ci abort-build -j self-help/build --build 4 

# Clean up

    fly -t ci destroy-pipeline -p self-help
    