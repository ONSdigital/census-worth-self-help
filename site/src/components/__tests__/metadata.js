import React from "react"
import renderer from "react-test-renderer"

import Metadata from "../metadata"

describe("Metadata", () => {
  it("doesnt error and creates no element with title", () => {
    const tree = renderer
      .create(<Metadata>a title</Metadata>)
      .toJSON()
    expect(tree).toBeNull()
  })

  it("doesnt error and creates no element without title", () => {
    const tree = renderer
      .create(<Metadata></Metadata>)
      .toJSON()
    expect(tree).toBeNull()
  })
})