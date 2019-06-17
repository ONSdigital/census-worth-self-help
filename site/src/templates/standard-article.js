import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PageTitle from "../components/pagetitle"
import Breadcrumbs from "../components/breadcrumbs"
import TextBlock from "../components/textblock"
import BlockButton from "../components/blockbutton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookmark } from "@fortawesome/free-regular-svg-icons"

import BookmarkManager from "../utils/bookmarkManager"
import { spacing } from "../utils/styles"
import LargeButton from "../components/largebutton"
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons"
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons"
import Section from "../components/section"
import TabList from "../components/tablist"

import { css } from "@emotion/core"
const moment = require("moment")

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

    let otherPeers = pageContext.peers.filter(
      peer => peer.title !== pageContext.title
    )

    let peerEdges = otherPeers
      .map(peer => {
        return data.allMarkdownRemark.edges.find(
          edge => edge.node.frontmatter.title === peer.title
        )
      })
      .filter(peer => peer !== undefined)

    return (
      <Layout>
        <Breadcrumbs
          breadcrumbs={pageContext.breadcrumbs}
          peers={pageContext.peers}
          thisPage={pageContext.title}
        />
        <div
          css={css`
            background-color: white;
          `}
        >
          <PageTitle
            subtitle={
              <span>
                Last updated:
                <i>{" " + moment(post.frontmatter.date).fromNow()}</i>
              </span>
            }
          >
            {pageContext.title}
          </PageTitle>

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

          <div
            css={css`
              margin-top: 20px;
            `}
          >
            <TextBlock>
              <div className="Article-sub-title-Style">
                {post.frontmatter.description}
              </div>
              <div className="article-content" dangerouslySetInnerHTML={{ __html: post.html }} />
            </TextBlock>
          </div>

          <Section>
            <div
              className="Section-heading-Style"
              css={css`
                display: flex;
                ${spacing.standard_vertical}
                ${spacing.in_page_element}
              `}
            >
              HOW WOULD YOU RATE THIS CONTENT?
            </div>

            <div
              css={css`
                display: flex;
              `}
            >
              <LargeButton
                additionalCss={css`
                  flex: 1;
                  margin-right: 5px;
                `}
                icon={<FontAwesomeIcon icon={faThumbsUp} />}
                title="Useful"
              />
              <LargeButton
                additionalCss={css`
                  flex: 1;
                  margin-left: 5px;
                `}
                icon={<FontAwesomeIcon icon={faThumbsDown} />}
                title="Not useful"
              />
            </div>
          </Section>
        </div>
        {peerEdges.length > 0 && (
          <div>
            <Section>
              <TabList title="ALSO IN THIS TOPIC" elements={peerEdges} />
            </Section>
          </div>
        )}
      </Layout>
    )
  }
}

export const query = graphql`
  query($title: String!) {
    markdownRemark(frontmatter: { title: { eq: $title } }) {
      html
      ...BaseArticleFields
    }

    allMarkdownRemark(filter: { fields: { collection: { eq: "articles" } } }) {
      edges {
        node {
          html
          ...BaseArticleFields
        }
      }
    }
  }
`
