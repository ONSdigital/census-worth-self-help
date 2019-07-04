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
import { getSuggestedEdges } from "./search"

export default ({ data }) => {
  let suggestedEdges = getSuggestedEdges(data.allMarkdownRemark.edges)

  let waitingTime = data.markdownRemark
    ? data.markdownRemark.frontmatter.contact_centre_wait_time
    : 15
  let phoneNumber = data.markdownRemark
    ? data.markdownRemark.frontmatter.contact_centre_number
    : "01234 56789"

  return (
    <Layout>
      <PageTitle>Census Field Support</PageTitle>
      <TextBlock>
        We are available to help you with any queries that have not been
        resolved by the Self help Facility. Lines are open 8am to 5pm on
        weekdays.
      </TextBlock>
      {suggestedEdges.length > 0 && (
        <TabList title="HAVE YOU TRIED..." elements={suggestedEdges} />
      )}
      <TabList title="CONTACTING FIELD SUPPORT" elements={[]} />
      <BlockStatus
        icon={<FontAwesomeIcon icon={faClock} />}
        data-testid="contact-centre-time-message"
        title={waitingTime + " minutes"}
        subtitle="Current waiting time"
      />
      <Section>
        <a href={"tel:" + phoneNumber}>
          <BlockButton
            icon={<FontAwesomeIcon icon={faPhone} />}
            title="Call Census field support"
            subtitle={phoneNumber}
          />
        </a>
      </Section>
    </Layout>
  )
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
