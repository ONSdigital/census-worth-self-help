import React from "react"
import { css } from "@emotion/core"
import DirectoryTab from "./directorytab"
import ArticleTab from "./articletab"
import { spacing, colors } from "../utils/styles"
import { Link } from "gatsby"

export default ({ elements, title = false, link = false }) => {
  let elementTabs = elements.map(({ node }) => (
    <div
      key={node.frontmatter.title}
      css={css`
        ${spacing.minimum_gap};
      `}
    >
      {node.fields.collection === "directories" && (
        <DirectoryTab
          title={node.frontmatter.title}
          link={node.fields.pagename}
        />
      )}
      {node.fields.collection === "articles" && <ArticleTab node={node} />}
    </div>
  ))

  let titlebar = null
  if (title || link) {
    titlebar = (
      <div
        css={css`
          ${spacing.standard_vertical};
          ${spacing.in_page_element}
          display: flex;
        `}
      >
        {title && <div className="Section-heading-Style">{title}</div>}
        {link && (
          <Link
            to={link}
            className="Button-subhead-Style"
            css={css`
              margin-left: auto;
              text-decoration: none;
              color: ${colors.navy_normal};
            `}
          >
            View all >
          </Link>
        )}
      </div>
    )
  }

  return (
    <div
      css={css`
        ${spacing.standard_vertical};
      `}
    >
      {titlebar}
      {elementTabs}
    </div>
  )
}
