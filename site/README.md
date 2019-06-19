# tl;dr

    npm install
    npm run local
        
# Deploy GCP app engine service

    npm install
    npm run build
    
    gcloud auth login
    gcloud app deploy
    
# Run with express

Add .env file to this directory (see .env.template for an example)

    ./generate-certificates.sh
    npm run app