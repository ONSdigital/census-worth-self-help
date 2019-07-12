import React from "react"
import { css } from "@emotion/core"
import { navigate } from "@reach/router"
import { gradients, colors, spacing } from "../utils/styles"

export default ({ node }) => {
  let title = node.frontmatter.title
  let link = node.fields.pagename + "/"
  let description = node.frontmatter.description

  return (
    <div
      onClick={() => navigate("/" + link)}
      css={css`
        ${spacing.tab};
        box-shadow: 0 2px 4px 0 rgba(212, 212, 212, 0.5);
        border: solid 1px #ececed;
        ${gradients.navy_shine_lighter};
        border-left: 6px solid ${colors.navy_normal};
      `}
    >
      <div
        className="Card-heading-Style"
        data-testid="articletab-article-card"
        css={css`
          color: white;
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
            color: white;
            width: 70%;
            overflow: hidden;
            text-overflow: ellipsis;
            flex-grow: 1;
          `}
        >
          {description}
        </div>
      </div>
    </div>
  )
}
