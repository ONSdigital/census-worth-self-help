import React from "react"
import renderer from "react-test-renderer"

import StandardDirectory from "../standard-directory"

import { articleList } from "../../utils/testdata"

describe("StandardArticle", () => {
  process.env.GATSBY_SITE_BANNER_COLOUR = "rgb(144, 32, 130)"

  const pageContext = {
    breadcrumbs: [{ title: "root", link: "explore" }],
    peers: [],
    description: "test description",
    children: articleList.edges,
    title: "test Directory 1"
  }

  it("renders correctly", () => {
    const tree = renderer
      .create(<StandardDirectory pageContext={pageContext} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
