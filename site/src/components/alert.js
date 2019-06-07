import React from "react"
import { css } from "@emotion/core"
import { colors, spacing } from "../utils/styles"

export default ({ title, content }) => {
  return (
    <div
      css={css`
        border-radius: 4px;
        border: solid 2px ${colors.golden_yellow};
        background-color: ${colors.light_tan};
        margin: 15px 15px 0px 15px;
        ${spacing.page_padding}
      `}
    >
      <div
        className="Notification-heading-Style"
        css={css`
          padding-top: 5px;
          padding-bottom: 10px;
        `}
      >
        {title}
      </div>
      <div
        className="Notification-body-Style"
        data-testid="alert-message"
        css={css`
          padding-top: 10px;
          padding-bottom: 5px;
        `}
      >
        {content}
      </div>
    </div>
  )
}
