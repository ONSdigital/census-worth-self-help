import React from "react"
import { css } from "@emotion/core"
import { spacing, colors } from "../utils/styles"

export default ({ title, subtitle, clickFunction, icon = null }) => {
  return (
    <div
      onClick={clickFunction}
      css={css`
        border-radius: 4px;
        box-shadow: 0 2px 4px 0 rgba(212, 212, 212, 0.5);
        border: solid 1px #ececed;
        margin: 0px 10px;
        background-color: ${colors.white};
        display: flex;
      `}
    >
      {icon && (
        <div
          className="Article-Title-Style"
          css={css`
            ${spacing.vert_aligned_flex_text}
            display: flex;
            justify-content: center;
            height: 78px;
            width: 78px;
            color: white;
            background-color: ${colors.navy_normal};
          `}
        >
          <div
            css={css`
              text-align: center;
            `}
          >
            {icon}
          </div>
        </div>
      )}
      <div
        css={css`
          ${spacing.vert_aligned_flex_text}
          margin: 0px 20px;
          color: ${colors.navy_normal};
        `}
      >
        <div className="Button-heading-Style" css={css`text-align: left;`}>{title}</div>
        <div className="Card-meta-Style" css={css`text-align: left;`}>{subtitle}</div>
      </div>
    </div>
  )
}
