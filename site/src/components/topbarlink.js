import React from "react"
import { css } from "@emotion/core"
import { spacing } from "../utils/styles"
import { navigate } from "@reach/router"

export default ({ title, link, background = true, clickFunction = null }) => {
  const redirect = event => {
    navigate(link)
  }

  return (
    <div
      className="Header-button-Style"
      data-testid="topbarlink-button"
      css={css`
        ${spacing.vert_aligned_flex_text}
        padding: 0px 10px;
        ${background ? "background-color: rgb(255, 255, 255, 0.2);" : ""}
        border-radius: 4px;
        margin: 10px 10px 10px 0px;
        min-width: 20px;
        object-fit: contain;
        text-align: center;
        height: 40px;
      `}
      onClick={clickFunction ? clickFunction : redirect}
    >
      {title}
    </div>
  )
}
