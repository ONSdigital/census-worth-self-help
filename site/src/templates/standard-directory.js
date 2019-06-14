import React from "react"
import Layout from "../components/layout"
import PageTitle from "../components/pagetitle"
import Breadcrumbs from "../components/breadcrumbs"
import TabList from "../components/tablist"

export default ({ pageContext }) => {
  return (
    <Layout>
      {pageContext.breadcrumbs.length > 0 &&
        <Breadcrumbs
          breadcrumbs={pageContext.breadcrumbs}
          peers={pageContext.peers}
          thisPage={pageContext.title}
        />
      }
      <PageTitle>{pageContext.title}</PageTitle>
      <TabList elements={pageContext.children} title="IN THIS SECTION:" />
    </Layout>
  )
}
