export const transformSources = htmlString => {
  let videoPath = process.env.GATSBY_ASSETS_PATH
    ? process.env.GATSBY_ASSETS_PATH
    : ""
  if (!htmlString) {
    return ""
  }
  return htmlString.replace(/{{TARGET_ASSETS_SRC}}/g, videoPath)
}
