#!/bin/bash

set -e

BUILD="_build/content/"
mkdir -p "$BUILD" && cp -R ../../content-repository/content/* "$BUILD"
ASSET_DIR="static/assets/"
mkdir $ASSET_DIR
#cp -R ../../content-repository/static/assets/ "$ASSET_DIR"
find ../../content-repository/static/assets \
  -type f \( -name "*.jpg" -or -name "*.jpeg" -or -name "*.png" -or -name "*.gif" \) -print0  \
| xargs -0 -I filepath cp -prv filepath "$ASSET_DIR"