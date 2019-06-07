import React from "react"
import renderer from "react-test-renderer"

import TabList from "../tablist"
import {data} from "../../utils/testdata"

describe("TabList", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<TabList elements={data.edges} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})