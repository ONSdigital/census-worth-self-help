
# Deploy report

    cd ../site
    npm install
    npm run coverage
    npm run cy:run

    cd ../report        
        
    mkdir -p public    
    cp -R static/* public/    
    cp -R ../site/coverage public/
    cp -R ../site/mochawesome-report public/
    

    gcloud auth login
    gcloud app deploy