import React from "react"
import { css } from "@emotion/core"
import { Link } from "gatsby"
import { spacing, colors } from "../utils/styles"

export default ({ title, link }) => {
  return (
    <div
      css={css`
        ${spacing.vert_aligned_flex_text}
        padding: 0px 10px;
        border-radius: 4px;
        border: 1px ${colors.black_two} solid;
        margin: 10px 10px 10px 10px;
        text-align: center;
        height: 40px;
      `}
    >
      <Link
        to={link}
        css={css`
          text-decoration: none;
        `}
      >
        {title}
      </Link>
    </div>
  )
}
