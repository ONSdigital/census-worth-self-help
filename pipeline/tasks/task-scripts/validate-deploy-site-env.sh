#!/bin/bash

# Pre-requisites to fail task early
if [[ "${PROTECTED}" == "true" ]] ; then
  for MANDATORY in COOKIE_SECRET IDP_ENTRY_POINT IDP_CERTIFICATE SP_CERTIFICATE SP_DOMAIN_NAME SP_KEY; do
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
fi

echo "env variables OK"