import React from "react"
import { css } from "@emotion/core"
import { gradients, spacing, colors } from "../utils/styles"
import TopbarLink from "./topbarlink"
import OnsLogo from "./onslogo"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { navigate } from "@reach/router"
import VisuallyHidden from "@reach/visually-hidden"

export default ({ searchObject = null, logo = false }) => {
  return (
    <header
      css={css`
        width: 100vw;
        ${gradients.navy_shine};
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      {searchObject && (
        <div
          css={css`
            display: flex;
            width: 100%;
            max-width: ${spacing.desktop_max_width};
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
            <VisuallyHidden>
              <label htmlFor={"search-box"}>Breadcrumb Select Box</label>
            </VisuallyHidden>
            <input
              id="search-box"
              data-testid="search-box"
              className="Notification-heading-Style"
              maxLength="60"
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
          <TopbarLink title="Menu" link="/menu/" />
        </div>
      )}
      {!searchObject && (
        <div
          css={css`
            display: flex;
            width: 100%;
            max-width: ${spacing.desktop_max_width};
          `}
        >
          <div
            className="Header-Title-Style"
            onClick={() => navigate("/")}
            css={css`
              ${spacing.vert_aligned_flex_text}
              ${spacing.page_padding}
              flex-grow: 1;
            `}
          >
            Self Help Facility
          </div>
          <TopbarLink
            title={
              <div
                css={css`
                  font-size: 19px;
                `}
              >
                <FontAwesomeIcon icon={faSearch} />
              </div>
            }
            link="/search/"
          />
          <TopbarLink title="Menu" link="/menu/" />
        </div>
      )}
      {logo && <OnsLogo />}
    </header>
  )
}
