import React from "react"
import { graphql } from "gatsby"
import { css } from "@emotion/core"
import Layout from "../components/layout"
import { Index } from "elasticlunr"
import TabList from "../components/tablist"
import PageTitle from "../components/pagetitle"
import PaginationBar from "../components/paginationbar"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { PaginationObject } from "../utils/pagination"

const escapeStringRegexp = require("escape-string-regexp")
const minimumSearchString = 3

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
    this.index = this.index
      ? this.index
      : Index.load(this.data.siteSearchIndex.index)

    // we use a weighted priority of the search strings, this should be calibrated based on user feedback
    this.index.search(query, {
      fields: {
        title: { boost: 4 },
        author: { boost: 4 },
        tags: { boost: 4 },
        description: { boost: 2 },
        body: { boost: 1 }
      }
    })
    this.setState({
      query,
      results: this.index
        .search(query, {})
        .map(({ ref }) => this.index.documentStore.getDoc(ref))
    })
  }

  /*
   Takes a string and a regex of the form /(bold1|bold2|bold3)/ig
   Creates a jsx renderable list of strings and bold elements  
  */
  static replacePatternToBold(text, pattern) {
    const splitText = text.split(pattern)
    const matches = text.match(pattern)
    if (splitText.length <= 1) {
      return text
    }

    return splitText.reduce((arr, element) => {
      if (!element) return arr
      if (matches.includes(element)) {
        return [...arr, <strong>{element}</strong>]
      }
      return [...arr, element]
    }, [])
  }

  static getTagsAsString(tags) {
    if (!tags) {
      return ""
    }
    if (Array.isArray(tags)) {
      tags = tags.join(", ")
    }
    return tags
  }

  static highlightNode(node, query) {
    // normalizes the string into a list of words (space seperated)
    let splitQuery = query
      .trim()
      .toLowerCase()
      .split(" ")
      .filter(str => str)

    // fetches all properties we wish to highlight in order of precedence
    let properties = [
      node.frontmatter.author,
      node.frontmatter.description,
      Search.getTagsAsString(node.frontmatter.tags),
      node.html
    ]

    // finds first property which includes a query word
    let highlightableText = properties.find(property => {
      if (!property) {
        return false
      }
      return splitQuery.find(queryWord =>
        property.toLowerCase().includes(queryWord)
      )
    })

    // if a property is found we bould the query words
    if (highlightableText !== undefined) {
      let pattern = new RegExp(
        "(" + splitQuery.map(x => escapeStringRegexp(x)).join("|") + ")",
        "ig"
      )
      highlightableText = Search.replacePatternToBold(
        highlightableText,
        pattern
      )
    } else {
      // otherwise default to description
      highlightableText = node.frontmatter.description
    }

    // we store the result in a new attribute, which articletab checks for.
    node.highlightedText = highlightableText
  }

  render() {
    // the search object is given to the top bar to control search
    let searchObject = {
      updateFunction: this.updateSearchResults,
      query: this.state.query
    }

    // fetch the data edges corresponding to the search results
    let edges = this.state.paginationObject
      .filterResults(this.state.results)
      .map(result => {
        let edge = this.data.allMarkdownRemark.edges.find(
          edge => edge.node.frontmatter.title === result.title
        )
        Search.highlightNode(edge.node, this.state.query)
        return edge
      })

    // A user doesn't count as searching unless they've typed a minimum amount
    let searching =
      this.state.query.length >= minimumSearchString || edges.length > 0

    return (
      <Layout title="Search" searchObject={searchObject}>
        <PageTitle>
          <FontAwesomeIcon
            icon={faSearch}
            css={css`
              padding: 5px;
            `}
          />
          {searching && edges.length > 0 && (
            <div>
              {this.state.results.length} results for "{this.state.query}"
            </div>
          )}
          {searching && edges.length === 0 && (
            <div>Sorry no results for "{this.state.query}"</div>
          )}
          {!searching && <div>Begin typing to search</div>}
        </PageTitle>
        <TabList elements={edges} />
        {this.state.results.length !== 0 && (
          <PaginationBar
            total={this.state.results.length}
            paginationObject={this.state.paginationObject}
            clickFunction={this.updatePagination}
            onPageCount={edges.length}
          />
        )}
      </Layout>
    )
  }
}

export const query = graphql`
  query {
    siteSearchIndex {
      index
    }

    allMarkdownRemark(filter: { fields: { collection: { eq: "articles" } } }) {
      totalCount
      edges {
        node {
          html
          ...BaseArticleFields
        }
      }
    }
  }
`
