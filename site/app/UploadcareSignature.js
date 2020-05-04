import CryptoJS from 'crypto-js';

export default class UploadcareSignature {

generate(secret, expire) {
  let key = secret
  let message = expire.toString()

  const hash = CryptoJS.HmacSHA256(message, key);
  return CryptoJS.enc.Hex.stringify(hash);
}
}