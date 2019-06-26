for line in (cat .env)
  set -x (echo $line | cut -d = -f 1) (echo $line | cut -d = -f 2-)
end

set -x IDP_CERTIFICATE (base64 .secrets/idp/idp.certificate)
set -x SP_CERTIFICATE (base64 .secrets/sp/sp.certificate)
set -x SP_KEY (base64 .secrets/sp/sp.key)