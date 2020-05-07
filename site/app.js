require("dotenv").config({ silent: true })

const fetch = require("node-fetch")
const express = require("express")
const onHeaders = require("on-headers")
const app = express()
const csp = require("./app/csp").default
const hstsheader = require("./app/hstsheader").default
const UploadcareSignature = require("./app/UploadcareSignature")

const SP_PROTECTED = (process.env.SP_PROTECTED || "true").toLowerCase()
const FEATURE_UPLOADCARE_IS_ENABLED = process.env.GATSBY_FEATURE_UPLOADCARE_IS_ENABLED || false

const withoutEtag = response => {
  onHeaders(response, function() {
    this.removeHeader("ETag")
  })
  return response
}

const addSecondsToDate = (date, seconds) => {
  const intervalInMs = seconds * 1000
  const newDate = date
  newDate.setMilliseconds(newDate.getMilliseconds() + intervalInMs)
  return newDate
}

// app.use(
//   csp({
//     chatDomain: process.env.GATSBY_CHAT_DOMAIN,
//     analyticsHost: process.env.MATOMO_IP,
//   })
// )

app.use(hstsheader())

app.get("/api/ping", (request, response) => withoutEtag(response).send("OK"))

if (SP_PROTECTED === "false") {
  // For an unprotected deployment, serve static files from /public

  app.use(express.static("public"))
  app.get("/api/auth", (request, response) =>
    withoutEtag(response).send("NOAUTH")
  )
} else {
  const SamlStrategy = require("passport-saml").Strategy
  const passport = require("passport")
  const fs = require("fs")
  const cookieSession = require("cookie-session")
  const cookieParser = require("cookie-parser")
  const bodyParser = require("body-parser")
  const {
    callback,
    logout,
    mapUser,
    preAuthenticate,
    requireAuthenticated,
    milliseconds,
    requireImageUploadAuthorized
  } = require("./app/handlers")

  const COOKIE_SECRET = process.env.COOKIE_SECRET
  const IDP_ENTRY_POINT = process.env.IDP_ENTRY_POINT
  const IDP_LOGOUT = process.env.IDP_LOGOUT
  const SP_CALLBACK_URL = process.env.SP_CALLBACK_URL
  const SP_ENTITY_ID = process.env.SP_ENTITY_ID
  const COOKIE_TIMEOUT = process.env.COOKIE_TIMEOUT || 5

  // For an protected deployment, protect static file from /public with SAML SSO
  app.use(cookieParser())
  app.use(
    cookieSession({
      name: "token",
      secret: COOKIE_SECRET,
      maxAge: milliseconds(COOKIE_TIMEOUT)
    })
  )
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(passport.initialize())
  app.use(passport.session())

  const spCertificate = fs.readFileSync(".deploy/sp/sp.certificate", "utf-8")
  const spKey = fs.readFileSync(".deploy/sp/sp.key", "utf-8")
  const idpCertificate = fs.readFileSync(".deploy/idp/idp.certificate", "utf-8")
  const samlStrategy = new SamlStrategy(
    {
      callbackUrl: SP_CALLBACK_URL,
      cert: idpCertificate,
      entryPoint: IDP_ENTRY_POINT,
      identifierFormat:
        "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
      issuer: SP_ENTITY_ID,
      privateCert: spKey
    },
    function(profile, done) {
      done(null, {
        nameID: profile.nameID,
        nameIDFormat: profile.nameIDFormat,
        email: profile.email,
        date: Date.now()
      })
    }
  )

  passport.use(samlStrategy)
  passport.serializeUser(mapUser)
  passport.deserializeUser(mapUser)
  app.post(
    "/sso/callback",
    passport.authenticate("saml", { failureRedirect: "/", failureFlash: true }),
    callback
  )

  app.get(
    "/login",
    preAuthenticate,
    passport.authenticate("saml", {
      failureRedirect: "/",
      failureFlash: true
    })
  )

  // logout route is not an end-user flow. It is only added for test and troubleshooting purposes.
  app.get("/logout", logout(IDP_LOGOUT))

  app.get("/api/auth", requireAuthenticated, (request, response) =>
    withoutEtag(response).send("AUTH")
  )

  if(FEATURE_UPLOADCARE_IS_ENABLED) {
    const UPLOADCARE_SECRET_KEY = process.env.UPLOADCARE_SECRET_KEY
    const UPLOADCARE_PUBLIC_KEY = process.env.GATSBY_UPLOADCARE_PUBLIC_KEY
    const UPLOADCARE_STORAGE_ID = process.env.UPLOADCARE_STORAGE_ID
    const UPLOAD_SIGNATURE_EXPIRY_SECONDS = process.env.UPLOAD_EXPIRY || 120
    const UPLOADCARE_API = process.env.UPLOADCARE_API || "https://api.uploadcare.com"
    const ASSET_BUCKET_NAME = process.env.ASSET_BUCKET_NAME
    const ASSET_BUCKET_REGION = process.env.ASSET_BUCKET_REGION || 'eu-west-2'

    app.get(
      "/api/uploadcare/token",
      requireImageUploadAuthorized,
      (request, response) => {
        // AUDIT: log the user id here
        if (!UPLOADCARE_SECRET_KEY) {
          console.error("Missing UPLOADCARE_SECRET_KEY, cannot generate secret")
          response.status(500).send()
        } else {
          const expiryEpoch = Math.floor(
            addSecondsToDate(new Date(), UPLOAD_SIGNATURE_EXPIRY_SECONDS).getTime() /
              1000
          )
          response.send({
            signature: new UploadcareSignature().generate(
              UPLOADCARE_SECRET_KEY,
              expiryEpoch
            ),
            expiry: expiryEpoch
          })
        }
      }
    )

    const convertToBucketUrl = (s3PrefixedUrl, realBucketPrefix) => {
      return s3PrefixedUrl.replace(/^s3:\/\/[^/]+\//, realBucketPrefix)
    }

    const buildS3BucketUrlPrefix = (bucketName, region) => {
      return `https://${bucketName}.s3.${region}.amazonaws.com/`
    }

    app.post("/api/uploadcare/copy", (request, response) => {
      // TODO input validation
      // Modularise
      
      const uuid = request.body.uuid
      const myHeaders = new fetch.Headers()
      myHeaders.append(
        "Authorization",
        `Uploadcare.Simple ${UPLOADCARE_PUBLIC_KEY}:${UPLOADCARE_SECRET_KEY}`
      )
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded")

      const urlencoded = new URLSearchParams()
      urlencoded.append("source", uuid)
      urlencoded.append("target", UPLOADCARE_STORAGE_ID)

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow"
      }
       
      fetch(`${UPLOADCARE_API}/files/`, requestOptions)
        .then(uploadcareResponse => {
          if(!uploadcareResponse.ok) {
            throw new Error("Failed to copy file to storage")
          }
          return uploadcareResponse.json()
        })
        .then(json => {
          // response looks like this
          // { type: "file:, result: "s3Url" }
          const uploadS3Url = json.result
          const realBucketPrefix = buildS3BucketUrlPrefix(ASSET_BUCKET_NAME, ASSET_BUCKET_REGION)
          const absoluteS3url = convertToBucketUrl(uploadS3Url, realBucketPrefix)

          response.json({
            s3Url: absoluteS3url
          })
        })
        .catch(error =>{
          console.error("Problem sending request to uploadcare", error)
          response.status(500).send()
        })
      }
    )}
  
  app.get("/saml/metadata", function(req, res) {
    res.type("application/xml")
    res.send(samlStrategy.generateServiceProviderMetadata(null, spCertificate))
  })

  app.use(requireAuthenticated, express.static("public"))
}

// Start the server
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

module.exports = { addSecondsToDate }
