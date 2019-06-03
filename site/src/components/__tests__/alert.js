import React from "react"
import renderer from "react-test-renderer"

import Alert from "../alert"

describe("Alert", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Alert title="test_title" content="this is test content" />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})