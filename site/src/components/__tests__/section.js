import React from "react"
import renderer from "react-test-renderer"

import Section from "../section"

describe("Section", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Section>children</Section>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})