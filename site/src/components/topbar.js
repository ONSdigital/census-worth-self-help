import React from "react"
import { css } from "@emotion/core"
import { gradients, fonts, spacing } from "../utils/styles"
import TopbarLink from "./topbarlink"

export default () => {
  return (
    <header
      css={css`
        display: flex;
        position: fixed;
        width: 100%;
        height: 60px; // TODO: needs to be a global defined
        ${gradients.purple_shine};
      `}
    >
      <img
        src="/C2021topbar.png"
        alt="Main logo"
        css={css`
          width: 30px;
          height: 40px;
          margin: 10px;
          margin-right: 30px;
        `}
      />
      <div
        css={css`
          ${spacing.vert_aligned_flex_text}
          ${fonts.Header_Title_Style};
          flex-grow: 1;
        `}
      >
        Field assistant
      </div>
      <TopbarLink title="x" link="search" />
      <TopbarLink title="MENU" link="menu"/>
    </header>
  )
}
