import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PageTitle from "../components/pagetitle"
import TextBlock from "../components/textblock"
import TabList from "../components/tablist"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock } from "@fortawesome/free-regular-svg-icons"
import { faPhone } from "@fortawesome/free-solid-svg-icons"

import BlockStatus from "../components/blockstatus"
import BlockButton from "../components/blockbutton"
import Section from "../components/section"

export default class CallCentre extends React.Component {
  constructor(props) {
    super(props)
    this.suggestedEdges = CallCentre.getSuggestedEdges(props.data.allMarkdownRemark.edges)
    this.waitingTime = props.data.markdownRemark ? props.data.markdownRemark.frontmatter.contact_centre_wait_time : 15
    this.phoneNumber = props.data.markdownRemark ? props.data.markdownRemark.frontmatter.contact_centre_number : "01234 56789"

  }

  static getSuggestedEdges(edges) {
    return edges
      .filter(edge => {
        return (
          edge.node.frontmatter.tags &&
          edge.node.frontmatter.tags.includes("popular")
        )
      })
      .slice(0, 3)
  }

  render() {
    return (
      <Layout>
        <PageTitle>
          Census Field Support
        </PageTitle>
        <TextBlock>
          Most recent changes, need to check with Phil to see if there's
          actually content for this
        </TextBlock>
        {this.suggestedEdges.length > 0 && (
          <TabList title="HAVE YOU TRIED..." elements={this.suggestedEdges} />
        )}
        <TabList title="CONTACTING FIELD SUPPORT" elements={[]} />
        <BlockStatus
          icon={<FontAwesomeIcon icon={faClock} />}
          data-testid="contact-centre-time-message"
          title={this.waitingTime + " minutes"}
          subtitle="Current waiting time"
        />
        <Section>
          <a href={"tel:" + this.phoneNumber}>
            <BlockButton
              icon={<FontAwesomeIcon icon={faPhone} />}
              title="Call Census field support"
              subtitle={this.phoneNumber}
            />
          </a>
        </Section>
      </Layout>
    )
  }
}

export const query = graphql`
  query {
    markdownRemark(frontmatter: { contact_centre_wait_time: { ne: null } }) {
      frontmatter {
        contact_centre_wait_time
        contact_centre_number
      }
    }

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
