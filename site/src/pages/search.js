import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { Index } from "elasticlunr"
import TabList from "../components/tablist"
import PageTitle from "../components/pagetitle"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ``,
      results: [],
      finished: false
    }
    this.data = props.data
    this.updateSearchResults = this.updateSearchResults.bind(this)
    this.finishedSearching = this.finishedSearching.bind(this)
    this.startSearching = this.startSearching.bind(this)
  }

  componentWillMount() {}

  finishedSearching() {
    this.setState({
      finished : true})
  }

  startSearching(e) {
    e.preventDefault();
    console.log("clicked")
    this.setState({
      finished : false})
  }

  updateSearchResults(evt) {
    const query = evt.target.value
    this.index = this.index ? this.index : Index.load(this.data.siteSearchIndex.index)
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
      open: !this.state.finished,
      updateFunction: this.updateSearchResults,
      query: this.state.query,
      finishedFunction: this.finishedSearching,
      startFunction: this.startSearching
    }
    let edges = this.state.results.map( result => {
      return this.data.allMarkdownRemark.edges.find( edge => edge.node.frontmatter.title === result.title )
    })

    let searching = this.state.query.length >= 4 // todo: figure out how this is actually calculated

    return (
      <Layout title="Search" searchObject={searchObject} explore_more_link={this.state.finished}>
        { searching && 
          <div>
            { edges.length > 0 && <PageTitle><FontAwesomeIcon icon={faSearch} /> {edges.length} results for "{this.state.query}"</PageTitle> }
            { edges.length===0 && <PageTitle><FontAwesomeIcon icon={faSearch} /> Sorry no results for "{this.state.query}"</PageTitle> }
          </div>
        }
        <TabList elements={edges} />
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