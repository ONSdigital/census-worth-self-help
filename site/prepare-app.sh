#!/bin/bash
APP_FILE=ci-app.yaml
cp app.yaml ${APP_FILE}

echo >> ${APP_FILE}
echo "env_variables:" >> ${APP_FILE}
sed "s/\(.*\)=\(.*\)/  \1: '\2'/" .env >> ${APP_FILE}

