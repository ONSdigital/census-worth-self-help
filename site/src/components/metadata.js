import React from "react"
import { Helmet } from "react-helmet"
import Children from "react-children-utilities"
import analytics from "../utils/analytics"

export default ({ children, pageType = "other"}) => {
  let title = Children.onlyText(children)
    ? Children.onlyText(children)
    : "Self Help Facility"
  analytics.setPageType(pageType)
  return (
    <Helmet htmlAttributes={{ lang: "en" }}>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content="Self help facility for ONS census" />
    </Helmet>
  )
}
