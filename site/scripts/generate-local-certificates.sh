#!/usr/bin/env bash

echo "Creating certificates in .secrets/sp for local development"
mkdir -p .secrets/sp
cd .secrets/sp
if [[ -f sp.key  ]] ; then
  echo "SP key has already been created, not creating again"
  exit 1
fi
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -subj "/C=GB/CN=mock-host" -keyout sp.key -out sp.certificate