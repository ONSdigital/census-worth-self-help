import React from "react"
import { css } from "@emotion/core"
import { colors, spacing } from "../utils/styles"

export default ({ title, content }) => {
  return (
    <div css={css`
	     border-radius: 4px;
	  	 border: solid 2px ${colors.golden_yellow};
	  	 background-color: ${colors.light_tan};
	  	 margin: 15px;
	  	 ${spacing.page_padding}
  	 `}>
      <b>{title}</b>
      <p data-testid="alert-message">{content}</p>
    </div>
  )
}
