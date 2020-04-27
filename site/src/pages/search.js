import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { Index } from "elasticlunr"
import TabList from "../components/tablist"
import PageTitle from "../components/pagetitle"
import PaginationBar from "../components/paginationbar"
import { PaginationObject } from "../utils/pagination"
import debounce from "../utils/debounce"
import searchAnalytics from "../utils/searchAnalytics"
import QuerySanitizer from "../utils/querysanitizer"
import spellingCorrectionMap from "../utils/commonMisspellings.json"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

const localForage = require("localforage")
const escapeStringRegexp = require("escape-string-regexp")
const minimumSearchString = 3

export default class Search extends React.Component {
  constructor(props) {
    super(props)

    let paginator = new PaginationObject()
    this.state = {
      query: ``,
      sanitizedQuery: ``,
      results: [],
      paginator: paginator
    }
    this.data = props.data
    this.trackSiteSearch = debounce(
      searchAnalytics.trackSiteSearch,
      props.debounceDelay
    )
    this.updateSearchResultsCallback = this.updateSearchResultsCallback.bind(this)
    this.updatePagination = this.updatePagination.bind(this)

    this.querySanitizer = new QuerySanitizer(spellingCorrectionMap)
  }

  updatePagination(pageTarget) {
    this.state.paginator.goToPage(pageTarget)
    // update state to get page to rerender
    this.setState({
      paginator: this.state.paginator
    })
  }

  getSearchIndex() {
    // Lazy-load the index data
    if (!this.index) {
      this.index = Index.load(this.data.siteSearchIndex.index)
    }
    return this.index
  }

  updateIndexedSearchValue(query) {
    localForage.setItem("searchQuery", query, err => {})
  }

  getIndexedSearchValue(callback) {
    return localForage.getItem("searchQuery", callback)
  }

  componentDidMount() {
    this.getIndexedSearchValue((value) => {
      if(value) this.updateSearchResultsCallback({ target: { value: value } })
    })
  }

  updateSearchResultsCallback(evt) {
    this.state.paginator.goToPage(0)

    const rawQuery = evt.target.value

    this.updateIndexedSearchValue(rawQuery)
    const sanitizedQuery = this.querySanitizer.sanitize(rawQuery)

    const index = this.getSearchIndex()

    // we use a weighted priority of the search strings, this should be calibrated based on user feedback
    const results = index
      .search(sanitizedQuery, {
        fields: {
          tags: { boost: 5 },
          title: { boost: 4 },
          description: { boost: 3 },
          roles: { boost: 2 },
          body: { boost: 1 }
        },
        expand: true // partial mapping
      })
      .map(({ ref }) => index.documentStore.getDoc(ref))

    this.trackSiteSearch(rawQuery, false, results.length)

    this.setState({
      query: rawQuery,
      sanitizedQuery: sanitizedQuery,
      results
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

  static stripHTML(html) {
    var doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent || ""
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
      node.frontmatter.description,
      Search.getTagsAsString(node.frontmatter.tags),
      Search.stripHTML(node.html)
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
      updateFunction: this.updateSearchResultsCallback,
      query: this.state.query
    }

    // fetch the data edges corresponding to the search results
    let edges = this.state.paginator
      .filterResults(this.state.results)
      .map(result => {
        let edge = this.data.allMarkdownRemark.edges.find(
          edge => edge.node.frontmatter.title === result.title
        )
        if (edge) {
          Search.highlightNode(edge.node, this.state.sanitizedQuery)
        }
        return edge
      })
      .filter(edge => edge)

    // A user doesn't count as searching unless they've typed a minimum amount
    let searching =
      this.state.query.length >= minimumSearchString || edges.length > 0

    let noResults = searching && edges.length === 0

    return (
      <Layout title="Search" searchObject={searchObject}>
        <PageTitle icon={<FontAwesomeIcon icon={faSearch} />}>
          {searching && edges.length > 0 && (
            <div>
              {this.state.results.length} results for "{this.state.query}"
            </div>
          )}
          {noResults && <div>Sorry, no results for "{this.state.query}"</div>}
          {!searching && <div>Begin typing to search</div>}
        </PageTitle>
        <TabList elements={edges} />
        {this.state.results.length !== 0 && (
          <PaginationBar
            total={this.state.results.length}
            paginator={this.state.paginator}
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
      edges {
        node {
          html
          ...BaseArticleFields
        }
      }
    }
  }
`
