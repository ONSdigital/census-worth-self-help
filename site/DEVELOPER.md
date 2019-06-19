# Run SAML SSO locally with express

Add .env file to this directory (see .env.template for an example)

Add local entry for SP domain

``` 
127.0.0.1 try.sp.local
```

Then

    ./generate-certificates.sh
    npm run app
    
Then access http://try.sp.local:8080/protected