import React from "react"
import { css } from "@emotion/core"
import { Link } from "gatsby"
import { fonts, colors, spacing } from "../utils/styles"

export default ({ title, link }) => {
  return (
    <div
      css={css`
          ${spacing.tab}
          background: ${colors.purple};
          border-left: 6px solid ${colors.purple};
      `}
    >
      <div
        css={css`
          ${spacing.text_clearance}
        `}
      >
        <Link
          to={link}
          css={css`
            ${fonts.directory_link}
          `}
        >
          {title}
        </Link>
      </div>
    </div>
  )
}
