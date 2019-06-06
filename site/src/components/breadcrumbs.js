import React from "react"
import { css } from "@emotion/core"
import { colors, spacing } from "../utils/styles"
import { navigate } from "@reach/router"
import Section from "./section"

export default ({ breadcrumbs, peers=[] }) => {
  let breadcrumbOptions = breadcrumbs.map(breadcrumb => (
    <option key={breadcrumb.title} value={breadcrumb.link}>
      {breadcrumb.title}
    </option>
  ))
  let peerOptions = peers.map(peer => (
    <option key={peer.title} value={peer.link}>
      {peer.title}
    </option>
  ))

  const redirect = (event) => {
    navigate(`/` + event.target.value)
  }

  return (
    <Section css={css`
            background-color: ${colors.white_two};
    `}>
      <div className="Section-heading-Style" css={css`
          ${spacing.in_page_element}
        `}>EXPLORE CONTENT</div>
      <div css={css`
          ${spacing.in_page_element}
        `}>
        <select
          onChange={redirect}
          css={css`
            background-color: ${colors.white};
            border-bottom: ${colors.black_two} 1px solid;
            width: 100%;
            padding: 5px;
          `}
        >
          {breadcrumbOptions}
          {peerOptions}
        </select>
      </div>
    </Section>
  )
}
