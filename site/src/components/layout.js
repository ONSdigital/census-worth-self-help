import React from "react"
import { css } from "@emotion/core"

import Topbar from "./topbar"
import Footer from "./footer"
import { spacing } from "../utils/styles"

export default ({ children }) => {
  return (
    <div>
      <Topbar />
      <div
        css={css`
          ${spacing.main_box}
        `}
      >
        {children}
        <Footer />
      </div>
    </div>
  )
}
