#!/usr/bin/env bash

mkdir -p tmp
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -subj "/C=EN/CN=localhost" -keyout tmp/sp.key -out tmp/sp.crt