import React from "react"
import { css } from "@emotion/core"
import { spacing } from "../utils/styles"

export default ({ children }) => {
  return (
    <p
      className="Article-body-Style"
      css={css`
        ${spacing.in_page_element};
      `}
    >
      {children}
    </p>
  )
}
