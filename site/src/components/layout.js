import React from "react"
import { css } from "@emotion/core"

import Topbar from "./topbar"
import Footer from "./footer"
import { spacing } from "../utils/styles"

export default ({ children }) => {
  return (
    <div css={css`
          height: 100vh;
          display: flex;
          flex-direction: column;
        `}>
      <Topbar />
      <div
        css={css`
          ${spacing.main_box}
          overflow: scroll;
          width: 100vw;
        `}
      >
        {children}
        <Footer />
      </div>
    </div>
  )
}
