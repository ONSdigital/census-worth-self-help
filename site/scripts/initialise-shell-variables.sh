#@IgnoreInspection BashAddShebang
# Prepare environment variables in same way they are set in CI to allow production like local development

export $(cat .env | xargs)

if [[ -z "${PROTECTED}" ]] ; then
  export PROTECTED=true
fi

if [[ "true" == "${PROTECTED}" ]] ; then
  export IDP_CERTIFICATE=`base64 .secrets/idp/idp.certificate`
  export SP_CERTIFICATE=`base64 .secrets/sp/sp.certificate`
  export SP_KEY=`base64 .secrets/sp/sp.key`
  export SP_CALLBACK_URL="http://${SP_DOMAIN_NAME}/sso/callback"
  export UPLOADCARE_SECRET_KEY="${UPLOADCARE_SECRET_KEY}"
  export GATSBY_FEATURE_UPLOADCARE_IS_ENABLED="${GATSBY_FEATURE_UPLOADCARE_IS_ENABLED}"
  export UPLOADCARE_STORAGE_ID="${UPLOADCARE_STORAGE_ID}"
  export GATSBY_UPLOADCARE_PUBLIC_KEY="${GATSBY_UPLOADCARE_PUBLIC_KEY}"
  export UPLOADCARE_SIGNATURE_EXPIRY_SECONDS="${UPLOADCARE_SIGNATURE_EXPIRY_SECONDS}"
fi

echo "GATSBY_ASSETS_PATH = ${GATSBY_ASSETS_PATH}"
echo "PROTECTED          = ${PROTECTED}"
