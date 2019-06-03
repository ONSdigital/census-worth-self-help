import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PageTitle from "../components/pagetitle"
import Breadcrumbs from "../components/breadcrumbs"
import TextBlock from "../components/textblock"
import TabList from "../components/tablist"
import { transformQueryDataToArticleData } from "../utils/transformers"

export default ({ data }) => {

  let breadcrumbs = []
  return (
    <Layout>
      <Breadcrumbs
        breadcrumbs={breadcrumbs}
      />
      <PageTitle>Recently Updated</PageTitle>
      <TextBlock>
        <b>Most recent changes, need to check with Phil to see if there's actually content for this</b>
      </TextBlock>
      <TabList elements={transformQueryDataToArticleData(data.allMarkdownRemark.edges)} />
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark (
      sort: { fields: frontmatter___date order: DESC }
      filter: { fields: {collection: {eq: "articles"}}}
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
