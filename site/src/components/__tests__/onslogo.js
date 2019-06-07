import React from "react"
import renderer from "react-test-renderer"

import OnsLogo from "../onslogo"

describe("ONS Logo", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<OnsLogo/>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})