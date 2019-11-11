import React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/admin/layout"
import PageTitle from "../../components/pagetitle"
import TextBlock from "../../components/textblock"

export default class Report extends React.Component {
  render() {
    return (
      <Layout>
        <PageTitle>
          Report
        </PageTitle>
        <TextBlock>
          CMS content report
        </TextBlock>
      </Layout>
    )
  }
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
