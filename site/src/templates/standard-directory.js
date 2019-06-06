import React from "react"
import Layout from "../components/layout"
import PageTitle from "../components/pagetitle"
import Breadcrumbs from "../components/breadcrumbs"
import TabList from "../components/tablist"

export default ({ pageContext }) => {
  return (
    <Layout>
      <Breadcrumbs
        breadcrumbs={pageContext.breadcrumbs}
        peers={pageContext.peers}
      />
      <PageTitle>{pageContext.title}</PageTitle>
      <TabList elements={pageContext.children} title="IN THIS SECTION:" />
    </Layout>
  )
}
