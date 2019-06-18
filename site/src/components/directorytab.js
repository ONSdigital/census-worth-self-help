import React from "react"
import { css } from "@emotion/core"
import { navigate } from "@reach/router"
import { colors, spacing } from "../utils/styles"

export default ({ title, link }) => {
  return (
    <div
      onClick={() => navigate("/" + link)}
      css={css`
          ${spacing.tab}
          background: ${colors.navy_normal};
          border-left: 6px solid ${colors.navy_normal};
      `}
    >
      <div
        className="Card-heading-Style-white"
        css={css`
          ${spacing.text_clearance}
        `}
      >
        {title}
      </div>
    </div>
  )
}
