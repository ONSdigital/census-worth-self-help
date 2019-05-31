import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PageTitle from "../components/pagetitle"
import Breadcrumbs from "../components/breadcrumbs"
import TextBlock from "../components/textblock"

export default ({ data, pageContext }) => {
  const post = data.markdownRemark

  return (
    <Layout>
      <Breadcrumbs breadcrumbs={pageContext.breadcrumbs} peers={pageContext.peers}/>
      <PageTitle>{pageContext.title}</PageTitle>
      <TextBlock><b>{post.frontmatter.description}</b></TextBlock>
      <TextBlock><div dangerouslySetInnerHTML={{ __html: post.html }} /></TextBlock>
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
