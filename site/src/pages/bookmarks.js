import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PageTitle from "../components/pagetitle"
import TextBlock from "../components/textblock"
import TabList from "../components/tablist"
import BookmarkManager from "../utils/bookmarkManager"
import BlockStatus from "../components/blockstatus"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookmark } from "@fortawesome/free-regular-svg-icons"
import { faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons"

import { PaginationObject } from "../utils/pagination"
import PaginationBar from "../components/paginationbar"

export default class Bookmarks extends React.Component {
  constructor(props) {
    super(props)
    this.clientRendered = false;
    let paginator = new PaginationObject()
    this.state = {
      paginator: paginator
    }
    this.data = props.data
    this.updatePagination = this.updatePagination.bind(this)
  }

  updatePagination(pageTarget) {
    this.state.paginator.goToPage(pageTarget)
    // update state to get page to rerender
    this.setState({
      paginator: this.state.paginator
    })
  }

  render() {
    let bookmarkManager = new BookmarkManager()
    let bookmarkTitles = bookmarkManager.getTopBookmarks()
    let bookmarkEdges = bookmarkTitles
    let showBookmarkBlock = false;
    let paginatedBookmarkEdges = this.state.paginator.filterResults(
      bookmarkEdges
    )
    .map(title =>
      this.data.allMarkdownRemark.edges.find(
        edge => edge.node.frontmatter.title === title
      )
    )
    .filter(edge => edge)
    bookmarkManager.addBookmarkClickEventToEdges(paginatedBookmarkEdges)
      /*
        Force a re-render once to make sure the Bookmark block content is properly updadted with Client side data.
       */
      if (this.clientRendered === false) {
        this.clientRendered = true;
        setTimeout(() => this.forceUpdate(), 0)
      } else {
        showBookmarkBlock = true
      }

    return (
      <Layout explore_more_link={true}>
        <PageTitle icon={<FontAwesomeIcon icon={faBookmarkSolid} />}>
          My Bookmarks
        </PageTitle>
        <TextBlock>
          Bookmarks are links to articles, which will appear here for you to
          quickly find the article again. To remove a bookmark, tap on the
          bookmark button in the article. Bookmarks are stored on your device,
          and are linked to your account, so only you have access to them.
        </TextBlock>
        {showBookmarkBlock && paginatedBookmarkEdges.length > 0 && (
          <TabList elements={paginatedBookmarkEdges} />
        )}
        {showBookmarkBlock && paginatedBookmarkEdges.length > 0 && (
          <PaginationBar
            total={bookmarkEdges.length}
            paginator={this.state.paginator}
            clickFunction={this.updatePagination}
            onPageCount={paginatedBookmarkEdges.length}
          />
        )}
        {showBookmarkBlock && paginatedBookmarkEdges.length === 0 && (
          <BlockStatus
            icon={<FontAwesomeIcon icon={faBookmark} />}
            title="Bookmarks will show here"
            subtitle="Bookmarks are stored on your device"
          />
        )}
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
