import React from "react"
import { css } from "@emotion/core"
import { colors } from "../utils/styles"

export default ({ title, content }) => {
  return (
    <div data-testid="alert-message" css={css`
	     border-radius: 4px;
	  	 border: solid 2px ${colors.golden_yellow};
	  	 background-color: ${colors.light_tan};
	  	 margin: 15px;
	  	 padding: 15px;
  	 `}>
      <b>{title}</b>
      <p>{content}</p>
    </div>
  )
}
