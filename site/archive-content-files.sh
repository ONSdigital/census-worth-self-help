#!/usr/bin/env bash
PUBLIC_FILES_EXCLUDED="public-no-content/"
mkdir -p "$PUBLIC_FILES_EXCLUDED"

find public \( -name "static" -or -name "icons" -or -name "assets" -or -name "admin" -or -name "404" -or -type f \) -print0 | xargs -0 -I filepath cp -pr filepath "$PUBLIC_FILES_EXCLUDED"
find public \( -name "static" -or -name "icons" -or -name "assets" -or -name "admin" -or -name "404" -or -type f \) -print0 | xargs -0 -I filepath rm -rf filepath

cd public
zip -r ../public.zip ./
cd ..
rm -rf public
mv "$PUBLIC_FILES_EXCLUDED" public
