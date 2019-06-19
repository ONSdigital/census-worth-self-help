#!/usr/bin/env bash

echo "Creating certificates in .deploy/sp"
mkdir -p .deploy/sp
cd .deploy/sp
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -subj "/C=GB/CN=mock-host" -keyout sp.key -out sp.crt