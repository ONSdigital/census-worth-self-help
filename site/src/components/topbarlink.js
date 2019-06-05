import React from "react"
import { css } from "@emotion/core"
import { Link } from "gatsby"
import { spacing } from "../utils/styles"

export default ({ title, link }) => {
  return (
    <div
      css={css`
        ${spacing.vert_aligned_flex_text}
        padding: 0px 10px;
        background-color: rgb(255, 255, 255, 0.2);
        border-radius: 4px;
        margin: 10px 10px 10px 0px;
        min-width: 20px;
        object-fit: contain;
        text-align: center;
        height: 40px;
      `}
    >
      <Link
        to={link}
        className="Header-button-Style"
        css={css`
          text-decoration: none;
        `}
      >
        {title}
      </Link>
    </div>
  )
}
