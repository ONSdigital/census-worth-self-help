#!/usr/bin/env bash

mkdir -p .cache/sp
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -subj "/C=EN/CN=localhost" -keyout .cache/sp/sp.key -out .cache/sp/sp.crt