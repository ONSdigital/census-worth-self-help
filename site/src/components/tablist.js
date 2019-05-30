import React from "react"
import { css } from "@emotion/core"
import RepoTab from "./repotab"
import ArticleTab from "./articletab"
import { spacing } from "../utils/styles"

export default ({
  elements
}) => {
  console.log(elements)
  let elementTabs = elements.map(( element ) => (
    <div
      key={element.title}
      css={css`
        ${spacing.standard_vertical}
      `}
    >
      {element.type==='repo' && (
        <RepoTab
          title={element.title}
          link={element.link}
        />
      )}
      {element.type==='article' && (
        <ArticleTab
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
