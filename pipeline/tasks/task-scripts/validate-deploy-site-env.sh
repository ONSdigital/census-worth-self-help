#!/bin/bash

# Pre-requisites to fail task early
if [[ "${SP_PROTECTED}" != "false" ]] ; then
  for MANDATORY in COOKIE_SECRET IDP_ENTRY_POINT IDP_CERTIFICATE IDP_LOGOUT SP_CERTIFICATE SP_DOMAIN_NAME SP_KEY SP_PROTECTED; do
    if [[ -z "${!MANDATORY}" ]] ; then
      echo "ERROR : Task parameter ${MANDATORY} MUST be set"
      TASK_ERROR=y
    fi
  done

  if [[ ! -z "${TASK_ERROR}" ]] ; then
    echo "ERROR : Pre-requisites above not met"
    exit 1
  fi
  echo "SSO Protected"
  echo "SP_DOMAIN_NAME   = ${SP_DOMAIN_NAME}"
  echo "IDP_ENTRY_POINT  = ${IDP_ENTRY_POINT}"
else
  echo "*** NOT SSO Protected ***"
fi

echo "env variables OK"