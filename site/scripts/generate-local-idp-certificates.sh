#!/usr/bin/env bash

mkdir -p .secrets/idp
if [[ -f .secrets/idp/idp.certificate ]] ; then
  echo "IDP keys have already been created in .secrets/idp"
  exit 1
fi

openssl req -x509 -new -newkey rsa:2048 -nodes -subj \
  "/C=EN/CN=localhost" -keyout .secrets/idp/idp.key -out .secrets/idp/idp.certificate -days 7300