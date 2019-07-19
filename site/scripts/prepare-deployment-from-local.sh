#!/usr/bin/env bash


cd "$(dirname "$0")"
cd ..
# Clear out modified app.yaml so that we create from scratch from source and configuration
rm ci-app.yaml

scripts/generate-local-certificates.sh
. scripts/initialise-shell-variables.sh

../pipeline/tasks/task-scripts/configure-app.sh
../pipeline/tasks/task-scripts/validate-deploy-site-env.sh
../pipeline/tasks/task-scripts/prepare-protected-site.sh

npm run build-no-audit-no-test