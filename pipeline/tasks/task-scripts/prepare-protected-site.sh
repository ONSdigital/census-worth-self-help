#!/bin/bash

appFile=${1:-"ci-app.yaml"}

# SSO Protection
if [[ "${PROTECTED}" == "true" ]] ; then
  if [[ ! -f ${appFile} ]] ; then
    cp app.yaml ${appFile}
  fi
  echo "Enhancing ${appFile} with env_variables"
  mkdir -p .deploy/idp
  mkdir -p .deploy/sp

  set +x
  mkdir -p .build
  echo ${IDP_CERTIFICATE} > .build/encoded-idp-certificate.txt
  echo ${SP_CERTIFICATE} > .build/encoded-sp-certificate.txt
  echo ${SP_KEY} > .build/encoded-sp-key.txt
  set -x

  if [[ `base64 --help | grep "GNU coreutils" | wc -l` -gt 0 ]] ; then
    # Linux
    base64 -d tmp/encoded-idp-certificate.txt > .deploy/idp/idp.certificate
    base64 -d tmp/encoded-sp-certificate.txt > .deploy/sp/sp.certificate
    base64 -d tmp/encoded-sp-key.txt > .deploy/sp/sp.key
  elif [[ `base64 --help | grep "hvD" | wc -l` -gt 0 ]] ; then
    # MacOS
    base64 -D -i tmp/encoded-idp-certificate.txt > .deploy/idp/idp.certificate
    base64 -D -i tmp/encoded-sp-certificate.txt > .deploy/sp/sp.certificate
    base64 -D -i tmp/encoded-sp-key.txt > .deploy/sp/sp.key
  else
    echo "Unrecognised base64 command"
    exit 1
  fi
  set -x

  if [[ `grep SP_CALLBACK_URL ${appFile} | wc -l` -gt 0 ]] ; then
    echo "App file ${appFile} has already been enhanced"
    exit 1
  fi
  echo "env_variables:" >> ${appFile}
  echo "  SP_CALLBACK_URL: 'https://${DOMAIN_NAME}/sso/callback'" >> ${appFile}
  echo "  SP_ENTITY_ID: 'https://${DOMAIN_NAME}/saml/metadata'" >> ${appFile}
  echo "  IDP_ENTRY_POINT: '${IDP_ENTRY_POINT}'" >> ${appFile}
  set +x
  echo "  COOKIE_SECRET: '${COOKIE_SECRET}'" >> ${appFile}
  set -x
fi