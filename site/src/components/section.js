import React from "react"
import { css } from "@emotion/core"
import { colors } from "../utils/styles"

export default ({ children }) => {
  return (
    <div
      css={css`
        border-bottom: 1px ${colors.pale_lilac} solid;
        padding: 15px 0px;
      `}
    >
      {children}
    </div>
  )
}
