import uploadcare from "uploadcare-widget"
import uploadcareTabEffects from "uploadcare-widget-tab-effects"
import { Iterable } from "immutable"
import fetch from "node-fetch"

window.UPLOADCARE_LIVE = false
window.UPLOADCARE_MANUAL_START = true

const USER_AGENT = "NetlifyCMS-Uploadcare-MediaLibrary"
const CDN_BASE_URL = "https://ucarecdn.com"

/**
 * Default Uploadcare widget configuration, can be overridden via config.yml.
 */
const defaultConfig = {
  previewStep: true,
  integration: USER_AGENT,
  useSecureUpload: false
}

/**
 * Determine whether an array of urls represents an unaltered set of Uploadcare
 * group urls. If they've been changed or any are missing, a new group will need
 * to be created to represent the current values.
 */
function isFileGroup(files) {
  const basePatternString = `~${files.length}/nth/`
  const mapExpression = (val, idx) => new RegExp(`${basePatternString}${idx}/$`)
  const expressions = Array.from({ length: files.length }, mapExpression)
  return expressions.every(exp => files.some(url => exp.test(url)))
}

/**
 * Returns a fileGroupInfo object wrapped in a promise-like object.
 */
function getFileGroup(files) {
  /**
   * Capture the group id from the first file in the files array.
   */
  const groupId = new RegExp(`^.+/([^/]+~${files.length})/nth/`).exec(
    files[0]
  )[1]

  /**
   * The `openDialog` method handles the jQuery promise object returned by
   * `fileFrom`, but requires the promise returned by `loadFileGroup` to provide
   * the result of it's `done` method.
   */
  return new Promise(resolve =>
    uploadcare.loadFileGroup(groupId).done(group => resolve(group))
  )
}

/**
 * Convert a url or array/List of urls to Uploadcare file objects wrapped in
 * promises, or Uploadcare groups when possible. Output is wrapped in a promise
 * because the value we're returning may be a promise that we created.
 */
function getFiles(value) {
  if (Array.isArray(value) || Iterable.isIterable(value)) {
    const arr = Array.isArray(value) ? value : value.toJS()
    return isFileGroup(arr)
      ? getFileGroup(arr)
      : Promise.all(arr.map(val => getFile(val)))
  }
  return value && typeof value === "string" ? getFile(value) : null
}

/**
 * Convert a single url to an Uploadcare file object wrapped in a promise-like
 * object. Group urls that get passed here were not a part of a complete and
 * untouched group, so they'll be uploaded as new images (only way to do it).
 */
function getFile(url) {
  const groupPattern = /~\d+\/nth\/\d+\//
  const uploaded = url.startsWith(CDN_BASE_URL) && !groupPattern.test(url)
  return uploadcare.fileFrom(uploaded ? "uploaded" : "url", url)
}

/**
 * Open the standalone dialog. A single instance is created and destroyed for
 * each use.
 */
