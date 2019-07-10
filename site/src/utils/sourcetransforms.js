export const transformSources = htmlString => {
  let videoPath = process.env.GATSBY_VIDEO_PATH
    ? process.env.GATSBY_VIDEO_PATH
    : ""
  if (!htmlString) {
    return ""
  }
  return htmlString.replace(/{{TARGET_VIDEO_SRC}}/g, videoPath)
}
