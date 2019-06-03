import React from "react"
import { css } from "@emotion/core"
import DirectoryTab from "./directorytab"
import ArticleTab from "./articletab"
import { spacing } from "../utils/styles"

export default ({ elements }) => {
  let elementTabs = elements.map(element => (
    <div
      key={element.title}
      css={css`
        ${spacing.minimum_gap};
      `}
    >
      {element.type === "directory" && (
        <DirectoryTab title={element.title} link={element.link} />
      )}
      {element.type === "article" && (
        <ArticleTab title={element.title} link={element.link} />
      )}
    </div>
  ))

  return <div>{elementTabs}</div>
}
