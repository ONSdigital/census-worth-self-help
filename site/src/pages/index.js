import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import TabList from "../components/tablist"
import { BookmarkManager } from "../utils/bookmarkManager"
import BlockStatus from "../components/blockstatus"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookmark } from "@fortawesome/free-solid-svg-icons"

export default ({ data }) => {
  let alertText =
    data.markdownRemark && data.markdownRemark.frontmatter.alert_content

  const topArticleCount = 3

  let mostRecentEdges,
    bookmarkEdges = []

  if (data.allMarkdownRemark) {
    mostRecentEdges = data.allMarkdownRemark.edges.slice(0, topArticleCount)

    let bookmarkManager = new BookmarkManager()
    let bookmarkTitles = bookmarkManager
      .getTopBookmarks()
      .slice(0, topArticleCount)

    bookmarkEdges = bookmarkTitles.map(title =>
      data.allMarkdownRemark.edges.find(
        edge => edge.node.frontmatter.title === title
      )
    )
  }

  return (
    <Layout
      logo={true}
      phone_link={false}
      explore_more_link={true}
      alert={alertText}
    >
      {data.allMarkdownRemark && (
        <TabList
          title="RECENTLY UPDATED"
          link="/mostrecent"
          elements={mostRecentEdges}
        />
      )}
      {bookmarkEdges.length > 0 && (
        <TabList
          title="MY BOOKMARKS"
          link="/bookmarks"
          elements={bookmarkEdges}
        />
      )}
      {bookmarkEdges.length === 0 && (
        <div>
          <TabList title="MY BOOKMARKS" elements={[]} />
          <BlockStatus
            icon={<FontAwesomeIcon icon={faBookmark} />}
            title="Bookmarks will show here"
            subtitle="Bookmarks are stored on your device"
          />
        </div>
      )}
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
