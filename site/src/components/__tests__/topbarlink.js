import React from "react"
import renderer from "react-test-renderer"

import TopBarLink from "../topbarlink"

describe("TopBarLink", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<TopBarLink title="menu" link="menu" />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})