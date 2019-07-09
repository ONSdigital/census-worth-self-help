import React from "react"
import renderer from "react-test-renderer"

import Metadata from "../metadata"

describe("Metadata", () => {
  it("renders correctly with title", () => {
    const tree = renderer
      .create(<Metadata>a title</Metadata>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly without a title", () => {
    const tree = renderer
      .create(<Metadata></Metadata>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})