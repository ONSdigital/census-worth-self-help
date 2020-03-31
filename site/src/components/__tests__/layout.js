import React from "react"
import renderer from "react-test-renderer"

import Layout from "../layout"

describe("Layout", () => {
  process.env.GATSBY_SITE_BANNER_COLOUR = "rgb(144, 32, 130)"

  it("renders correctly", () => {
    const tree = renderer
      .create(<Layout>Inside layout content</Layout>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
