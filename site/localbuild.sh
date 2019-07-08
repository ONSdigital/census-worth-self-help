#!/bin/bash
builddir="_build/content/"

rm -rf "$builddir"
mkdir -p "$builddir" && cp -R ../content/ "$builddir";

assetdir="static/assets/"
rm -rf "$assetdir"
cp -R ../static/assets "$assetdir";