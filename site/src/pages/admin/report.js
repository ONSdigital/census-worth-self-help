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
      role: "",
      title: ""
    }
    this.updateReportTitle = this.updateReportTitle.bind(this)
    this.updateReportRole = this.updateReportRole.bind(this)
  }

  updateReportTitle(event) {
    this.setState({
      title : event.target.value.toLowerCase()
    })
  }

  updateReportRole(event) {
    this.setState({
      role : event.target.value
    })
  }

  render() {
    const items = this.data.allItems.edges
      .filter(({ node }) => {
        if (this.state.title) {
          if (!node.frontmatter.title.toLowerCase().includes(this.state.title)) {
            return false
          }
        }
        if (this.state.role) {
          if (node.frontmatter.role !== this.state.role) {
            return false
          }
        }
        return true
      })
      .map(({ node }) => (
      <ReportItem
          key={node.fields.collection + "/" + node.fields.pagename}
          node={node}/>
    ))

    const roles = this.data.allRoles.edges.map(({ node }) => (
      <option>{node.frontmatter.title}</option>
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
          onChange={this.updateReportTitle}
        />
        <select
          id="report-role"
          data-testid="report-role"
          value={this.state.role}
          onChange={this.updateReportRole}
          >
          <option/>
          {roles}
        </select>
        <input
          type="checkbox"
          name="cconly"
          value={this.state.cconly}/> cc only
        {items}
      </Layout>
    )
  }
}

export const query = graphql`
  query {
    allItems: allMarkdownRemark(
      sort: { fields: frontmatter___title }
      filter: { fields: { collection: { eq: "articles" } } }
    ) {
      totalCount
      edges {
        node {
          ...BaseArticleFields
        }
      }
    }
    allRoles: allMarkdownRemark(
      sort: { fields: frontmatter___title }
      filter: { fields: { collection: { eq: "role" } } }
    ) {
      edges {
        node {
          frontmatter {
            title
          }
        }
      }
    }    
  }
`
