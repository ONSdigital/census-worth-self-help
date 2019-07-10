#!/bin/bash

set +x
echo ${BACKEND_CONTENT_REPO}
echo ${AUTH_KEY} > encrypted_key.txt
set -x
base64 -d encrypted_key.txt > service-account.json
gcloud auth activate-service-account --key-file service-account.json