import CMS from "netlify-cms-app"
import React from "react"
import TextBlock from "../components/textblock"
import PageTitle from "../components/pagetitle"

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

.article-content img {
  display: block;
  margin-right: auto;
  margin-left: auto;
}`

CMS.registerPreviewStyle(previewStyles, { raw: true })
