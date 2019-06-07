import React from "react"
import renderer from "react-test-renderer"

import LargeButton from "../largebutton"

describe("Large Button", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<LargeButton title="press me" link="anywhere"/>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})