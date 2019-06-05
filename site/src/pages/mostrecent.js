import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PageTitle from "../components/pagetitle"
import TextBlock from "../components/textblock"
import TabList from "../components/tablist"
import LargeButton from "../components/largebutton"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'

export default ({ data }) => {
  return (
    <Layout>
      <LargeButton icon={<FontAwesomeIcon icon={faBook} />} title="Explore content" link="menu" />
      <PageTitle>Recently Updated</PageTitle>
      <TextBlock>
        <b>Most recent changes, need to check with Phil to see if there's actually content for this</b>
      </TextBlock>
      <TabList elements={data.allMarkdownRemark.edges} />
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
