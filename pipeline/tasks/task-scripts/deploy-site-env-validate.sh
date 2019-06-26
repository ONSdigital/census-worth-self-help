#!/bin/bash

# Pre-requisites to fail task early
if [[ "${PROTECTED}" == "true" ]] ; then
  for MANDATORY in COOKIE_SECRET DOMAIN_NAME IDP_ENTRY_POINT ; do
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
  echo "DOMAIN_NAME      = ${DOMAIN_NAME}"
  echo "IDP_ENTRY_POINT  = ${IDP_ENTRY_POINT}"
fi

echo "env variables OK"