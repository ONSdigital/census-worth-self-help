import UploadcareSignature from './signature'

const DEFAULT_UPLOADCARE_API = "https://api.uploadcare.com"
 
class UploadcareApi {
    constructor(publicKey, privateKey, customStorage, uploadcareApi) {
        this.customStorage = customStorage
        this.publicKey = publicKey
        this.uploadcareApi = uploadcareApi || DEFAULT_UPLOADCARE_API
        
        if (!publicKey) {
            throw new Error("publicKey is mandatory")
        }

        this.privateKey = privateKey

        if (!privateKey) {
            throw new Error("privateKey is mandatory")
        }
    }

    getExpiryEpochInSeconds(tokenDurationInSeconds, fromDate) {
        const date = fromDate || new Date()

        return Math.floor(
            addSecondsToDate(date, tokenDurationInSeconds).getTime() / 1000
        )
    }

    createSignature(tokenDurationInSeconds) {
        const signature = new UploadcareSignature(this.privateKey)
        const expiryEpoch = this.getExpiryEpochInSeconds(tokenDurationInSeconds)

        return {
            signature: signature.generate(expiryEpoch),
            expiry: expiryEpoch
        }
    }

    createSimpleAuthorization() {
        return `Uploadcare.Simple ${this.publicKey}:${this.privateKey}`
    }

    fetchEndpoint() {
        return this.uploadcareApi + "/files/"
    }
  
    // Returns a promise that will resolve to a url as follows:
    // "https://<bucket>.s3.<region>.amazonaws.com/<filepath>"
    copyToCustomStorage(uuid) {
      
        if(!this.customStorage) {
            throw new Error("Cannot copy to custom storage: no storage definition")
        }

        const myHeaders = new Headers()
        myHeaders.append("Authorization", this.createSimpleAuthorization())
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded")
    
        const urlencoded = new URLSearchParams()
        urlencoded.append("source", uuid)
        urlencoded.append("target", this.customStorage.getTarget())
    
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: urlencoded,
            redirect: "follow"
        }
            
        return fetch(this.fetchEndpoint(), requestOptions)
            .then(uploadcareResponse => {
                if(!uploadcareResponse.ok) {
                    throw new Error("Failed to copy file to storage")
                }
                return uploadcareResponse.json()
            })
            .then(json => {
                // response looks like this
                // { type: "file:, result: "s3Url" }
                const uloadS3Url = json.result
        
                // TODO response validation

                return(this.customStorage.getUrl(uloadS3Url))
            })
            .catch(error =>{
                throw new Error("Problem sending request to uploadcare", error)
            })
    }
}

module.exports = UploadcareApi