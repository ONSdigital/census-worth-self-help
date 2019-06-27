import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PageTitle from "../components/pagetitle"
import TextBlock from "../components/textblock"
import TabList from "../components/tablist"
import { PaginationObject } from "../utils/pagination"
import PaginationBar from "../components/paginationbar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock } from "@fortawesome/free-solid-svg-icons"

export default class MostRecent extends React.Component {
  constructor(props) {
    super(props)

    let paginationObject = new PaginationObject()
    this.state = {
      paginationObject: paginationObject
    }
    this.data = props.data
    this.updatePagination = this.updatePagination.bind(this)
  }

  updatePagination(pageTarget) {
    this.state.paginationObject.goToPage(pageTarget)
    // update state to get page to rerender
    this.setState({
      paginationObject: this.state.paginationObject
    })
  }

  render() {
    let paginatedEdges = this.state.paginationObject.filterResults(
      this.data.allMarkdownRemark.edges
    )

    return (
      <Layout explore_more_link={true}>
        <PageTitle icon={<FontAwesomeIcon icon={faClock} />} >Recently Updated</PageTitle>
        <TextBlock>
          Most recent changes, need to check with Phil to see if there's
          actually content for this
        </TextBlock>
        <TabList elements={paginatedEdges} />
        <PaginationBar
          total={this.data.allMarkdownRemark.edges.length}
          paginationObject={this.state.paginationObject}
          clickFunction={this.updatePagination}
          onPageCount={paginatedEdges.length}
        />
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
