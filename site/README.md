# tl;dr

    npm install
    npm run local
        
# Deploy GCP app engine service

    npm install
    npm run build
    
    gcloud auth login
    gcloud app deploy
    
## Run through Docker

    npm install
    npm run build
    docker build -t ons-site .
    docker run -d -p 3000:80 --name ons-dev-site ons-site