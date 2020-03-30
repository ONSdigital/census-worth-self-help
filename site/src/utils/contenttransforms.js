import { colors } from './styles'
var sanitizeHtml = require("sanitize-html")

export const getSiteSpecificBannerColour = () => {
  //const defaultPurple = "rgb(144, 32, 130)";
  let colour = process.env.GATSBY_SITE_BANNER_COLOUR
    ? process.env.GATSBY_SITE_BANNER_COLOUR
    : colors.primary_purple
  return colour
}

export const transformSources = htmlString => {
  let videoPath = process.env.GATSBY_ASSETS_PATH
    ? process.env.GATSBY_ASSETS_PATH
    : ""
  if (!htmlString) {
    return ""
  }
  return htmlString.replace(/{{TARGET_ASSETS_SRC}}/g, videoPath)
}

export const htmlSanitize = htmlString => {
  return sanitizeHtml(htmlString, {
    allowedTags: sanitizeHtml.defaults.allowedTags
      .filter(function(tag) {
        return tag !== "iframe"
      })
      .concat(["video", "audio", "img", "source", "h1", "h2"]),
    allowedAttributes: {
      a: ["href", "name", "target"],
      img: ["src", "title"],
      source: ["src", "type"],
      video: ["controls"],
      audio: ["controls"]
    }
  })
}
