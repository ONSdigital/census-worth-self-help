import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import { Index } from "elasticlunr"

export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ``,
      results: [],
    }
    this.data = props.data
    this.updateSearchResults = this.updateSearchResults.bind(this)
  }

  componentWillMount() {}

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
      open: true,
      updateFunction: this.updateSearchResults,
      query: this.state.query
    }
    return (
      <Layout title="Search" searchObject={searchObject}>
        <ul>
          {this.state.results.map(page => (
            <li key={page.id}>
              <Link to={"/" + page.title}>{page.title}</Link>
            </li>
          ))}
        </ul>
      </Layout>
    )
  }
}



export const query = graphql`
  query SearchIndexQuery {
    siteSearchIndex {
      index
    }
  }
`