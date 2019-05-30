import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ data, pageContext }) => {
  const post = data.markdownRemark

  return (
    <Layout>
      <div>{post.frontmatter.title}</div>
      <div>{post.frontmatter.description}</div>
      <hr />
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </Layout>
  )
}

export const query = graphql`
  query($title: String!) {
    markdownRemark(frontmatter: { title: { eq: $title } }) {
      html
      frontmatter {
        title
        description
      }
    }
  }
`
