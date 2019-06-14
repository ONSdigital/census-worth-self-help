import React from "react"
import { css } from "@emotion/core"
import { colors, spacing } from "../utils/styles"
import { navigate } from "@reach/router"
import Section from "./section"
import Select from 'react-select';

export default ({ breadcrumbs, peers = [] }) => {

  const convertToOption = (linkPair, tabCount) => {
    let tabString = "-".repeat(tabCount)
    return {value: linkPair.link, label: tabString + linkPair.title}
  }
  let indentLevel = -1;
  breadcrumbs = breadcrumbs.map(breadcrumb => {
    indentLevel += 1
    return convertToOption(breadcrumb, indentLevel)
  })
  indentLevel += 1
  peers = peers.map(peer => convertToOption(peer, indentLevel))
  if ( peers[0] ) {
    peers[0].label = (<b>{peers[0].label}</b>)
  }

  let options = breadcrumbs.concat(peers)
  let selectedOption =  breadcrumbs[breadcrumbs.length - 1]

  const redirect = option => {
    navigate(`/` + option.value)
  }

  return (
    <Section
      css={css`
        background-color: ${colors.white_two};
      `}
    >
      <div
        className="Section-heading-Style"
        css={css`
          ${spacing.in_page_element}
        `}
      >
        EXPLORE CONTENT
      </div>
      <div
        css={css`
          ${spacing.in_page_element}
        `}
      >
        <Select
          className="Button-subhead-Style"
          value={selectedOption}
          onChange={redirect}
          options={options}
          components={{
            IndicatorSeparator: () => null
          }}
        />
      </div>
    </Section>
  )
}
