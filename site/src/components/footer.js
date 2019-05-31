import React from "react"
import { css } from "@emotion/core"
import { colors, spacing } from "../utils/styles"

export default () => {
  return (
    <div
      css={css`
        ${spacing.large_vertical}
        width: 100%;
        padding: 10px 0px;
        background-color: ${colors.light_gray};
        display: flex;
      `}
    />
  )
}
