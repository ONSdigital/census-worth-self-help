#!/bin/bash

set -e

case `uname -a` in
  Darwin*) sed_inline () { sed -i '' "$@"; };;
  *)       sed_inline () { sed -i "$@"; };;
esac

DEPLOYMENT_INFORMATION="${SERVICE} `date` - `git rev-parse --short HEAD` - `git branch | grep \* | cut -d ' ' -f2 | cut -d '/' -f2`"

sed_inline "s/\(alert_title:[^|]*\).*/\1| $DEPLOYMENT_INFORMATION/" _build/content/constants/alert.md