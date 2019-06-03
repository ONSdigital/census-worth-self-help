import React from "react"
import { css } from "@emotion/core"
import { Link } from "gatsby"
import { fonts, colors, spacing } from "../utils/styles"

export default ({ title, link }) => {
  return (
    <div
      css={css`
        ${fonts.small};
        ${spacing.tab};
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
        border-left: 6px solid ${colors.purple};
      `}
    >
      <div
        css={css`
          ${spacing.text_clearance};
          display: flex;
        `}
      >
        <Link
          to={link}
          css={css`
            text-decoration: none;
            color: inherit;
            flex-grow: 1;
          `}
        >
          {title}
        </Link>
      </div>
    </div>
  )
}
