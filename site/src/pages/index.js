import React from "react"
import { graphql } from "gatsby"
import Alert from "../components/alert"

export default ({ data }) => {
  let alertFound = data.markdownRemark && data.markdownRemark.frontmatter.alert_content !== ""
  return (
    <div>
      { alertFound &&
        <Alert 
        title="Alert"
        content={data.markdownRemark.frontmatter.alert_content} /> 
      }
      <p>hello world</p>
    </div>
  )
}

export const query = graphql`
  query {
  markdownRemark(frontmatter: {alert_content: {ne: null}}) {
    frontmatter {
      alert_content
    }
  }
}
`

