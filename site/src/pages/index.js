import React from "react"
import { graphql } from "gatsby"
import Alert from "../components/alert"
import Layout from "../components/layout"
import TextBlock from "../components/textblock"

export default ({ data }) => {
  let alertFound =
    data.markdownRemark && data.markdownRemark.frontmatter.alert_content !== ""
  return (
    <Layout>
      {alertFound && (
        <Alert
          title="Alert"
          content={data.markdownRemark.frontmatter.alert_content}
        />
      )}
      <TextBlock>Hello World. welcome to the new world 1</TextBlock>
    </Layout>
  )
}

export const query = graphql`
  query {
    markdownRemark(frontmatter: { alert_content: { ne: null } }) {
      frontmatter {
        alert_content
      }
    }
  }
`
