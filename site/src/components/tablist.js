import React from "react"
import { css } from "@emotion/core"
import RepoTab from "./repotab"
import { spacing } from "../utils/styles"

export default ({
  elements
}) => {
  let elementTabs = elements.map(( element ) => (
    <div
      key={element.title}
      css={css`
        ${spacing.standard_vertical}
      `}
    >
      {true && (
        <RepoTab
          title={element.title}
          link={element.link}
        />
      )}
    </div>
  ))

  return (
    <div>
      {elementTabs}
    </div>
  )
}
