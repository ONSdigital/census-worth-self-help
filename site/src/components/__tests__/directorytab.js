import React from "react"
import renderer from "react-test-renderer"

import DirectoryTab from "../directorytab"
import {directoryNode} from "../../utils/testdata"

describe("DirectoryTab", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<DirectoryTab node={directoryNode} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})