async function openDialog({ files, config, handleInsert, settings = {} }) {
  if (
    settings.defaultOperations &&
    !settings.defaultOperations.startsWith("/")
  ) {
    console.warn(
      "Uploadcare default operations should start with `/`. Example: `/preview/-/resize/100x100/image.png`"
    )
  }

  const buildUrl = fileInfo => {
    const { cdnUrl, name, isImage } = fileInfo

    let url =
      isImage && settings.defaultOperations
        ? `${cdnUrl}-${settings.defaultOperations}`
        : cdnUrl
    const filenameDefined = !url.endsWith("/")

    if (!filenameDefined && settings.autoFilename) {
      url = url + name
    }

    return url
  }

  if (config["useSecureUpload"]) {
    const { signature, expiry } = await getSignature()

    config["secureSignature"] = signature
    config["secureExpire"] = expiry
  }

  const sendToSThree = (fileId) => {
    // TODO : move all this code into an API to protect the private key

    // FIXME
    const publicKey = "FIXME"
    const privateKey = "FIXME"

    var myHeaders = new Headers()
    myHeaders.append(
      "Authorization",
      `Uploadcare.Simple ${publicKey}:${privateKey}`
    )
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded")

    // TODO sort this out witb env vars
    const customStorageId = "FIXME"

    var urlencoded = new URLSearchParams()
    urlencoded.append("source", fileId)
    urlencoded.append("target", customStorageId)

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow"
    }

    // TODO this should be a const
    return fetch("https://api.uploadcare.com/files/", requestOptions)
      .then(response => {
        if(!response.ok) {
          throw new Error("Failed to copy file to storage")
        }
        return response.json()
      })
      .catch(error =>{
        console.error("Problem sending request to uploadcare", error)
      })
  }

  const convertToBucketUrl = (s3PrefixedUrl, realBucketPrefix) => {
    return s3PrefixedUrl.replace(/^s3:\/\/[^/]+\//, realBucketPrefix)
  }

  const buildS3BucketUrlPrefix = (bucketName, region) => {
    return `https://${bucketName}.s3.${region}.amazonaws.com/`
  }

  const removeUploadcareUrlPrefix = (prefixedUrl) => {
    return prefixedUrl.replace(/^(http|https):\/\/[^/]*\/(.*)\/$/, "$2")
  }

  uploadcare.openDialog(files, config).done(({ promise, files }) => {
    const isGroup = Boolean(files)

    // TODO Sort this out using env vars
    const bucketName = "FIXME"
    const regionName = "FIXME"

    const bucketUrlPrefix = buildS3BucketUrlPrefix(bucketName, regionName)

    return promise().then(info => {
      if (isGroup) {
        return Promise.all(
          files().map(promise => promise.then(fileInfo => buildUrl(fileInfo)))
        ).then(urls => {
          // handleInsert(urls)
        })
      } else {
        const fileId = removeUploadcareUrlPrefix(info.cdnUrl)

        sendToSThree(fileId).then(response => {
          handleInsert(convertToBucketUrl(response.result, bucketUrlPrefix))
        })
      }
    })
  })
}

async function getSignature() {
  const responseObject = fetch("/api/uploadtoken")
    .then(res => res.json())
    .catch(err => console.error(err))

  return responseObject
}

/**
 * Initialization function will only run once, returns an API object for Netlify
 * CMS to call methods on.
 */
async function init({
  options = { config: {}, settings: {} },
  handleInsert
} = {}) {
  const { publicKey, ...globalConfig } = options.config
  const baseConfig = { ...defaultConfig, ...globalConfig }

  window.UPLOADCARE_PUBLIC_KEY = publicKey

  /**
   * Register the effects tab by default because the effects tab is awesome. Can
   * be disabled via config.
   */
  uploadcare.registerTab("preview", uploadcareTabEffects)

  return {
    /**
     * On show, create a new widget, cache it in the widgets object, and open.
     * No hide method is provided because the widget doesn't provide it.
     */
    show: ({
      value,
      config: instanceConfig = {},
      allowMultiple,
      imagesOnly = false
    } = {}) => {
      const config = { ...baseConfig, imagesOnly, ...instanceConfig }
      const multiple = allowMultiple === false ? false : !!config.multiple
      const resolvedConfig = { ...config, multiple }
      const files = getFiles(value)

      /**
       * Resolve the promise only if it's ours. Only the jQuery promise objects
       * from the Uploadcare library will have a `state` method.
       */
      if (files && !files.state) {
        return files.then(result =>
          openDialog({
            files: result,
            config: resolvedConfig,
            settings: options.settings,
            handleInsert
          })
        )
      } else {
        return openDialog({
          files,
          config: resolvedConfig,
          settings: options.settings,
          handleInsert
        })
      }
    },

    /**
     * Uploadcare doesn't provide a "media library" widget for viewing and
     * selecting existing files, so we return `false` here so Netlify CMS only
     * opens the Uploadcare widget when called from an editor control. This
     * results in the "Media" button in the global nav being hidden.
     */
    enableStandalone: () => false
  }
}

/**
 * The object that will be registered only needs a (default) name and `init`
 * method. The `init` method returns the API object.
 */
const uploadcareMediaLibrary2 = { name: "uploadcare2", init }

export const NetlifyCmsMediaLibraryUploadcare2 = uploadcareMediaLibrary2
export default uploadcareMediaLibrary2
