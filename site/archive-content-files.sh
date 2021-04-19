#!/usr/bin/env bash
PUBLIC_FILES_EXCLUDED="public-no-content/"
mkdir -p "$PUBLIC_FILES_EXCLUDED"

cp -pr public/admin "$PUBLIC_FILES_EXCLUDED"
rm -rf public/admin

rm -rf public.zip
cd public
zip -r ../public.zip ./
cd ..
rm -rf public
mv "$PUBLIC_FILES_EXCLUDED" public
