import React from "react"
import { css } from "@emotion/core"
import { Link } from "gatsby"
import { fonts, colors, spacing } from "../utils/styles"
const moment = require('moment')

export default ({ element }) => {
  let {title, link, description, date} = element
  let date_formatted = moment(date).fromNow()
  return (
    <div
      css={css`
        ${fonts.small};
        ${spacing.tab};
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
        border-left: 6px solid ${colors.purple};
        background-color: ${colors.white}
      `}
    >
      <Link
          to={link}
          css={css`
            text-decoration: none;
            color: inherit;
            flex-grow: 1;
            font-weight: bold;
          `}
        >
        {title}
      </Link>
      <div
        css={css`
          display: flex;
          flex-direction: vertical;
        `}
      >
        <div css={css`
          width: 70%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex-grow:1;
        `}>
          {description}
        </div>
        <div>
          {date_formatted}
        </div>
      </div>
    </div>
  )
}
