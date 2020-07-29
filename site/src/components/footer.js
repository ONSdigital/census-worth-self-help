import React from "react"
import { css } from "@emotion/core"
import { colors, spacing } from "../utils/styles"
import LargeButton from "./largebutton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPhone } from "@fortawesome/free-solid-svg-icons"
import { navigate } from "@reach/router"
import analytics from "../utils/analytics"


const navigateToContactCentrePage = () => {
  analytics.trackEvent("census-field-support", "clicked help", "page", window.location.pathname)
  navigate("/contactcentre/")
}

export default ({ phone_link = false }) => {
  return (
    <div
      css={css`
        ${spacing.large_vertical}
        width: 100%;
        padding: 10px 0px;
        background-color: ${colors.footer_gray};
        display: flex;
        min-height: 100px;
        flex-direction: column;
        justify-content: center;
        flex-shrink: 0;
      `}
    >
      <img
        src="/census_2021_logo_purple.svg"
        alt="Footer logo"
        css={css`
          height: 50px;
          margin-bottom: 30px;
          margin-top: 30px;
        `}
      />
      {phone_link && (
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
          `}
        >
          <div
            css={css`
              margin-bottom: 34px;
              max-width: 350px;
              width: 100%;
            `}
          >
            <LargeButton
              icon={<FontAwesomeIcon icon={faPhone} />}
              title="Census Field Support"
              clickFunction={navigateToContactCentrePage}
            />
          </div>
        </div>
      )}
      <div className="Footer-Style">© Office for National Statistics 2019</div>
    </div>
  )
}
