#!/usr/bin/env bash

mkdir -p .deploy/idp
cd .deploy/idp
if [[ -f idp-private-key.pem ]] ; then
  echo "IDP keys have already been created in .deploy/idp"
  exit 1
fi

openssl req -x509 -new -newkey rsa:2048 -nodes -subj \
  "/C=EN/CN=localhost" -keyout idp-private-key.pem -out idp-public-cert.pem -days 7300