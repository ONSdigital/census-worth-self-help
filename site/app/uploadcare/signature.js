const CryptoJS = require("crypto-js")

class UploadcareSignature {

  constructor(secret) {
    this.secret = secret
  }

  generate(expire) {
    let message = expire.toString()

    const hash = CryptoJS.HmacSHA256(message, this.secret);
    return CryptoJS.enc.Hex.stringify(hash);
  }
}

module.exports = UploadcareSignature