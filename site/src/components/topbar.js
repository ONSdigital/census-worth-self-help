import React from "react"
import { css } from "@emotion/core"
import { gradients, spacing, colors } from "../utils/styles"
import TopbarLink from "./topbarlink"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

export default ({ searchObject = null }) => {
  return (
    <header
      css={css`
        width: 100vw;
        ${gradients.navy_shine};
      `}
    >
      {searchObject && (
        <div
          css={css`
            display: flex;
          `}
        >
          <div
            css={css`
              padding: 10px 15px 14px 15px;
              flex-grow: 1;
              display: flex;
            `}
          >
            <div
              css={css`
                ${spacing.vert_aligned_flex_text}
                position: relative;
                left: 5px;
              `}
            >
              <FontAwesomeIcon
                css={css`
                  position: absolute;
                  color: #6e6e6e;
                `}
                icon={faSearch}
              />
            </div>
            <input
              data-testid="search-box"
              className="Notification-heading-Style"
              css={css`
                border: 0;
                border-radius: 16px;
                background-color: ${colors.white_two};
                flex-grow: 1;
                padding-left: 25px;
              `}
              type="text"
              value={searchObject.query}
              onChange={searchObject.updateFunction}
              autoFocus
            />
          </div>
          <TopbarLink title="Menu" link="/menu" />
        </div>
      )}
      {!searchObject && (
        <div
          css={css`
            display: flex;
          `}
        >
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
          <TopbarLink
            title={<FontAwesomeIcon icon={faSearch} />}
            link="/search"
          />
          <TopbarLink title="Menu" link="/menu" />
        </div>
      )}
    </header>
  )
}
