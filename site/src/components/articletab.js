import React from "react"
import { css } from "@emotion/core"
import { navigate } from "@reach/router"
import { colors, spacing } from "../utils/styles"
const moment = require("moment")

export default ({ node }) => {
  let title = node.frontmatter.title
  let link = node.fields.pagename
  let description = node.highlightedText
    ? node.highlightedText
    : node.frontmatter.description

  let time_ago = moment(node.frontmatter.date).fromNow()
  return (
    <div
      onClick={() => navigate("/" + link)}
      css={css`
        ${spacing.tab};
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
        border-left: 6px solid ${colors.navy_normal};
        background-color: ${colors.white};
      `}
    >
      <div
        className="Card-heading-Style"
        data-testid="articletab-article-card"
        css={css`
          color: inherit;
          flex-grow: 1;
          font-weight: semi-bold;
        `}
      >
        {title}
      </div>
      <div
        className="Card-sub-head-Style-gray"
        css={css`
          padding-top: 6px;
          display: flex;
          flex-direction: vertical;
          line-height: 1.08;
          max-height: 42.12px; // line-height * font-size * 3
        `}
      >
        <div
          css={css`
            width: 70%;
            overflow: hidden;
            text-overflow: ellipsis;
            flex-grow: 1;
          `}
        >
          {description}
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
          `}
          className="Card-meta-Style"
        >
          {time_ago}
        </div>
      </div>
    </div>
  )
}
