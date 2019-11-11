import React from "react"
import { Helmet } from "react-helmet"
import Children from "react-children-utilities"

export default ({ children }) => {
  let title = Children.onlyText(children)
    ? Children.onlyText(children)
    : "Self Help Facility"
  return (
    <Helmet htmlAttributes={{ lang: "en" }}>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content="Self help facility for ONS census" />
    </Helmet>
  )
}
