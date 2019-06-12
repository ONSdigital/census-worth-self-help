import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PageTitle from "../components/pagetitle"
import TextBlock from "../components/textblock"
import TabList from "../components/tablist"
import {BookmarkManager} from "../utils/bookmarkManager"
import BlockStatus from "../components/blockstatus"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookmark } from "@fortawesome/free-solid-svg-icons"

export default ({ data }) => {

  let bookmarkManager = new BookmarkManager()
  let bookmarkTitles = bookmarkManager.getTopBookmarks()
  let bookmarkEdges = bookmarkTitles.map(title => data.allMarkdownRemark.edges.find(edge => edge.node.frontmatter.title===title))

  return (
    <Layout explore_more_link={true}>
      <PageTitle>My Bookmarks</PageTitle>
      <TextBlock>
        <b>
          Bookmarks, need to check with Phil to see if there's
          actually content for this
        </b>
      </TextBlock>
      { bookmarkEdges.length > 0 && <TabList elements={bookmarkEdges} /> }
      { bookmarkEdges.length === 0 && 
        <BlockStatus 
          icon={<FontAwesomeIcon icon={faBookmark} />}
          title="Bookmarks will show here"
          subtitle="Bookmarks are stored on your device" 
        />
      }
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
