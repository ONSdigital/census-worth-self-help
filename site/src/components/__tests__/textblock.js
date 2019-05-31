import React from "react"
import renderer from "react-test-renderer"

import TextBlock from "../textblock"

describe("TextBlock", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<TextBlock>Text block content</TextBlock>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})