import React from "react"
import { css } from "@emotion/core"

export default ({ node, fieldNames }) => {
  let title = node.frontmatter.title
  let link = `/admin/#/collections/${node.fields.collection}/entries/${node.fields.pagename}`
  return (
    <div>
      <a href={link}>
        {title}
      </a>
      <div css={css`
          padding-left:2em;
          font-size:small;
          color:#aaa;
        `}>
      {fieldNames.map(fieldName => (
        <div
          css={css`
            padding-left:1em;
          `}
          id={fieldName}>{fieldName} = {node.frontmatter[fieldName] && node.frontmatter[fieldName].toString()}</div>
      ))}
      </div>
    </div>
  )
}
