#!/bin/bash
mkdir -p build
cp app.yaml build/app-with-env.yaml

echo >> build/app-with-env.yaml
echo "env_variables:" >> build/app-with-env.yaml
sed "s/\(.*\)=\(.*\)/  \1: '\2'/" .env >> build/app-with-env.yaml

