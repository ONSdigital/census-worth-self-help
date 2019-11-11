import React from "react"
import { css } from "@emotion/core"

import { spacing } from "../../utils/styles"

export default ({
  children,
}) => {
  return (
    <div
      css={css`
        height: 100vh;
        display: flex;
        flex-direction: column;
      `}
    >
      <div
        css={css`
          overflow: scroll;
          width: 100vw;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          align-items: center;
        `}
      >
        <main
          css={css`
            flex-grow: 1;
            width: 100%;
            max-width: ${spacing.desktop_max_width};
          `}
        >
          {children}
        </main>
      </div>
    </div>
  )
}
