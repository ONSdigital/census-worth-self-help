#!/bin/bash

set -e

MANDATORY_ENV_VARIABLES="GATSBY_ASSETS_PATH"

if [[ "${SP_PROTECTED}" != "false" ]] ; then
  MANDATORY_ENV_VARIABLES="${MANDATORY_ENV_VARIABLES} COOKIE_SECRET IDP_ENTRY_POINT IDP_CERTIFICATE IDP_LOGOUT SP_CERTIFICATE SP_DOMAIN_NAME SP_KEY SP_PROTECTED"
fi

# Pre-requisites to fail task early
for MANDATORY in ${MANDATORY_ENV_VARIABLES} ; do
  if [[ -z "${!MANDATORY}" ]] ; then
    echo "ERROR : Task parameter ${MANDATORY} MUST be set"
    TASK_ERROR=y
  fi
done

if [[ ! -z "${TASK_ERROR}" ]] ; then
  echo "ERROR : Pre-requisites above not met"
  exit 1
fi

if [[ "${SP_PROTECTED}" != "false" ]] ; then
  echo "SSO Protected"
  echo "SP_DOMAIN_NAME     = ${SP_DOMAIN_NAME}"
  echo "IDP_ENTRY_POINT    = ${IDP_ENTRY_POINT}"
else
  echo "*** NOT SSO Protected ***"
fi
echo "GATSBY_ASSETS_PATH = ${GATSBY_ASSETS_PATH}"
echo "GATSBY_CHAT_DOMAIN = ${GATSBY_CHAT_DOMAIN}"

echo "env variables OK"