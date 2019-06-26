#!/bin/bash

appFile=${1:-"ci-app.yaml"}

# SSO Protection
if [[ "${PROTECTED}" == "true" ]] ; then
  if [[ ! -f ${appFile} ]] ; then
    echo "Cannot find app file ${appFile} to enhance"
    exit 1
  fi
  echo "Enhancing ${appFile} with env_variables"
  mkdir -p .deploy/idp
  mkdir -p .deploy/sp

  echo ${IDP_CERTIFICATE} > .deploy/idp/idp.certificate
  echo ${SP_CERTIFICATE} > .deploy/sp/sp.certificate
  echo ${SP_KEY} > .deploy/sp/sp.key

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