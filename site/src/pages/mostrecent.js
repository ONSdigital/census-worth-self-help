import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PageTitle from "../components/pagetitle"
import TextBlock from "../components/textblock"
import BlockStatus from "../components/blockstatus"
import TabList from "../components/tablist"
import { PaginationObject } from "../utils/pagination"
import PaginationBar from "../components/paginationbar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock } from "@fortawesome/free-solid-svg-icons"
import { faClock as faClockRegular } from "@fortawesome/free-regular-svg-icons"
import { LastVisitManager } from "../utils/time"
export default class MostRecent extends React.Component {
  constructor(props) {
    super(props)
    this.clientRendered = false;
    this.LastVisitManager = new LastVisitManager()
    let paginator = new PaginationObject()
    this.state = {
      paginator: paginator
    }
    this.data = props.data
    this.updatePagination = this.updatePagination.bind(this)
  }
  componentWillMount() {
    this.LastVisitManager.updateVisitTime()
  }
  updatePagination(pageTarget) {
    this.state.paginator.goToPage(pageTarget)
    // update state to get page to rerender
    this.setState({
      paginator: this.state.paginator
    })
  }
  render() {
    let recentEdges = this.LastVisitManager.getEdgesChangedSinceLastVist(
      this.data.allMarkdownRemark.edges
    )
    let shouldShowNoChangesBlock = false;
    if (typeof window !== 'undefined') {   
      if (this.clientRendered === false) {
        this.clientRendered = true;
        setTimeout(() => this.forceUpdate(), 0)
      } else {
        shouldShowNoChangesBlock = !!this.LastVisitManager.lastVisitTime;
      }
    }
    if (recentEdges.length === 0) {
      // if no recent edges we will display a message and all the edges.
      recentEdges = this.data.allMarkdownRemark.edges
    }
    const paginatedEdges = this.state.paginator.filterResults(recentEdges)
    return (
      <Layout explore_more_link={true}>
        <PageTitle icon={<FontAwesomeIcon icon={faClock} />}>
          Recently Updated
        </PageTitle>
        <TextBlock>
          This list shows the most recently updated articles since the last time
          you visited the site.
        </TextBlock>
        {shouldShowNoChangesBlock && recentEdges.length === 0 && (
          <BlockStatus
            icon={<FontAwesomeIcon icon={faClockRegular} />}
            title="No updates since your last visit"
            subtitle="You can still view a list of all updates"
          />
        )}
        <TabList elements={paginatedEdges} />
        <PaginationBar
          total={recentEdges.length}
          paginator={this.state.paginator}
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