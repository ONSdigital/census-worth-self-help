import React from "react"
import { css } from "@emotion/core"
import { colors } from "../utils/styles"

export default ({ children }) => {
  return (
    <h1 css={css`
	  	 color: ${colors.purple};
  	 `}>
      {children}
    </h1>
  )
}
