import React from "react"
import { css } from "@emotion/core"
import { fonts, spacing } from "../utils/styles"

export default ({ children }) => {
  return (
    <p
      css={css`
        ${fonts.small};
        ${spacing.in_page_element};
      `}
    >
      {children}
    </p>
  )
}
