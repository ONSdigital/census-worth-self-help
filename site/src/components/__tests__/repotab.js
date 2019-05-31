import React from "react"
import renderer from "react-test-renderer"

import RepoTab from "../repotab"

describe("RepoTab", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<RepoTab title="repo title" link="location" />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})