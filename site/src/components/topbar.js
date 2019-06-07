import React from "react"
import { css } from "@emotion/core"
import { gradients, spacing } from "../utils/styles"
import TopbarLink from "./topbarlink"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

export default ( {searchObject=null} ) => {
  let searchOpen = searchObject && searchObject.open
  return (
    <header
      css={css`
        width: 100vw;
        ${gradients.navy_shine};
      `}
    >
      { searchOpen && <input type="text" value={searchObject.query} onChange={searchObject.updateFunction} /> }
      { !searchOpen && 
        <div css={css`
          display: flex;
        `}>
          <div
            className="Header-Title-Style"
            css={css`
              ${spacing.vert_aligned_flex_text}
              ${spacing.page_padding}
              flex-grow: 1;
            `}
          >
            Census Field Assistant
          </div>
          <TopbarLink title={<FontAwesomeIcon icon={faSearch} />} link="search" />
          <TopbarLink title="Menu" link="menu" />
        </div>
      }
    </header>
  )
}
