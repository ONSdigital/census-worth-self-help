import React from "react"
import { css } from "@emotion/core"
import { spacing } from "../utils/styles"

export default ({ children, subtitle = null }) => {
  return (
    <div
      css={css`
        ${spacing.in_page_element}
      `}
    >
      <h1
        css={css`
          margin-bottom: 0px;
          display: flex;
        `}
        className="Article-Title-Style"
        data-testid="search-result-title"
      >
        {children}
      </h1>
      {subtitle && (
        <div
          css={css`
            padding-top: 5px;
            padding-bottom: 15px;
          `}
          className="Button-subhead-Style"
        >
          {subtitle}
        </div>
      )}
    </div>
  )
}
