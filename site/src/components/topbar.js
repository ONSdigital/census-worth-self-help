import React from "react"
import { css } from "@emotion/core"
import { gradients, spacing } from "../utils/styles"
import TopbarLink from "./topbarlink"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default () => {
  return (
    <header
      css={css`
        display: flex;
        width: 100vw;
        ${gradients.navy_shine};
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
        className="Header-Title-Style"
        css={css`
          ${spacing.vert_aligned_flex_text}
          flex-grow: 1;
        `}
      >
        Field Assistant
      </div>
      <TopbarLink title={<FontAwesomeIcon icon={faSearch} />} link="search" />
      <TopbarLink title="MENU" link="menu" />
    </header>
  )
}
