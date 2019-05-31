import React from "react"
import renderer from "react-test-renderer"

import ArticleTab from "../articletab"

describe("ArticleTab", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<ArticleTab title="article title" link="location" />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})