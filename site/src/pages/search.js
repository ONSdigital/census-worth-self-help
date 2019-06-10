import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { Index } from "elasticlunr"
import TabList from "../components/tablist"
import PageTitle from "../components/pagetitle"
import PaginationBar from "../components/paginationbar"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { PaginationObject } from "../utils/pagination"

export default class Search extends React.Component {
  constructor(props) {
    super(props)

    let paginationObject = new PaginationObject()
    this.state = {
      query: ``,
      results: [],
      paginationObject: paginationObject
    }
    this.data = props.data
    this.updateSearchResults = this.updateSearchResults.bind(this)
    this.updatePagination = this.updatePagination.bind(this)
  }

  componentWillMount() {}

  updatePagination(pageTarget) {
    this.state.paginationObject.goToPage(pageTarget)
    // update state to get page to rerender
    this.setState({
      paginationObject: this.state.paginationObject
    })
  }

  updateSearchResults(evt) {
    this.state.paginationObject.goToPage(0)

    const query = evt.target.value
    this.index = this.index ? this.index : Index.load(this.data.siteSearchIndex.index)
    this.index.search(query, {
      fields: {
          title: {boost: 4},
          author: {boost: 4},
          tags: {boost: 4},
          description: {boost: 2},
          body: {boost: 1}
      }
    })
    this.setState({
      query,
      // Query the index with search string to get an [] of IDs
      results: this.index
        .search(query, {})
        // Map over each ID and return the full document
        .map(({ ref }) => this.index.documentStore.getDoc(ref)),
    })
  }

  render() {
    let searchObject = {
      updateFunction: this.updateSearchResults,
      query: this.state.query,
    }

    let edges = this.state.paginationObject.filterResults( this.state.results ).map( result => {
      return this.data.allMarkdownRemark.edges.find( edge => edge.node.frontmatter.title === result.title )
    })

    let searching = this.state.query.length >= 4 // todo: figure out how this is actually calculated

    return (
      <Layout title="Search" searchObject={searchObject}>
          <div>
            { searching && edges.length > 0 && <PageTitle><FontAwesomeIcon icon={faSearch} /> {this.state.results.length} results for "{this.state.query}"</PageTitle> }
            { searching && edges.length===0 && <PageTitle><FontAwesomeIcon icon={faSearch} /> Sorry no results for "{this.state.query}"</PageTitle> }
            { !searching && <PageTitle><FontAwesomeIcon icon={faSearch} /> Begin typing to search</PageTitle> }
          </div>
        <TabList elements={edges} />
        { this.state.results.length !== 0 && 
          <PaginationBar total={this.state.results.length} paginationObject={this.state.paginationObject} clickFunction={this.updatePagination} onPageCount={edges.length} />
        }
      </Layout>
    )
  }
}

export const query = graphql`
  query {
    siteSearchIndex {
      index
    }

    allMarkdownRemark(
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