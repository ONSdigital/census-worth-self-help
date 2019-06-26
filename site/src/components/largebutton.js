import React from "react"
import { css } from "@emotion/core"
import { navigate } from "@reach/router"
import { spacing, colors } from "../utils/styles"

export default ({
  title,
  link = "",
  icon = null,
  additionalCss = undefined,
  clickFunction = undefined,
  selected = false,
  dimmed = false
}) => {
  // if already selected, remove click function, if no click function provided navigate to link.
  const onClick = selected
    ? null
    : clickFunction
    ? clickFunction
    : () => navigate(link)

  const textColor = dimmed ? "rgba(0,61,89, 0.2)" : colors.navy_normal

  return (
    <div
      data-testid="large-button"
      onClick={onClick}
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
        ${additionalCss}
      `}
    >
      {icon && (
        <div
          css={css`
            position: relative;
            color: ${textColor};
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
      <div
        className="Button-heading-Style"
        css={css`
          margin: 0px 20px;
          color: ${textColor};
        `}
      >
        {title}
      </div>
    </div>
  )
}
