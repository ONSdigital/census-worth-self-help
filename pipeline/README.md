# pre-requisites

Install Concourse locally, e.g. with https://github.com/concourse/concourse-docker, 
log in to web console and install fly command.

# Local validation

    AUTH_VAR=$(cat pipeline-auth.json | base64)
    fly -t local login -c http://127.0.0.1:8080 -u test -p test
    fly -t local set-pipeline -c pipeline-dev.yml -p self-help
    fly -t local unpause-pipeline -p self-help

# Other pipelines

    fly -t local set-pipeline -c pipeline-cms.yml -p self-help-cms

# Troubleshooting

    fly -t local unpause-job  -j self-help/build 
    fly -t local abort-build -j self-help/build --build 4 

# Clean up

    fly -t local destroy-pipeline -p self-help
    