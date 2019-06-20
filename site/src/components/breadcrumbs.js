import React from "react"
import { css } from "@emotion/core"
import { colors, spacing } from "../utils/styles"
import { navigate } from "@reach/router"
import Section from "./section"
import Select from "react-select"

export default ({ breadcrumbs, peers = [], thisPage = "" }) => {
  const convertToOption = (linkPair, tabCount) => {
    return { value: linkPair.link, label: linkPair.title, indent: tabCount }
  }

  // ancestors have increasing indentation up to the peers that all have the same.
  let indentLevel = -1
  breadcrumbs = breadcrumbs.map(breadcrumb => {
    indentLevel += 1
    return convertToOption(breadcrumb, indentLevel)
  })
  indentLevel += 1
  peers = peers.map(peer => convertToOption(peer, indentLevel))
  let options = breadcrumbs.concat(peers)

  // react-select needs the option object itself to know whats been selected.
  let selectedOption = null
  options.forEach(option => {
    if (option.label === thisPage) {
      selectedOption = option
    }
  })

  // react-select style object we inherit everything and only change the indent
  const colourStyles = {
    option: (styles, { data }) => {
      return {
        ...styles,
        "text-indent": data.indent + "em"
      }
    }
  }

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
          styles={colourStyles}
          components={{
            IndicatorSeparator: () => null
          }}
        />
      </div>
    </Section>
  )
}
