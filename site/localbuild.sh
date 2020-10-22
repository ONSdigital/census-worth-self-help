#!/bin/bash
builddir="_build/content/"

rm -rf "$builddir"
mkdir -p "$builddir" && cp -R ../content/ "$builddir";

assetdir="static/assets/"
rm -rf "$assetdir"
mkdir "$assetdir"

find ../static/assets -type f \( -name "*.jpg" -or -name "*.jpeg" -or -name "*.png" -or -name "*.gif" \) -print0  \
| xargs -0 -I filepath cp -prv filepath "$assetdir"

export GATSBY_FEATURE_UPLOADCARE_IS_ENABLED=true
