
# Deploy report

    cd ../site
    npm install
    npm run coverage
    rm -Rf mochawesome-report
    npm run cy:run

    cd ../report        
        
    mkdir -p public    
    cp -R static/* public/    
    cp -R ../site/coverage public/
    cp -R ../site/mochawesome-report public/
    

    gcloud auth login
    gcloud app deploy