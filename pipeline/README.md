# pre-requisites

Install Concourse locally and install fly command

# Local validation

    fly -t local login -c http://127.0.0.1:8080
    fly -t local set-pipeline -c dev_pipeline.yml -p self-help