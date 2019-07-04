# Start up local IDP

In one shell

    npm install --global saml-idp
    scripts/generate-local-idp-certificates.sh   
    saml-idp --acs http://localhost:8080/sso/callback --aud http://localhost:8080 \
      --serviceProviderId http://localhost:8080/saml/metadata \
      --cert .secrets/idp/idp.certificate \
      --key .secrets/idp/idp.key

# Run SAML SSO locally with express

Add .env file to this directory, e.g

    cp .env.template .env

Then

    scripts/generate-local-certificates.sh
    . scripts/initialise-shell-variables.fish    
    ../pipeline/tasks/task-scripts/validate-deploy-site-env.sh
    ../pipeline/tasks/task-scripts/prepare-protected-site.sh
    npm run build
    npm run app
    
Then access http://localhost:8080/

To logout visit http://localhost:8080/logout

# Deploy secured app

Deploy app with configuration enhanced with env variables

    gcloud app deploy ci-app.yaml