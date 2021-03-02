#!/bin/bash
sourcedir=${CONTENT_SOURCE:-../content/}
builddir="_build/content/"

echo "Publishing ${sourcedir} to ${builddir}"
rm -rf "$builddir"
mkdir -p "$builddir" && cp -R "${sourcedir}" "$builddir";

assetdir="static/assets/"
rm -rf "$assetdir"
mkdir "$assetdir"

find ../static/assets -type f \( -name "*.jpg" -or -name "*.jpeg" -or -name "*.png" -or -name "*.gif" \) -print0  \
| xargs -0 -I filepath cp -prv filepath "$assetdir"

export GATSBY_FEATURE_UPLOADCARE_IS_ENABLED=false
