import { colors, gradients } from "./styles"
var sanitizeHtml = require("sanitize-html")

export const getSiteSpecificStyle = () => {
  const siteType = process.env.GATSBY_SITE_COLOUR || "main_site_colour"
  let style = {}

  switch (siteType) {
    case "secondary":
      style.colour = colors.primary_blue
      style.gradient = gradients.blue_shine
      style.className = "blue-text-colour"
      break
    case "tertiary":
      style.colour = colors.secondary_teal
      style.gradient = gradients.teal_shine
      style.className = "teal-text-colour"
      break
    default:
      style.colour = colors.primary_purple
      style.gradient = gradients.purple_shine
      style.className = "purple-text-colour"
  }

  return style
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
