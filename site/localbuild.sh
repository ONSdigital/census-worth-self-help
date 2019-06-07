#!/bin/bash
builddir="_build/content/"
mkdir -p "$builddir" && cp -R ../content/ "$builddir";

assetdir="static/assets/"
rm -rf "$assetdir"
cp -R ../static/assets "$assetdir";