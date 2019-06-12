import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PageTitle from "../components/pagetitle"
import Breadcrumbs from "../components/breadcrumbs"
import TextBlock from "../components/textblock"
import BlockButton from "../components/blockbutton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookmark } from "@fortawesome/free-regular-svg-icons"

import { BookmarkManager } from "../utils/bookmarkManager"

export default class Article extends React.Component {
  constructor(props) {
    super(props)
    this.props = props

    // create state with bookmarked
    this.bookmarkPage = this.bookmarkPage.bind(this)
    this.unBookmarkPage = this.unBookmarkPage.bind(this)

    this.bookmarkManager = new BookmarkManager()
    this.state = {
      bookmarked: this.bookmarkManager.isPageBookmarked(
        this.props.pageContext.title
      )
    }
  }

  bookmarkPage() {
    this.bookmarkManager.bookmarkPage(this.props.pageContext.title)
    this.setState({
      bookmarked: true
    })
  }

  unBookmarkPage() {
    this.bookmarkManager.unBookmarkPage(this.props.pageContext.title)
    this.setState({
      bookmarked: false
    })
  }

  render() {
    let { data, pageContext } = this.props
    const post = data.markdownRemark
    let bookmarked = this.state.bookmarked

    return (
      <Layout>
        <Breadcrumbs
          breadcrumbs={pageContext.breadcrumbs}
          peers={pageContext.peers}
        />
        <PageTitle>{pageContext.title}</PageTitle>

        {!bookmarked && (
          <BlockButton
            icon={<FontAwesomeIcon icon={faBookmark} />}
            title="Bookmark this page"
            subtitle="Save it to view later"
            clickFunction={this.bookmarkPage}
          />
        )}
        {bookmarked && (
          <BlockButton
            icon={<FontAwesomeIcon icon={faBookmark} />}
            title="Bookmarked"
            subtitle="Click here to remove"
            clickFunction={this.unBookmarkPage}
          />
        )}
        <TextBlock>
          <b>{post.frontmatter.description}</b>
        </TextBlock>
        <TextBlock>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </TextBlock>
      </Layout>
    )
  }
}

export const query = graphql`
  query($title: String!) {
    markdownRemark(frontmatter: { title: { eq: $title } }) {
      html
      frontmatter {
        title
        description
      }
    }
  }
`
