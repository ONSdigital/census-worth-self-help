import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import TabList from "../components/tablist"

export default ({ data }) => {
  let alertText =
    data.markdownRemark && data.markdownRemark.frontmatter.alert_content

  let renderMostRecent = data.allMarkdownRemark
  return (
    <Layout logo={true} phone_link={false} explore_more_link={true} alert={alertText} >
      { renderMostRecent && 
        <TabList title="RECENTLY UPDATED" link="mostrecent"
        elements={data.allMarkdownRemark.edges} /> }
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
