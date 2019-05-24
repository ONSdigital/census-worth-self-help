import React from "react"
import { graphql } from "gatsby"
import Alert from "../components/alert"

export default ({ data }) => {
  let alertFound = data.markdownRemark !== null && data.markdownRemark.frontmatter.alert_content !== ""
  return (
    <div>
      { alertFound &&
        <Alert 
        title={data.markdownRemark.frontmatter.alert_title}
        content={data.markdownRemark.frontmatter.alert_content} /> 
      }
      <p>hello world</p>
    </div>
  )
}

export const query = graphql`
  query {
  markdownRemark(frontmatter: {alert_title: {ne: null}}) {
    frontmatter {
      alert_title
      alert_content
    }
  }
}
`

