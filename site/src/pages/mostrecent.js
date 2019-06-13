import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PageTitle from "../components/pagetitle"
import TextBlock from "../components/textblock"
import TabList from "../components/tablist"

export default ({ data }) => {
  return (
    <Layout explore_more_link={true}>
      <PageTitle>Recently Updated</PageTitle>
      <TextBlock>
        Most recent changes, need to check with Phil to see if there's actually
        content for this
      </TextBlock>
      <TabList elements={data.allMarkdownRemark.edges} />
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { fields: { collection: { eq: "articles" } } }
    ) {
      totalCount
      edges {
        node {
          ...BaseArticleFields
        }
      }
    }
  }
`
