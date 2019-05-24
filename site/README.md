# tl;dr

    npm install
    gatsby develop

## Run through Docker

    npm install
    npm run build
    docker build -t ons-site .
    docker run -d -p 3000:80 --name ons-dev-site ons-site