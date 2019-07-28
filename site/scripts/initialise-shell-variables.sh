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
fi

echo "GATSBY_ASSETS_PATH = ${GATSBY_ASSETS_PATH}"
echo "PROTECTED          = ${PROTECTED}"
