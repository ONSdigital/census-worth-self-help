import React from "react"
import renderer from "react-test-renderer"

import PageTitle from "../pagetitle"

describe("PageTitle", () => {
  beforeEach(() => {
    window._paq = []
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(<PageTitle>This is a title</PageTitle>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})