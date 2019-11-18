import React from "react"
import { css } from "@emotion/core"

export default ({ node, fieldNames }) => {
  let title = node.frontmatter.title
  let link = `/admin/#/collections/${node.fields.collection}/entries/${node.fields.pagename}`
  return (
    <div>
      <a href={link} target="_blank" rel="noopener noreferrer">
        {title}
      </a>
      <div css={css`
          padding-left:2em;
          font-size:small;
          color:#aaa;
        `}>
      {fieldNames
        .filter(fieldName => fieldName !== "contentsource")
        .map(fieldName => (
        <div
          css={css`
            padding-left:1em;
            word-wrap: break-word;
          `}
          key={fieldName}
          id={fieldName}>{fieldName} = {
            node.frontmatter[fieldName] &&
              node.frontmatter[fieldName].toString()
          }
          </div>
      ))}
        {node.frontmatter.contentsource &&
          <div css={css`
              padding-left:1em;
              word-wrap: break-word;
              a {color:#666;}
            `}>{node.frontmatter.contentsource.startsWith("http") &&
                <a
                  href={node.frontmatter.contentsource} target="_blank"
                  rel="noopener noreferrer"
                >{node.frontmatter.contentsource}</a>
          }{!node.frontmatter.contentsource.startsWith("http") &&
            <div>{node.frontmatter.contentsource}</div>
          }
          </div>
        }
      </div>
    </div>
  )
}
