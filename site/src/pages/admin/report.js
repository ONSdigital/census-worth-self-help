import React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/admin/layout"
import PageTitle from "../../components/pagetitle"
import TextBlock from "../../components/textblock"
import ReportItem from "../../components/admin/reportItem"

export default class Report extends React.Component {
  constructor(props) {
    super(props)
    this.data = props.data
    this.state = {
      title: ""
    }
    this.updateReport = this.updateReport.bind(this)
  }

  updateReport(event) {
    this.setState({
      title : event.target.value
    })
  }

  render() {
    const items = this.data.allMarkdownRemark.edges
      .filter(({ node }) => {
        if (this.state.title) {
          if (node.frontmatter) {
            if (!node.frontmatter.title.includes(this.state.title)) {
              return false
            }
          }
        }
        return true
      })
      .map(({ node }) => (
      <ReportItem
          key={node.fields.collection + "/" + node.fields.pagename}
          node={node}/>
    ))

    return (
      <Layout>
        <PageTitle>
          Report
        </PageTitle>
        <TextBlock>
          CMS content report
        </TextBlock>
        <input
          id="report-title"
          data-testid="report-title"
          maxLength="20"
          type="text"
          value={this.state.title}
          onChange={this.updateReport}
          autoFocus
        />
        {items}
      </Layout>
    )
  }
}

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: frontmatter___title }
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
