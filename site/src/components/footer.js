import React from "react"
import { css } from "@emotion/core"
import { colors, spacing } from "../utils/styles"
import LargeButton from "./largebutton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPhone } from "@fortawesome/free-solid-svg-icons"

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
      `}
    >
      <img
        src="/footer_logo.svg"
        alt="Footer logo"
        css={css`
          margin-bottom: 50px;
          margin-top: 50px;
        `}
      />
      {phone_link && (
        <div
          css={css`
            margin-bottom: 34px;
          `}
        >
          <LargeButton
            icon={<FontAwesomeIcon icon={faPhone} />}
            title="Census Field Support"
            link="/call_centre"
          />
        </div>
      )}
      <div className="Footer-Style">© Office for National Statistics 2019</div>
    </div>
  )
}
