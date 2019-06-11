import React from "react"
import { css } from "@emotion/core"
import { spacing } from "../utils/styles"

export default ({ children }) => {
  return (
    <h1
      className="Article-Title-Style"
      css={css`
        ${spacing.in_page_element}
        display: flex;
      `}
    >
      {children}
    </h1>
  )
}
