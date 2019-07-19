#!/bin/bash

set -e

appFile=${1:-"ci-app.yaml"}
spProtocol=${SP_PROTOCOL:-"https"}

if [[ `grep SP_CALLBACK_URL ${appFile} | wc -l` -gt 0 ]] ; then
  echo "App file ${appFile} has already been enhanced"
  exit 1
fi

echo "Enhancing ${appFile} with env_variables"
# SSO Protection
if [[ "${SP_PROTECTED}" != "false" ]] ; then
  if [[ ! -f ${appFile} ]] ; then
    cp app.yaml ${appFile}
  fi
  mkdir -p .deploy/idp
  mkdir -p .deploy/sp

  set +x
  mkdir -p .build
  echo ${IDP_CERTIFICATE} > .build/encoded-idp-certificate.txt
  echo ${SP_CERTIFICATE} > .build/encoded-sp-certificate.txt
  echo ${SP_KEY} > .build/encoded-sp-key.txt
  set -x

  case `uname -a` in
    Darwin*)
      # MacOS
      base64 -D -i .build/encoded-idp-certificate.txt > .deploy/idp/idp.certificate
      base64 -D -i .build/encoded-sp-certificate.txt > .deploy/sp/sp.certificate
      base64 -D -i .build/encoded-sp-key.txt > .deploy/sp/sp.key
      ;;
    *)
      # Linux
      base64 -d .build/encoded-idp-certificate.txt > .deploy/idp/idp.certificate
      base64 -d .build/encoded-sp-certificate.txt > .deploy/sp/sp.certificate
      base64 -d .build/encoded-sp-key.txt > .deploy/sp/sp.key
  esac
  set -x

  echo "env_variables:" >> ${appFile}
  set +x
  echo "  COOKIE_SECRET: '${COOKIE_SECRET}'" >> ${appFile}
  set -x
  echo "  IDP_ENTRY_POINT: '${IDP_ENTRY_POINT}'" >> ${appFile}
  echo "  IDP_LOGOUT: '${IDP_LOGOUT}'" >> ${appFile}
  echo "  SP_CALLBACK_URL: '${spProtocol}://${SP_DOMAIN_NAME}/sso/callback'" >> ${appFile}
  echo "  SP_ENTITY_ID: '${spProtocol}://${SP_DOMAIN_NAME}/saml/metadata'" >> ${appFile}
  echo "  SP_PROTECTED: ${SP_PROTECTED}" >> ${appFile}
else
  echo "env_variables:" >> ${appFile}
  echo "  SP_PROTECTED: ${SP_PROTECTED}" >> ${appFile}
fi

echo "  CHAT_DOMAIN: ${CHAT_DOMAIN}" >> ${appFile}