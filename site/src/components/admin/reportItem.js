import React from "react"

export default ({ node }) => {
  let title = node.frontmatter.title
  let link = `/admin/#/collections/${node.fields.collection}/entries/${node.fields.pagename}`
  return (
    <div>
      <a href={link}>
        {title}
      </a>
    </div>
  )
}
