import React from "react"
import { css } from "@emotion/core"
import { gradients } from "../utils/styles"
import VisuallyHidden from "@reach/visually-hidden"

export default () => {
  return (
    <div
      css={css`
        width: 100vw;
        ${gradients.navy_shine};
      `}
    >
      <VisuallyHidden>
        <h1>Self Help Facility</h1>
      </VisuallyHidden>
      <img
        src="/ONS_logo.svg"
        alt="Main logo"
        css={css`
          padding: 0px 15px 20px 15px;
        `}
        data-test="ons-logo__header"
      />
    </div>
  )
}
