import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PageTitle from "../components/pagetitle"
import TextBlock from "../components/textblock"
import TabList from "../components/tablist"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPhone } from "@fortawesome/free-solid-svg-icons"

import BlockButton from "../components/blockbutton"
import Section from "../components/section"

// remove spaces as they do not work in uri format
export const sanitizePhoneNumber = number => number.replace(/\s/g, "")

export const getSuggestedEdges = edges => {
  return edges
    .filter(edge => {
      return (
        edge.node.frontmatter.tags &&
        edge.node.frontmatter.tags.includes("popular")
      )
    })
    .slice(0, 3)
}

export default ({ data }) => {
  let suggestedEdges = getSuggestedEdges(data.allMarkdownRemark.edges)

  let phoneNumber = "01234 56789"
  let contactCentreText = `We are available to help you with any queries that have not been resolved by the Self help Facility. Lines are open 9am to 5pm on weekdays.`

  if (data.markdownRemark) {
    phoneNumber = data.markdownRemark.frontmatter.contact_centre_number
    contactCentreText = data.markdownRemark.frontmatter.contact_centre_text
  }

  return (
    <Layout>
      <PageTitle>Census Field Support</PageTitle>

      <TextBlock>
        {contactCentreText}
      </TextBlock>
      {suggestedEdges.length > 0 && (
        <TabList title="HAVE YOU TRIED..." elements={suggestedEdges} />
      )}
      <Section>
        <a href={"tel:" + sanitizePhoneNumber(phoneNumber)}>
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
        contact_centre_number
        contact_centre_text
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
