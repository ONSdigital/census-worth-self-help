import React from "react"
import { graphql } from "gatsby"
import Alert from "../components/alert"
import Layout from "../components/layout"
import { transformQueryDataToArticleData } from "../utils/transformers"
import TabList from "../components/tablist"

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
      <TabList elements={transformQueryDataToArticleData(data.allMarkdownRemark.edges)} />
    </Layout>
  )
}

export const query = graphql`
  fragment BaseArticleFields on MarkdownRemark {
    id
    fields {
      collection
      pagename
    }
    frontmatter {
      title
      date
      description
      directory
    }
  }

  query {
    markdownRemark(frontmatter: { alert_content: { ne: null } }) {
      frontmatter {
        alert_content
      }
    }
  
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { fields: {collection: {eq: "articles"}}}
      limit: 3
    ){
      totalCount
      edges {
        node {
          ...BaseArticleFields
        }
      }
    }
  }
`
