import React from "react"
import { css } from "@emotion/core"
import { spacing, colors } from "../utils/styles"

export default ({ title, subtitle, icon = null }) => {
  return (
    <div
      css={css`
        box-shadow: 0 2px 4px 0 rgba(212, 212, 212, 0.5);
        border: solid 1px #ececed;
        background-color: ${colors.white};
        height: 74px;
        display: flex;
      `}
    >
      {icon && (
        <div
          css={css`
            position: relative;
            left: 33px;
            color: ${colors.navy_normal};
            ${spacing.vert_aligned_flex_text}
            justify-content: center;
          `}
        >
          <div
            css={css`
              font-size: 30px;
              position: absolute;
            `}
          >
            {icon}
          </div>
        </div>
      )}
      <div
        css={css`
          ${spacing.vert_aligned_flex_text}
          flex-grow:1;
          text-align: center;
        `}
      >
        <div css={css`
          margin-bottom: 5px;
        `} className="Card-heading-Style">{title}</div>
        <div className="Card-sub-head-Style-gray">
          {subtitle}
        </div>
      </div>
    </div>
  )
}
