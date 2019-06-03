import React from "react"
import renderer from "react-test-renderer"

import DirectoryTab from "../directorytab"

describe("DirectoryTab", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<DirectoryTab title="directory title" link="location" />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})