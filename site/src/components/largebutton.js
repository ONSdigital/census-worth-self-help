import React from "react"
import { css } from "@emotion/core"
import { Link } from "gatsby"
import { spacing, colors } from "../utils/styles"

export default ({ title, link, icon = null }) => {
  return (
    <div
      css={css`
        ${spacing.vert_aligned_flex_text}
        padding: 0px 10px;
        border-radius: 4px;
        box-shadow: 0 2px 4px 0 rgba(212, 212, 212, 0.5);
        border: solid 1px #ececed;
        margin: 0px 10px;
        text-align: center;
        height: 40px;
        background-color: ${colors.white};
      `}
    >
      {icon && (
        <div
          css={css`
            position: relative;
            color: ${colors.navy_normal};
          `}
        >
          <div
            css={css`
              position: absolute;
            `}
          >
            {icon}
          </div>
        </div>
      )}
      <Link
        className="Button-heading-Style"
        to={link}
        css={css`
          margin: 0px 20px;
          text-decoration: none;
          color: ${colors.navy_normal};
        `}
      >
        {title}
      </Link>
    </div>
  )
}