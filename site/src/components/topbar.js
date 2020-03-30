import React from "react"
import { css } from "@emotion/core"
import { siteStyle, spacing, colors } from "../utils/styles"
import TopbarLink from "./topbarlink"
import CensusLogo from "./censuslogo"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { navigate } from "@reach/router"
import VisuallyHidden from "@reach/visually-hidden"

import { parse } from "query-string"

const backFunction = () => {
  let target = "/"
  if (typeof window !== "undefined") {
    let queryParams = parse(window.location.search)
    if (queryParams.redirect) {
      let redirect = decodeURIComponent(queryParams.redirect)
      if (redirect[0] === "/") {
        target = queryParams.redirect
      }
    }
  }
  navigate(target)
}

export default ({ searchObject = null, logo = false, backButton = false }) => {
  let pathname = encodeURIComponent("/")
  let siteSpecificStyle = siteStyle("/")

  if (typeof window !== "undefined") {
    pathname = encodeURIComponent(window.location.pathname)
    siteSpecificStyle = siteStyle(window.location.href)
  }

  return (
    <header
      css={css`
        width: 100vw;
        background-color: ${siteSpecificStyle};
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-shrink: 0;
      `}
    >
      {searchObject && (
        <div
          css={css`
            flex-shrink: 0;
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
          <TopbarLink title="Close" clickFunction={backFunction} />
        </div>
      )}
      {!searchObject && (
        <div
          css={css`
            flex-shrink: 0;
            display: flex;
            width: 100%;
            max-width: ${spacing.desktop_max_width};
          `}
        >
          <div
            className="Header-Title-Style clickable"
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
            link={"/search/?redirect=" + pathname}
          />
          {!backButton && (
            <TopbarLink title="Menu" link={"/menu/?redirect=" + pathname} />
          )}
          {backButton && (
            <TopbarLink title="Close" clickFunction={backFunction} />
          )}
        </div>
      )}
      {logo && <CensusLogo />}
    </header>
  )
}
