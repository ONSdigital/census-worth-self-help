class CustomStorage {
    // S3 custom storage URLs are defined in Uploadcare as
    // s3://<bucket-name>/<file-path>
     STORAGE_ALIAS_PREFIX = /^s3:\/\/[^/]+\//

    constructor(storageId, awsBucketId, awsBucketRegion) {
        this.storageId = storageId
        this.awsBucketId = awsBucketId
        this.awsBucketRegion = awsBucketRegion

        // TODO all params are mandatory
    }

    urlPrefix = () => {
        return `https://${this.awsBucketId}.s3.${this.awsBucketRegion}.amazonaws.com/`
    }

    getTarget = () => {
        return this.storageId
    }

    stripStorageAliasPrefix = (aliasUrl) => {
        return aliasUrl.replace(this.STORAGE_ALIAS_PREFIX, '')
    }

    stripLeadingSlashes = (path) => {
        return path.replace(/^[/]+/, '')
    }

    getUrl = (aliasUrl) => {
        const path = this.stripStorageAliasPrefix(aliasUrl)
        return this.urlPrefix() + this.stripLeadingSlashes(path)
    }
}

module.exports = CustomStorage