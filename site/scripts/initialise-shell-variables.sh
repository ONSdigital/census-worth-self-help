#@IgnoreInspection BashAddShebang
# Prepare environment variables in same way they are set in CI to allow production like local development

# First check we've not got variables set in shell already since we want to rely on the .env file
if [[ ! -z "${GATSBY_ASSETS_PATH}" ]] ; then
  echo "Warning GATSBY_ASSETS_PATH already defined (${GATSBY_ASSETS_PATH}), please clear environment variables in shell otherwise you may have unexpected results"
  exit 1
fi

export $(cat .env | xargs)

if [[ -z "${PROTECTED}" ]] ; then
  export PROTECTED=true
fi

if [[ "true" == "${PROTECTED}" ]] ; then
  export IDP_CERTIFICATE=`base64 .secrets/idp/idp.certificate`
  export SP_CERTIFICATE=`base64 .secrets/sp/sp.certificate`
  export SP_KEY=`base64 .secrets/sp/sp.key`
  export SP_CALLBACK_URL="http://${SP_DOMAIN_NAME}/sso/callback"
fi

echo "GATSBY_ASSETS_PATH = ${GATSBY_ASSETS_PATH}"
echo "PROTECTED          = ${PROTECTED}"
