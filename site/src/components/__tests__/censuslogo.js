import React from "react"
import renderer from "react-test-renderer"

import CensusLogo from "../censuslogo"

describe("Census Logo", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<CensusLogo/>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})