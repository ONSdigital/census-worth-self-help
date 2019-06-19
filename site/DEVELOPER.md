# Start up local IDP

In one shell

    npm install --global saml-idp
    mkdir -p .deploy/idp
    cd .deploy/idp
    openssl req -x509 -new -newkey rsa:2048 -nodes -subj \
      "/C=EN/CN=localhost" -keyout idp-private-key.pem -out idp-public-cert.pem -days 7300
    saml-idp --acs http://localhost:8080/sso/callback --aud http://localhost:8080 \
      --serviceProviderId http://localhost:8080/saml/metadata

# Run SAML SSO locally with express

Add .env file to this directory (see .env.template for an example)

Then

    ./generate-certificates.sh
    npm run app
    
Then access http://localhost:8080/protected