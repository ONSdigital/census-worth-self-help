import CMS from "netlify-cms-app"
import React from "react"
import TextBlock from "../components/textblock"
import PageTitle from "../components/pagetitle"
import { transformSources, htmlSanitize } from "../utils/contenttransforms"

import { WidgetPreviewContainer } from "netlify-cms-ui-default"
import NetlifyCmsWidgetMarkdown from "netlify-cms-widget-markdown"
import uploadcare2 from "./widgets/netlify-cms-media-library-uploadcare-custom"

const config = {
  config: {
    media_library: {
      config: {
        publicKey: process.env.GATSBY_UPLOADCARE_PUBLIC_KEY
      }
    }
  }
}
CMS.init(config)

CMS.registerMediaLibrary(uploadcare2)

const showdown = require("showdown"),
  converter = new showdown.Converter()

const createMarkup = v => {
  return { __html: htmlSanitize(converter.makeHtml(v)) }
}
const SanitiziedMarkdownPreview = opts => {
  const markup = createMarkup(opts.value)
  return <WidgetPreviewContainer dangerouslySetInnerHTML={markup} />
}

CMS.registerWidget(
  "sanitiziedMarkdown",
  NetlifyCmsWidgetMarkdown.controlComponent,
  SanitiziedMarkdownPreview
)

const ArticlePreview = ({ entry, widgetFor }) => {
  let linkDiv = ""
  if (typeof window !== "undefined") {
    let url = window.location.href
    let filename = url.substring(url.lastIndexOf("/"))
    if (filename !== "/new") {
      linkDiv = (
        <div className="Link-Div">{"To link to this page use " + filename}</div>
      )
    }
  }

  return (
    <div>
      {linkDiv}
      <div className="Preview-Layout">
        <PageTitle
          subtitle={
            entry.getIn(["data", "title"]) && (
              <span>
                Last updated: <i>Just published</i>
              </span>
            )
          }
        >
          {entry.getIn(["data", "title"])}
        </PageTitle>

        <div className="Preview-Article">
          <TextBlock articleContent={true}>
            <div className="Article-sub-title-Style">
              {entry.getIn(["data", "description"])}
            </div>
            <div className="article-content">{widgetFor("body")}</div>
          </TextBlock>
        </div>
      </div>
    </div>
  )
}

CMS.registerPreviewTemplate("articles", ArticlePreview)

const previewStyles = `

.Link-Div {
  color: white;
  background-color: black;
  padding: 10px 20px;
}

.Preview-Layout {
  background-color: white;
  margin: 0 auto;
  max-width: 350px;
  margin-top : 20px;
  padding: 5px 15px;
}

.Preview-Article {
  margin-top : 50px;
}

.Article-Title-Style {
  font-family: sans-serif;
  font-size: 24px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.5px;
  color: #003d59;
}
.Article-sub-title-Style {
  font-family: sans-serif;
  font-size: 16px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.6;
  letter-spacing: -0.2px;
  color: rgb(0, 0, 0);
}
.Article-body-Style {
  font-family: sans-serif;
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.6;
  letter-spacing: -0.2px;
  color: rgb(0, 0, 0);
}

.Button-subhead-Style {
  font-family: sans-serif;
  font-size: 13px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.08;
  letter-spacing: normal;
  color: #6e6e6e;
}

.article-content img, .article-content video {
  display: block;
  margin-right: auto;
  margin-left: auto;
  max-width: 100%;
  padding: 10px 0px;
}`

CMS.registerPreviewStyle(previewStyles, { raw: true })

CMS.registerEditorComponent({
  id: "video",
  label: "Video",
  fields: [
    {
      name: "video_path",
      label: "video",
      hint: 'Give just the file name of the uploaded file, e.g. "my-video.mp4"'
    }
  ],
  pattern: /^<video controls data-id="([^"]*)">.*<\/video>$/,
  fromBlock: function(match) {
    return {
      video_path: match[1]
    }
  },
  toBlock: function(obj) {
    return (
      `<video controls data-id="` +
      obj.video_path +
      `"><source src="{{TARGET_ASSETS_SRC}}/video/` +
      obj.video_path +
      `" type="video/mp4">Video disabled</video>`
    )
  },
  toPreview: function(obj) {
    return (
      `<video controls data-id="` +
      obj.video_path +
      `"><source src="` +
      transformSources("{{TARGET_ASSETS_SRC}}") +
      `/video/` +
      obj.video_path +
      `" type="video/mp4">Video disabled</video>`
    )
  }
})

CMS.registerEditorComponent({
  id: "audio",
  label: "Audio",
  fields: [
    {
      name: "audio_path",
      label: "audio",
      hint: 'Give just the file name of the uploaded file, e.g. "my-audio.mp3"'
    }
  ],
  pattern: /^<audio controls data-id="([^"]*)">.*<\/audio>$/,
  fromBlock: function(match) {
    return {
      audio_path: match[1]
    }
  },
  toBlock: function(obj) {
    return (
      `<audio controls data-id="` +
      obj.audio_path +
      `"><source src="{{TARGET_ASSETS_SRC}}/audio/` +
      obj.audio_path +
      `">Video disabled</audio>`
    )
  },
  toPreview: function(obj) {
    return (
      `<audio controls data-id="` +
      obj.audio_path +
      `"><source src="` +
      transformSources("{{TARGET_ASSETS_SRC}}") +
      `/audio/` +
      obj.audio_path +
      `">Audio disabled</audio>`
    )
  }
})
