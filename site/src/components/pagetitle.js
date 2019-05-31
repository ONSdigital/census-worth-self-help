import React from "react"
import { css } from "@emotion/core"
import { colors, fonts, spacing } from "../utils/styles"

export default ({ children }) => {
  return (
    <h1 css={css`
	  	 ${fonts.Article_Title_Style};
	  	 ${spacing.in_page_element}
  	 `}>
      {children}
    </h1>
  )
}
