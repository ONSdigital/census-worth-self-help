import React from "react"
import { css } from "@emotion/core"
import { Link } from "gatsby"
import { colors, spacing } from "../utils/styles"
const moment = require("moment")

export default ({ node }) => {
  let title = node.frontmatter.title
  let link = node.fields.pagename
  let description = node.frontmatter.description
  let time_ago = moment(node.frontmatter.date).fromNow()
  return (
    <div
      css={css`
        ${spacing.tab};
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
        border-left: 6px solid ${colors.navy_normal};
        background-color: ${colors.white};
      `}
    >
      <Link
        data-testid="article-card-title"
        className="Card-heading-Style"
        to={link}
        css={css`
          text-decoration: none;
          color: inherit;
          flex-grow: 1;
          font-weight: semi-bold;
        `}
        data-test="articletab__article-card"
      >
        {title}
      </Link>
      <div
        className="Card-sub-head-Style-gray"
        css={css`
          padding-top: 6px;
          display: flex;
          flex-direction: vertical;
        `}
      >
        <div
          css={css`
            width: 70%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            flex-grow: 1;
          `}
        >
          {description}
        </div>
        <div className="Card-meta-Style">{time_ago}</div>
      </div>
    </div>
  )
}
