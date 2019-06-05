import React from "react"
import { css } from "@emotion/core"
import { gradients } from "../utils/styles"

export default () => {
  return (
    <div
      css={css`
        width: 100vw;
        ${gradients.navy_shine};
      `}
    >
      <img
        src="/ONS_logo.svg"
        alt="Main logo"
        css={css`
          padding: 0px 15px 20px 15px;
        `}
      />
    </div>
  )
}