import React from "react"
import { css } from "@emotion/core"
import { Link } from "gatsby"
import { colors, spacing } from "../utils/styles"

export default ({ title, link }) => {
  return (
    <div
      css={css`
          ${spacing.tab}
          background: ${colors.navy_normal};
          border-left: 6px solid ${colors.navy_normal};
      `}
    >
      <Link
        to={link}
        className="Button-subhead-Style"
        css={css`
          ${spacing.text_clearance}
        `}
      >
        {title}
      </Link>
    </div>
  )
}
