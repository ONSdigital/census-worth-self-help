#!/bin/bash

set -e

appFile=${1:-"ci-app.yaml"}
cp app.yaml ${appFile}

case `uname -a` in
  Darwin*) sed_inline () { sed -i '' "$@"; };;
  *)       sed_inline () { sed -i "$@"; };;
esac

if [[ ! -z "${SERVICE}" ]] ; then
  sed_inline "s/service:.*/service: $SERVICE/" ${appFile}
fi
if [[ ! -z "${BACKEND_CONTENT_REPO}" ]] ; then
  sed_inline "s/  repo:.*/  repo: ONSdigital\/$BACKEND_CONTENT_REPO/" public/admin/config.yml
fi