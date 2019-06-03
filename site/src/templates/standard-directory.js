import React from "react"
import Layout from "../components/layout"
import PageTitle from "../components/pagetitle"
import Breadcrumbs from "../components/breadcrumbs"
import TabList from "../components/tablist"
import { css } from "@emotion/core"
import { spacing } from "../utils/styles"

export default ({ pageContext }) => {
  return (
    <Layout>
      <Breadcrumbs
        breadcrumbs={pageContext.breadcrumbs}
        peers={pageContext.peers}
      />
      <PageTitle>{pageContext.title}</PageTitle>
      <div
        css={css`
          ${spacing.in_page_element}
        `}
      >
        IN THIS SECTION:
      </div>
      <TabList elements={pageContext.children} />
    </Layout>
  )
}
