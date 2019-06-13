import React from "react"
import renderer from "react-test-renderer"
import BlockStatus from "../blockstatus"

describe("BlockStatus", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<BlockStatus title="title" subtitle="anything" />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})