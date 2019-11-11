import React from "react"
import Layout from "../components/layout"
import PageTitle from "../components/pagetitle"
import Breadcrumbs from "../components/breadcrumbs"
import TabList from "../components/tablist"
import TextBlock from "../components/textblock"

export default ({ pageContext }) => {
  return (
    <Layout>
      {pageContext.breadcrumbs.length > 0 && (
        <Breadcrumbs
          breadcrumbs={pageContext.breadcrumbs}
          peers={pageContext.peers}
          thisPage={pageContext.title}
        />
      )}
      <PageTitle pageType="directory">{pageContext.title}</PageTitle>
      {pageContext.description && (
        <TextBlock>
          <div className="Article-sub-title-Style">
            {pageContext.description}
          </div>
        </TextBlock>
      )}
      <TabList elements={pageContext.children} title="IN THIS SECTION:" />
    </Layout>
  )
}
