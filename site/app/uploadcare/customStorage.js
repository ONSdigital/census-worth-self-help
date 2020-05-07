class CustomStorage {
  // S3 custom storage URLs are defined in Uploadcare as
  // s3://<bucket-name>/<file-path>
  
  constructor(storageId, awsBucketId, awsBucketRegion) {
    this.STORAGE_ALIAS_PREFIX = /^s3:\/\/[^/]+\//
    this.storageId = storageId
    this.awsBucketId = awsBucketId
    this.awsBucketRegion = awsBucketRegion

    if (!storageId) {
      throw new Error("storageId is mandatory")
    }
    if (!awsBucketId) {
      throw new Error("awsBucketId is mandatory")
    }
    if (!awsBucketRegion) {
      throw new Error("awsBucketRegion is mandatory")
    }
  }

  urlPrefix() {
    return `https://${this.awsBucketId}.s3.${this.awsBucketRegion}.amazonaws.com/`
  }

  getTarget() {
    return this.storageId
  }

  stripStorageAliasPrefix(aliasUrl) {
    return aliasUrl.replace(this.STORAGE_ALIAS_PREFIX, "")
  }

  stripLeadingSlashes(path) {
    return path.replace(/^[/]+/, "")
  }

  getUrl(aliasUrl) {
    const path = this.stripStorageAliasPrefix(aliasUrl)
    return this.urlPrefix() + this.stripLeadingSlashes(path)
  }
}

module.exports = CustomStorage
