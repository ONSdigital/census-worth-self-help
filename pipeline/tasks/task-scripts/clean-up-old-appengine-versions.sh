#!/bin/bash

keepCount=${2:-"5"}

function deleteOldVersions() {
  _service=${1}
  _keepCount=${2}

  echo "Keeping last ${_keepCount} or app engine service ${_service}"
  count=0
  deletedCount=0
  for version in `gcloud app versions list --service ${_service} --sort-by '~version' --format 'value(version.id)'`
  do
    ((count++))
    if [[ ${count} -gt ${_keepCount} ]] ; then
      echo "Service ${_service} - deleting version ${version}"
      gcloud app versions delete ${version} --service ${_service} -q
      ((deletedCount++))
    else
      echo "Service ${_service} - keeping  version ${version}"
    fi
  done
  echo "Deleted ${deletedCount} of ${count} versions of service ${_service}"
}

if [[ -z ${1} ]] ; then
  totalVersionCount=`gcloud app versions list | wc -l`
  echo "Pruning old versions from all app engine services"
  echo "Total version count across all services : ${totalVersionCount}"

  for service in `gcloud app versions list --hide-no-traffic --format 'value(service)'`
  do
    deleteOldVersions ${service} ${keepCount}
  done
else
  service=${1:-"default"}
  deleteOldVersions ${service} ${keepCount}
fi


