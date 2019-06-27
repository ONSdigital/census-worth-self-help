import React from "react"
import { css } from "@emotion/core"
import { spacing } from "../utils/styles"

export default ({ children, articleContent = false }) => {
  return (
    <div
      className="Article-body-Style"
      css={css`
        ${spacing.in_page_element};
        margin-bottom: ${articleContent ? "0px" : "20px"};
      `}
    >
      {children}
    </div>
  )
}
