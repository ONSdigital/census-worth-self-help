import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import TabList from "../components/tablist"
import BookmarkManager from "../utils/bookmarkManager"
import { LastVisitManager } from "../utils/time"
import BlockStatus from "../components/blockstatus"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSatelliteDish } from "@fortawesome/free-solid-svg-icons"
import { faBookmark, faClock } from "@fortawesome/free-regular-svg-icons"
import { css } from "@emotion/core"
import DetectOffline from "../components/detectoffline"
import Metadata from "../components/metadata"

export default class Index extends React.Component {
  constructor({ props }) {
    super(props)
    this.LastVisitManager = new LastVisitManager()
    this.props = props
  }

  componentWillMount() {
    this.LastVisitManager.updateVisitTime()
  }

  render() {
    let { data } = this.props
    let alertTitle = "Alert"
    let alertText = ""
    if (data.markdownRemark) {
      if (data.markdownRemark.frontmatter.alert_title) {
        alertTitle = data.markdownRemark.frontmatter.alert_title
      }
      alertText = data.markdownRemark.frontmatter.alert_content
    }

    const topArticleCount = 3

    let mostRecentEdges,
      bookmarkEdges = []

    if (data.allMarkdownRemark) {
      mostRecentEdges = this.LastVisitManager.getEdgesChangedSinceLastVist(
        data.allMarkdownRemark.edges
      ).slice(0, topArticleCount)

      let bookmarkManager = new BookmarkManager()
      let bookmarkTitles = bookmarkManager.getTopBookmarks()

      bookmarkEdges = bookmarkTitles
        .map(title =>
          data.allMarkdownRemark.edges.find(
            edge => edge.node.frontmatter.title === title
          )
        )
        .filter(edge => edge)
        .slice(0, topArticleCount)
      bookmarkManager.addBookmarkClickEventToEdges(bookmarkEdges)
    }

    return (
      <Layout
        logo={true}
        phone_link={false}
        explore_more_link={true}
        alertText={alertText}
        alertTitle={alertTitle}
      >
        <Metadata>Self Help Facility</Metadata>
        <DetectOffline showWhen="offline">
          <BlockStatus
            icon={<FontAwesomeIcon icon={faSatelliteDish} />}
            title="Currently working offline"
            subtitle="Content will update when you reconnect"
          />
        </DetectOffline>
        {data.allMarkdownRemark && (
          <div>
            <TabList
              title="RECENTLY UPDATED"
              link="/mostrecent/"
              elements={mostRecentEdges}
            />
            {mostRecentEdges.length === 0 && (
              <BlockStatus
                icon={<FontAwesomeIcon icon={faClock} />}
                data-testid="index-empty-recent-message"
                title="No updates since your last visit"
                subtitle="You can still view a list of all updates"
              />
            )}
          </div>
        )}
        <div
          css={css`
            margin-bottom: 45px;
          `}
        >
          {bookmarkEdges.length > 0 && (
            <div>
              <TabList
                title="MY BOOKMARKS"
                link="/bookmarks/"
                elements={bookmarkEdges}
              />
            </div>
          )}
          {bookmarkEdges.length === 0 && (
            <div>
              <TabList title="MY BOOKMARKS" elements={[]} />
              <BlockStatus
                icon={<FontAwesomeIcon icon={faBookmark} />}
                data-testid="index-empty-bookmarks-message"
                title="Bookmarks will show here"
                subtitle="Bookmarks are stored on your device"
              />
            </div>
          )}
        </div>
      </Layout>
    )
  }
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
      tags
    }
  }

  query {
    markdownRemark(frontmatter: { alert_content: { ne: null } }) {
      frontmatter {
        alert_content
        alert_title
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
